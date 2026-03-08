import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://pickwise.ai'

// Create these prices in your Stripe dashboard and paste the price IDs here
// Or use the price lookup keys below - create products with these exact lookup keys in Stripe
const PLANS = {
  daily:   { name: 'Daily Pass',      price: '$19.99', interval: 'day',   lookup_key: 'pickwise_daily' },
  weekly:  { name: 'Weekly Pass',     price: '$49.99', interval: 'week',  lookup_key: 'pickwise_weekly' },
  monthly: { name: 'Monthly Member',  price: '$149.99', interval: 'month', lookup_key: 'pickwise_monthly' },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { plan, email } = req.body
  if (!PLANS[plan]) return res.status(400).json({ error: 'Invalid plan' })

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email || undefined,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `PickWise AI — ${PLANS[plan].name}`,
            description: 'All picks + confidence scores + premium analysis + email alerts',
          },
          recurring: {
            interval: PLANS[plan].interval,
            interval_count: 1,
          },
          unit_amount: plan === 'daily' ? 1999 : plan === 'weekly' ? 4999 : 14999,
        },
        quantity: 1,
      }],
      success_url: `${APP_URL}/members?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${APP_URL}/pricing`,
      subscription_data: {
        metadata: { plan },
      },
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    return res.status(500).json({ error: err.message })
  }
}
