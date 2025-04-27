import { defineEventHandler, readBody } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async event => {
  if (event.req.method === 'POST') {
    const body = await readBody(event)

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        images: body.images || [],
        videos: body.videos || [],
        sizeOption: body.sizeOption,
        blackWhiteOption: body.blackWhiteOption,
        childClothes: body.childClothes,
        childClothesType: body.childClothesType,
        unisex: body.unisex,
        menWomenOption: body.menWomenOption,
        discountPrice: body.discountPrice,
        productCategory: {
          connect: {
            id: body.productCategoryId
          }
        }
      }
    })

    return product
  }
})
