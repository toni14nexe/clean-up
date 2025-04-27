import Stripe from 'stripe'
import { defineEventHandler, getQuery, createError } from 'h3'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil'
})

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const sessionId = query.session_id as string

  if (!sessionId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nedostaje session_id'
    })
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  return {
    id: session.id,
    payment_status: session.payment_status,
    paid: session.payment_status === 'paid',
    amount_total: session.amount_total ? session.amount_total / 100 : 0,
    currency: session.currency
  }
})
