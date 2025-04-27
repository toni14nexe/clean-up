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

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const categoryName = String(query.categoryName || '')
  const perPage = Number(query.perPage) || 10
  const page = Number(query.page) || 1
  const skip = (page - 1) * perPage
  const deletedOnly = query.deletedOnly === 'true'
  const search = query.search || ''
  const sortBy = String(query.sortBy || 'newest')

  const orderBy =
    sortBy === 'newest' ? { createdAt: 'desc' as const } : undefined

  const baseWhere: any = deletedOnly
    ? { deletedAt: { not: null } }
    : { deletedAt: null }

  if (search) {
    baseWhere.name = {
      contains: search,
      mode: 'insensitive'
    }
  }

  if (!categoryName) {
    const prismaQuery: any = {
      where: baseWhere,
      skip,
      take: perPage,
      include: { productCategory: true }
    }

    if (orderBy) prismaQuery.orderBy = orderBy

    const [products, total] = await Promise.all([
      prisma.product.findMany(prismaQuery),
      prisma.product.count({ where: baseWhere })
    ])

    if (sortBy === 'lowestPrice') {
      products.sort((a, b) => {
        const pa = a.discountPrice ?? a.price
        const pb = b.discountPrice ?? b.price
        return Number(pa) - Number(pb)
      })
    }

    if (sortBy === 'highestPrice') {
      products.sort((a, b) => {
        const pa = a.discountPrice ?? a.price
        const pb = b.discountPrice ?? b.price
        return Number(pb) - Number(pa)
      })
    }

    return { products, total }
  }

  const rootCategory = await prisma.productCategory.findFirst({
    where: {
      name: {
        equals: categoryName,
        mode: 'insensitive'
      }
    },
    select: { id: true }
  })

  if (!rootCategory) {
    throw createError({
      statusCode: 404,
      message: 'Category does not exist or it is deleted'
    })
  }

  const categoryIds = await getAllDescendantCategoryIds(rootCategory.id)

  const whereCondition: any = {
    ...baseWhere,
    productCategoryId: { in: categoryIds }
  }

  const prismaQuery: any = {
    where: whereCondition,
    skip,
    take: perPage,
    include: { productCategory: true }
  }

  if (orderBy) prismaQuery.orderBy = orderBy

  const [products, total] = await Promise.all([
    prisma.product.findMany(prismaQuery),
    prisma.product.count({ where: whereCondition })
  ])

  if (sortBy === 'lowestPrice') {
    products.sort((a, b) => {
      const pa = a.discountPrice ?? a.price
      const pb = b.discountPrice ?? b.price
      return Number(pa) - Number(pb)
    })
  }

  if (sortBy === 'highestPrice') {
    products.sort((a, b) => {
      const pa = a.discountPrice ?? a.price
      const pb = b.discountPrice ?? b.price
      return Number(pb) - Number(pa)
    })
  }

  return { products, total }
})
