import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const searchValue = String(query.value || '').trim()
  const page = Number(query.page) || 1
  const perPage = Number(query.perPage) || 12
  const skip = (page - 1) * perPage

  if (searchValue.length < 3 || searchValue.length > 100)
    throw createError({
      statusCode: 400,
      statusMessage: 'Search value should be between 3 and 100 chars.'
    })

  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where: {
        deletedAt: null,
        ...(searchValue && {
          OR: [{ name: { contains: searchValue, mode: 'insensitive' } }]
        })
      },
      orderBy: { price: 'asc' },
      include: { productCategory: true },
      skip,
      take: perPage
    }),
    prisma.product.count({
      where: {
        deletedAt: null,
        ...(searchValue && {
          OR: [{ name: { contains: searchValue, mode: 'insensitive' } }]
        })
      }
    })
  ])

  products.sort((a, b) => {
    const pa = a.discountPrice ?? a.price
    const pb = b.discountPrice ?? b.price
    return Number(pa) - Number(pb)
  })

  return { products, totalProducts }
})
