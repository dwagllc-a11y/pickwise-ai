import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const config = { api: { bodyParser: false } }

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const rawBody = await getRawBody(req)
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return res.status(400).json({ error: `Webhook error: ${err.message}` })
  }

  // Handle subscription events
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const sub = event.data.object
      console.log(`Subscription ${event.type}: ${sub.id} status=${sub.status}`)
      // TODO: save to your database (Supabase, PlanetScale, etc.)
      break

    case 'customer.subscription.deleted':
      const cancelledSub = event.data.object
      console.log(`Subscription cancelled: ${cancelledSub.id}`)
      // TODO: revoke access in your database
      break

    case 'invoice.payment_succeeded':
      const invoice = event.data.object
      console.log(`Payment succeeded: ${invoice.id} amount=${invoice.amount_paid}`)
      // TODO: send confirmation email via Resend/SendGrid
      break

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object
      console.log(`Payment failed: ${failedInvoice.id}`)
      // TODO: send dunning email
      break

    default:
      console.log(`Unhandled event: ${event.type}`)
  }

  return res.status(200).json({ received: true })
}
