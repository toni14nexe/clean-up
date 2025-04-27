import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const perPage = Number(query.perPage) || 10
  const page = Number(query.page) || 1
  const skip = (page - 1) * perPage
  const search = String(query.search || '')
  const sort: 'asc' | 'desc' = query.sort === 'asc' ? 'asc' : 'desc'
  const allowedSortBy = ['orderNumber', 'buyerFullname', 'totalPrice'] as const
  const sortBy = allowedSortBy.includes(query.sortBy as any)
    ? (query.sortBy as (typeof allowedSortBy)[number])
    : 'orderNumber'

  const where: any = {
    deletedAt: null,
    ...(search && {
      OR: [
        ...(Number.isInteger(Number(search))
          ? [{ orderNumber: Number(search) }]
          : []),
        {
          buyerFullname: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ]
    })
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: {
        [sortBy]: sort
      },
      skip,
      take: perPage
    }),
    prisma.order.count({ where })
  ])

  return { orders, total }
})
