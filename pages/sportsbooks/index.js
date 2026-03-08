import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

const C = { bg: '#080b12', surface: '#0e1420', border: 'rgba(255,255,255,0.08)', green: '#00ff88', text: '#e8eaf0', muted: '#5a6070' }

const books = [
  {
    rank: 1, name: 'DraftKings Sportsbook', slug: 'draftkings', logo: '🎯', color: '#00c74d',
    bonus: 'Bet $5, Get $200 in Bonus Bets', bonusDetail: 'New users only. 21+. T&Cs apply.',
    url: 'https://draftkings.com', tag: 'EDITOR\'S CHOICE', rating: 4.9, reviews: 48200,
    promoCode: 'PICKWISE', states: 'Available in 24+ states',
    pros: ['Best welcome bonus value', 'Same-game parlays', 'Fastest payouts (24hr)', 'Best mobile app', 'Huge prop market'],
    cons: ['Odds slightly worse than Pinnacle', 'Customer service wait times'],
    categories: { odds: 4.7, app: 5.0, promos: 5.0, banking: 4.8, markets: 4.9 },
    verdict: 'DraftKings is the gold standard for US sports betting. The $200 bonus bet offer for new users is the best in the market right now, and the app is genuinely the most polished betting experience available.'
  },
  {
    rank: 2, name: 'FanDuel Sportsbook', slug: 'fanduel', logo: '⚡', color: '#1493ff',
    bonus: 'No Sweat First Bet up to $1,000', bonusDetail: 'New users only. 21+. T&Cs apply.',
    url: 'https://fanduel.com', tag: 'BEST PROMOS', rating: 4.8, reviews: 39100,
    promoCode: 'PICKWISE', states: 'Available in 20+ states',
    pros: ['Generous ongoing promos', 'Best NFL same-game parlay', 'Live betting interface', 'Quick withdrawals', '$1000 first bet protection'],
    cons: ['App can be slow during peak times', 'Promo terms can be strict'],
    categories: { odds: 4.8, app: 4.8, promos: 5.0, banking: 4.7, markets: 4.8 },
    verdict: 'FanDuel consistently runs the best ongoing promotions of any major sportsbook. The No Sweat First Bet gives new users a massive safety net, and the NFL betting experience is unmatched.'
  },
  {
    rank: 3, name: 'BetMGM Sportsbook', slug: 'betmgm', logo: '♠️', color: '#c9a84c',
    bonus: 'First Bet Offer up to $1,500', bonusDetail: 'New users only. 21+. T&Cs apply.',
    url: 'https://betmgm.com', tag: 'BEST ODDS', rating: 4.7, reviews: 28900,
    promoCode: 'PICKWISE', states: 'Available in 22+ states',
    pros: ['Consistently sharp odds', 'One game parlay feature', 'Early cash out', 'MGM Rewards integration', 'Big futures market'],
    cons: ['Smaller welcome bonus than competitors', 'Limited live streaming'],
    categories: { odds: 5.0, app: 4.6, promos: 4.7, banking: 4.8, markets: 4.7 },
    verdict: 'BetMGM consistently offers the best odds on major markets — if you\'re a sharp bettor or care about line shopping, MGM should be in your rotation. The $1,500 first bet offer is also highly competitive.'
  },
  {
    rank: 4, name: 'Caesars Sportsbook', slug: 'caesars', logo: '👑', color: '#b8860b',
    bonus: 'First Bet on Caesars up to $1,000', bonusDetail: 'New users only. 21+. T&Cs apply.',
    url: 'https://caesars.com', tag: '', rating: 4.6, reviews: 22400,
    promoCode: 'PICKWISE', states: 'Available in 20+ states',
    pros: ['Caesars Rewards points', 'Massive futures market', 'Live in-play betting', 'Good prop offerings', 'Solid customer service'],
    cons: ['App less polished than DK/FD', 'Slower payouts'],
    categories: { odds: 4.6, app: 4.5, promos: 4.7, banking: 4.5, markets: 4.8 },
    verdict: 'Caesars is worth having for the loyalty rewards alone if you bet regularly. The futures market is one of the deepest available, and the $1,000 first bet offer is solid for new players.'
  },
]

function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.floor(rating) ? '#ffd700' : i - 0.5 <= rating ? '#ffd700' : '#333', fontSize: '14px' }}>★</span>
      ))}
      <span style={{ fontSize: '14px', fontWeight: '700', color: '#e8eaf0', marginLeft: '4px' }}>{rating}</span>
    </div>
  )
}

function ScoreBar({ label, value }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', color: C.muted }}>{label}</span>
        <span style={{ fontSize: '12px', fontWeight: '700', color: C.green }}>{value}/5</span>
      </div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
        <div style={{ width: `${(value / 5) * 100}%`, height: '100%', background: C.green, borderRadius: '2px' }} />
      </div>
    </div>
  )
}

export default function Sportsbooks() {
  const [expanded, setExpanded] = useState(null)

  return (
    <>
      <Head>
        <title>Best Sports Betting Sites 2025 — Top Sportsbook Bonuses & Reviews</title>
        <meta name="description" content="Compare the best sports betting sites for 2025. Expert reviews of DraftKings, FanDuel, BetMGM, and Caesars. Exclusive bonus codes and promotions." />
        <meta property="og:title" content="Best Sports Betting Sites 2025 — Sportsbook Reviews" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "ItemList",
          "name": "Best Sports Betting Sites 2025",
          "itemListElement": books.map((b, i) => ({
            "@type": "ListItem", "position": i + 1,
            "item": { "@type": "Product", "name": b.name, "aggregateRating": { "@type": "AggregateRating", "ratingValue": b.rating, "reviewCount": b.reviews, "bestRating": 5 }}
          }))
        })}} />
      </Head>

      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Barlow', sans-serif", color: C.text }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,11,18,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: '900', color: C.text }}>PICK<span style={{ color: C.green }}>WISE</span> <span style={{ fontSize: '10px', background: C.green, color: '#000', padding: '2px 6px', borderRadius: '4px' }}>AI</span></Link>
          <Link href="/" style={{ fontSize: '13px', color: C.muted }}>← Back to Picks</Link>
        </nav>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px 80px' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontSize: '11px', color: C.green, fontWeight: '800', letterSpacing: '0.1em', marginBottom: '10px' }}>UPDATED MARCH 2025</div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '14px', textTransform: 'uppercase' }}>Best Sports Betting Sites<br /><span style={{ color: C.green }}>2025 Rankings</span></h1>
            <p style={{ fontSize: '16px', color: C.muted, lineHeight: 1.7, maxWidth: '600px' }}>We tested every major sportsbook so you don't have to. Here are the top picks for US bettors in 2025, ranked by bonus value, odds, app quality, and overall experience.</p>
            <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '8px', fontSize: '13px', color: '#ffd700', display: 'inline-block' }}>
              💡 Use our exclusive links for the best available bonuses — better than going direct in most cases.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {books.map((book, i) => (
              <div key={book.slug} style={{ background: C.surface, border: `1px solid ${i === 0 ? 'rgba(0,255,136,0.3)' : C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
                {i === 0 && <div style={{ background: 'rgba(0,255,136,0.1)', borderBottom: `1px solid rgba(0,255,136,0.2)`, padding: '6px 20px', fontSize: '11px', fontWeight: '800', color: C.green, letterSpacing: '0.08em' }}>⭐ EDITOR'S TOP PICK FOR 2025</div>}

                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '40px', width: '56px', textAlign: 'center', flexShrink: 0 }}>{book.logo}</div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: '900' }}>#{book.rank} {book.name}</span>
                        {book.tag && <span style={{ fontSize: '10px', background: 'rgba(0,255,136,0.15)', color: C.green, padding: '3px 8px', borderRadius: '4px', fontWeight: '800' }}>{book.tag}</span>}
                      </div>
                      <Stars rating={book.rating} />
                      <div style={{ fontSize: '12px', color: C.muted, marginTop: '4px' }}>{book.reviews.toLocaleString()} reviews · {book.states}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: book.color, marginBottom: '4px' }}>{book.bonus}</div>
                      <div style={{ fontSize: '11px', color: C.muted, marginBottom: '10px' }}>Code: <strong style={{ color: C.text }}>{book.promoCode}</strong></div>
                      <a href={book.url} target="_blank" rel="noopener noreferrer sponsored" style={{ display: 'inline-block', background: book.color, color: '#000', padding: '10px 20px', borderRadius: '7px', fontWeight: '800', fontSize: '14px' }}>
                        Claim Bonus →
                      </a>
                    </div>
                  </div>

                  <p style={{ fontSize: '14px', color: '#8a90a0', lineHeight: 1.7, margin: '16px 0' }}>{book.verdict}</p>

                  <button onClick={() => setExpanded(expanded === book.slug ? null : book.slug)} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '7px 14px', fontSize: '13px', color: C.muted, cursor: 'pointer', fontFamily: 'inherit', fontWeight: '600' }}>
                    {expanded === book.slug ? '▲ Hide Details' : '▼ Full Review'}
                  </button>

                  {expanded === book.slug && (
                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.06em', color: C.muted, marginBottom: '10px' }}>PROS</div>
                        {book.pros.map(p => <div key={p} style={{ fontSize: '13px', color: '#8a90a0', marginBottom: '6px', display: 'flex', gap: '8px' }}><span style={{ color: C.green, flexShrink: 0 }}>✓</span>{p}</div>)}
                        <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.06em', color: C.muted, margin: '14px 0 10px' }}>CONS</div>
                        {book.cons.map(c => <div key={c} style={{ fontSize: '13px', color: '#8a90a0', marginBottom: '6px', display: 'flex', gap: '8px' }}><span style={{ color: '#ff4444', flexShrink: 0 }}>✗</span>{c}</div>)}
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.06em', color: C.muted, marginBottom: '12px' }}>SCORES</div>
                        {Object.entries(book.categories).map(([k, v]) => (
                          <ScoreBar key={k} label={k.charAt(0).toUpperCase() + k.slice(1)} value={v} />
                        ))}
                        <a href={book.url} target="_blank" rel="noopener noreferrer sponsored" style={{ display: 'block', marginTop: '16px', background: book.color, color: '#000', padding: '11px', borderRadius: '7px', fontWeight: '800', fontSize: '14px', textAlign: 'center' }}>
                          Get {book.bonus} →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Responsible gambling */}
          <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, borderRadius: '10px', fontSize: '12px', color: C.muted, lineHeight: 1.8 }}>
            <strong style={{ color: C.text }}>Responsible Gambling:</strong> Sports betting involves financial risk. Only bet what you can afford to lose. If gambling is causing problems, call the National Problem Gambling Helpline: <strong>1-800-522-4700</strong> (24/7). PickWise AI earns affiliate commissions from the sportsbooks listed. This does not affect our ratings.
          </div>
        </div>
      </div>
    </>
  )
}
