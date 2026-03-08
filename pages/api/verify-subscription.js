import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { session_id } = req.body
  if (!session_id) return res.status(400).json({ error: 'Missing session_id' })

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['subscription', 'customer'],
    })

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return res.status(200).json({ active: false })
    }

    const sub = session.subscription
    const plan = sub?.metadata?.plan || req.body.plan || 'monthly'
    const email = session.customer_details?.email || session.customer?.email || ''

    return res.status(200).json({
      active: true,
      plan,
      email,
      subscription_id: sub?.id,
      current_period_end: sub?.current_period_end,
    })
  } catch (err) {
    console.error('Verify error:', err)
    return res.status(500).json({ error: err.message })
  }
}
