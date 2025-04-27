import Stripe from 'stripe'
import { defineEventHandler, readBody } from 'h3'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil'
})

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { amount, description } = body

  if (!amount || amount < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Iznos mora biti veći od 0'
    })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: description || 'Horizon Escape narudžba',
            images: [
              'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
            ]
          },
          unit_amount: Math.round(amount * 100)
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `${process.env.APP_BASE_URL}/check-stripe-payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_BASE_URL}/kosarica`
  })

  return { id: session.id, url: session.url }
})
