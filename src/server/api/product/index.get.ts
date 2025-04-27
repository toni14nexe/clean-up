import { defineEventHandler, getQuery, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

async function getAllDescendantCategoryIds(
  parentId: string
): Promise<string[]> {
  const children = await prisma.productCategory.findMany({
    where: { parentId },
    select: { id: true }
  })

  const childIds = children.map(c => c.id)
  const descendantIds = await Promise.all(
    childIds.map(childId => getAllDescendantCategoryIds(childId))
  )

  return [parentId, ...descendantIds.flat()]
}

function getOrderBy(sortBy?: string) {
  switch (sortBy) {
    case 'lowestPrice':
      return { price: 'asc' as const }
    case 'highestPrice':
      return { price: 'desc' as const }
    case 'newest':
    default:
      return { createdAt: 'desc' as const }
  }
}

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const categoryName = String(query.categoryName || '')
  const perPage = Number(query.perPage) || 10
  const page = Number(query.page) || 1
  const skip = (page - 1) * perPage
  const deletedOnly = query.deletedOnly === 'true'
  const search = query.search || ''
  const sortBy = String(query.sortBy || 'newest')

  const orderBy = getOrderBy(sortBy)

  if (!categoryName) {
    const where: any = deletedOnly
      ? { deletedAt: { not: null } }
      : { deletedAt: null }

    if (search)
      where.name = {
        contains: search,
        mode: 'insensitive'
      }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: perPage,
        include: { productCategory: true }
      }),
      prisma.product.count({ where })
    ])

    return { products, total }
  } else {
    const rootCategory = await prisma.productCategory.findFirst({
      where: {
        name: {
          equals: categoryName,
          mode: 'insensitive'
        }
      },
      select: { id: true }
    })

    if (!rootCategory)
      throw createError({
        statusCode: 404,
        message: 'Category does not exist or it is deleted'
      })

    const categoryIds = await getAllDescendantCategoryIds(rootCategory.id)

    const whereCondition: any = {
      deletedAt: deletedOnly ? { not: null } : null,
      productCategoryId: { in: categoryIds }
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereCondition,
        orderBy,
        skip,
        take: perPage,
        include: { productCategory: true }
      }),
      prisma.product.count({ where: whereCondition })
    ])

    return { products, total }
  }
})
