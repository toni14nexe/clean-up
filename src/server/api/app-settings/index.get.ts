import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async event => {
  const appSettings = await prisma.appSettings.findMany({
    orderBy: { createdAt: 'asc' }
  })
  return appSettings
})
