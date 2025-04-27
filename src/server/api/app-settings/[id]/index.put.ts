import { createError, defineEventHandler, readBody } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async event => {
  const { params } = event.context

  if (!params || !params.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID parameter is required'
    })
  }

  const body = await readBody(event)

  const appSetting = await prisma.appSettings.findUnique({
    where: { id: params.id }
  })

  if (!appSetting) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid app setting ID'
    })
  }

  try {
    await prisma.appSettings.update({
      where: { id: params.id },
      data: {
        value: body.imageUrl
      }
    })

    return 'Successfully updated'
  } catch (error) {
    console.error('Error updating product:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update product'
    })
  }
})
