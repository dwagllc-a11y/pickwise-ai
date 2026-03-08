import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

const C = { bg: '#080b12', surface: '#0e1420', border: 'rgba(255,255,255,0.08)', green: '#00ff88', greenDim: 'rgba(0,255,136,0.1)', text: '#e8eaf0', muted: '#5a6070', gold: '#ffd700' }

const plans = [
  {
    key: 'daily',
    name: 'Daily Pass',
    price: '$19.99',
    period: 'per day',
    desc: 'Perfect for big game days or weekends',
    color: '#60a5fa',
    features: [
      'All picks for today unlocked',
      'Full confidence scores & analysis',
      'NFL, NBA, MLB, NHL coverage',
      'Same-day email delivery',
      'Cancel anytime',
    ],
    cta: 'Get Today\'s Picks',
    popular: false,
  },
  {
    key: 'weekly',
    name: 'Weekly Pass',
    price: '$49.99',
    period: 'per week',
    desc: 'Best for active bettors — $7.14/day',
    color: C.green,
    features: [
      'All picks for 7 days unlocked',
      'Full confidence scores & analysis',
      'NFL, NBA, MLB, NHL coverage',
      'Daily email alerts before lines move',
      'Premium matchup breakdowns',
      'Best bet of the day highlighted',
      'Cancel anytime',
    ],
    cta: 'Start Weekly Pass',
    popular: true,
  },
  {
    key: 'monthly',
    name: 'Monthly Member',
    price: '$149.99',
    period: 'per month',
    desc: 'Best value — $4.99/day',
    color: C.gold,
    features: [
      'All picks every day, all month',
      'Full confidence scores & analysis',
      'NFL, NBA, MLB, NHL + futures',
      'Daily email alerts before lines move',
      'Premium matchup breakdowns',
      'Best bet of the day highlighted',
      'Line movement alerts',
      'Monthly performance report',
      'Priority email support',
      'Cancel anytime',
    ],
    cta: 'Become a Member',
    popular: false,
  },
]

const freeFeatures = [
  { text: '2 picks per day (teaser)', locked: false },
  { text: 'Matchup info only', locked: false },
  { text: 'Full confidence scores', locked: true },
  { text: 'Premium analysis', locked: true },
  { text: 'Email alerts', locked: true },
  { text: 'Best bet of the day', locked: true },
  { text: 'Line movement alerts', locked: true },
]

const testimonials = [
  { name: 'Ryan M.', avatar: '🧢', text: 'Went 5-1 my first week. The confidence scores alone are worth the price — I finally know which picks to actually bet.', plan: 'Weekly' },
  { name: 'Derek T.', avatar: '🏈', text: 'Monthly member for 3 months. Up 22 units. The email alerts before lines move have been a massive edge.', plan: 'Monthly' },
  { name: 'Jason K.', avatar: '🏀', text: 'Used the daily pass for the NFL playoffs. Went 8-3 ATS over the weekend. Will definitely be back.', plan: 'Daily' },
]

export default function Pricing() {
  const [loading, setLoading] = useState(null)
  const [email, setEmail] = useState('')

  const handleSubscribe = async (plan) => {
    if (!email || !email.includes('@')) {
      alert('Please enter your email address first')
      return
    }
    setLoading(plan)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, email }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else alert(data.error || 'Something went wrong')
    } catch {
      alert('Something went wrong. Please try again.')
    }
    setLoading(null)
  }

  return (
    <>
      <Head>
        <title>PickWise AI Pricing — Daily, Weekly & Monthly Picks</title>
        <meta name="description" content="Get expert AI sports picks for $19.99/day, $49.99/week, or $149.99/month. NFL, NBA, MLB, NHL. Full confidence scores, premium analysis, and email alerts." />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Barlow', sans-serif", color: C.text }}>

        {/* Nav */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,11,18,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: '900', color: C.text }}>PICK<span style={{ color: C.green }}>WISE</span> <span style={{ fontSize: '10px', background: C.green, color: '#000', padding: '2px 6px', borderRadius: '4px' }}>AI</span></Link>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href="/picks/today" style={{ fontSize: '13px', color: C.muted }}>Free Picks</Link>
            <Link href="/sportsbooks" style={{ fontSize: '13px', color: C.muted }}>Sportsbooks</Link>
          </div>
        </nav>

        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '56px 24px 80px' }}>

          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.25)', borderRadius: '20px', padding: '5px 14px', marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', color: C.green, fontWeight: '800', letterSpacing: '0.08em' }}>🔒 PREMIUM PICKS</span>
            </div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '16px' }}>
              Unlock Every Pick.<br /><span style={{ color: C.green }}>Beat the Books.</span>
            </h1>
            <p style={{ fontSize: '17px', color: C.muted, maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.7 }}>
              Our AI models analyze 10,000+ data points per game. Full picks, confidence scores, and premium analysis delivered before lines move.
            </p>

            {/* Record */}
            <div style={{ display: 'inline-flex', gap: '0', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', overflow: 'hidden', marginBottom: '40px' }}>
              {[['Season Record', '847-423'], ['Win Rate', '58.3%'], ['ROI', '+18.4%'], ['Streak', 'W7']].map(([l, v], i) => (
                <div key={l} style={{ padding: '12px 20px', borderRight: i < 3 ? `1px solid ${C.border}` : 'none', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: C.muted, fontWeight: '600', letterSpacing: '0.06em', marginBottom: '3px' }}>{l.toUpperCase()}</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: i > 0 ? C.green : C.text, fontFamily: "'Barlow Condensed', sans-serif" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Email field — one input for all plans */}
          <div style={{ maxWidth: '420px', margin: '0 auto 40px', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: C.muted, marginBottom: '8px', fontWeight: '600' }}>Enter your email to get started</div>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '12px 16px', color: C.text, fontSize: '15px', outline: 'none', fontFamily: 'inherit' }}
            />
          </div>

          {/* Plans */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '56px' }}>
            {plans.map(plan => (
              <div key={plan.key} style={{ background: plan.popular ? 'linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,255,136,0.03))' : C.surface, border: `2px solid ${plan.popular ? C.green : C.border}`, borderRadius: '16px', padding: '28px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: C.green, color: '#000', fontSize: '11px', fontWeight: '800', padding: '4px 14px', borderRadius: '20px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                    ⭐ MOST POPULAR
                  </div>
                )}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: plan.color, letterSpacing: '0.06em', marginBottom: '6px' }}>{plan.name.toUpperCase()}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '48px', fontWeight: '900', color: C.text, lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontSize: '14px', color: C.muted }}>{plan.period}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: C.muted }}>{plan.desc}</div>
                </div>

                <div style={{ flex: 1, marginBottom: '24px' }}>
                  {plan.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <span style={{ color: plan.color, fontWeight: '800', flexShrink: 0, marginTop: '1px' }}>✓</span>
                      <span style={{ fontSize: '14px', color: '#9098a8', lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSubscribe(plan.key)}
                  disabled={loading === plan.key}
                  style={{ background: plan.popular ? C.green : `${plan.color}22`, color: plan.popular ? '#000' : plan.color, border: `1px solid ${plan.popular ? C.green : plan.color}`, borderRadius: '9px', padding: '13px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit', width: '100%', transition: 'all 0.15s' }}
                >
                  {loading === plan.key ? 'Redirecting...' : plan.cta}
                </button>
                <div style={{ fontSize: '11px', color: C.muted, textAlign: 'center', marginTop: '8px' }}>Secure checkout · Cancel anytime</div>
              </div>
            ))}
          </div>

          {/* Free vs Paid comparison */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '32px', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '20px', textAlign: 'center' }}>Free vs <span style={{ color: C.green }}>Premium</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '800', color: C.muted, letterSpacing: '0.06em', marginBottom: '14px', textAlign: 'center' }}>FREE</div>
                {freeFeatures.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderBottom: `1px solid ${C.border}`, opacity: f.locked ? 0.4 : 1 }}>
                    <span style={{ color: f.locked ? C.muted : C.green, fontSize: '14px' }}>{f.locked ? '🔒' : '✓'}</span>
                    <span style={{ fontSize: '13px', color: f.locked ? C.muted : '#9098a8' }}>{f.text}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderLeft: `1px solid ${C.border}` }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: C.green, letterSpacing: '0.06em', marginBottom: '14px', textAlign: 'center' }}>PREMIUM</div>
                {freeFeatures.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ color: C.green, fontSize: '14px' }}>✓</span>
                    <span style={{ fontSize: '13px', color: '#9098a8' }}>{f.text.replace('teaser', 'all picks').replace('only', '')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '28px', fontWeight: '900', textTransform: 'uppercase', textAlign: 'center', marginBottom: '24px' }}>Member Results</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
                    {'★★★★★'.split('').map((s, j) => <span key={j} style={{ color: C.gold, fontSize: '14px' }}>{s}</span>)}
                  </div>
                  <p style={{ fontSize: '14px', color: '#9098a8', lineHeight: 1.6, marginBottom: '12px' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '22px' }}>{t.avatar}</span>
                      <span style={{ fontSize: '13px', fontWeight: '700' }}>{t.name}</span>
                    </div>
                    <span style={{ fontSize: '11px', background: 'rgba(0,255,136,0.1)', color: C.green, padding: '3px 8px', borderRadius: '5px', fontWeight: '700' }}>{t.plan}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '28px', fontWeight: '900', textTransform: 'uppercase', textAlign: 'center', marginBottom: '24px' }}>FAQ</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                ['Can I cancel anytime?', 'Yes — cancel anytime from your email confirmation link or by contacting support. No questions asked. You keep access until your current period ends.'],
                ['When do I get the picks?', 'Picks are delivered by 10 AM ET every morning. Email members get them before the free teaser goes live so you can act before lines move.'],
                ['What sports are covered?', 'NFL, NBA, MLB, and NHL. We publish picks for every game with a meaningful edge. On heavy game days you may see 8-12 picks. Slow days may be 2-4.'],
                ['What is the refund policy?', 'We offer a 48-hour money-back guarantee on your first purchase. If you are not satisfied, email us within 48 hours for a full refund.'],
                ['How is the win rate calculated?', 'We track every published pick from the moment it goes live. All results are audited including pushes. Our season record is published live on the homepage.'],
              ].map(([q, a], i) => (
                <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '18px 20px' }}>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: C.text, marginBottom: '8px' }}>{q}</div>
                  <div style={{ fontSize: '14px', color: C.muted, lineHeight: 1.6 }}>{a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,255,136,0.02))', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '16px', padding: '40px 24px' }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '10px' }}>Ready to <span style={{ color: C.green }}>Start Winning?</span></h2>
            <p style={{ color: C.muted, fontSize: '15px', marginBottom: '24px' }}>Join hundreds of members beating the books with AI picks.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => handleSubscribe('weekly')} style={{ background: C.green, color: '#000', border: 'none', padding: '14px 32px', borderRadius: '9px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit' }}>
                Start Weekly Pass — $49.99 →
              </button>
              <Link href="/picks/today" style={{ background: 'rgba(255,255,255,0.08)', color: C.text, padding: '14px 24px', borderRadius: '9px', fontSize: '15px', fontWeight: '700' }}>
                See Free Picks First
              </Link>
            </div>
            <div style={{ fontSize: '12px', color: C.muted, marginTop: '12px' }}>48-hour money-back guarantee · Cancel anytime · Secure checkout by Stripe</div>
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: '32px', fontSize: '11px', color: C.muted, lineHeight: 1.8, textAlign: 'center' }}>
            ⚠️ For entertainment purposes only. Sports betting involves financial risk. Must be 21+ and in a legal betting state. Problem Gambling Helpline: 1-800-522-4700. PickWise AI does not guarantee winnings.
          </div>
        </div>
      </div>
    </>
  )
}
