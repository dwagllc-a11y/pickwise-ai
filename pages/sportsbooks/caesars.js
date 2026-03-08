import Head from 'next/head'
import Link from 'next/link'

const C = { bg: '#080b12', surface: '#0e1420', border: 'rgba(255,255,255,0.08)', green: '#00ff88', text: '#e8eaf0', muted: '#5a6070' }

export default function BookReview() {
  return (
    <>
      <Head>
        <title>Caesars Sportsbook Review 2025 — PickWise AI</title>
        <meta name="description" content="Caesars Sportsbook review: rewards program, odds, futures market, and verdict for 2025." />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Review",
          "name": "Caesars Sportsbook Review 2025", "reviewBody": "Caesars is the best sportsbook if you value loyalty rewards — the Caesars Rewards program is genuinely valuable. The futures and props market is also among the deepest available.",
          "reviewRating": { "@type": "Rating", "ratingValue": 4.6, "bestRating": 5 },
          "itemReviewed": { "@type": "Product", "name": "Caesars Sportsbook" }
        })}} />
      </Head>
      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Barlow', sans-serif", color: C.text }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,11,18,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: '900', color: C.text }}>PICK<span style={{ color: C.green }}>WISE</span> <span style={{ fontSize: '10px', background: C.green, color: '#000', padding: '2px 6px', borderRadius: '4px' }}>AI</span></Link>
          <Link href="/sportsbooks" style={{ fontSize: '13px', color: C.muted }}>← All Sportsbooks</Link>
        </nav>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px 80px' }}>
          <div style={{ fontSize: '11px', color: C.green, fontWeight: '800', letterSpacing: '0.1em', marginBottom: '10px' }}>UPDATED MARCH 2025</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontSize: '48px' }}>👑</span>
            <div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Caesars Sportsbook Review 2025</h1>
              <div style={{ display: 'flex', gap: '2px', alignItems: 'center', marginTop: '4px' }}>
                {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#ffd700', fontSize: '18px' }}>★</span>)}
                <span style={{ fontWeight: '800', marginLeft: '6px', color: '#b8860b', fontSize: '18px' }}>4.6/5</span>
              </div>
            </div>
          </div>
          <div style={{ background: `rgba(255,255,255,0.04)`, border: `1px solid #b8860b44`, borderRadius: '12px', padding: '20px', marginBottom: '28px' }}>
            <div style={{ fontSize: '13px', color: C.muted, marginBottom: '6px' }}>WELCOME BONUS</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#b8860b', marginBottom: '12px' }}>First Bet on Caesars $1,000</div>
            <a href="https://caesars.com" target="_blank" rel="noopener noreferrer sponsored" style={{ display: 'inline-block', background: '#b8860b', color: '#000', padding: '11px 24px', borderRadius: '7px', fontWeight: '800', fontSize: '14px' }}>Claim at Caesars →</a>
          </div>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#9098a8', marginBottom: '28px' }}>Caesars is the best sportsbook if you value loyalty rewards — the Caesars Rewards program is genuinely valuable. The futures and props market is also among the deepest available.</p>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '11px', color: C.muted, lineHeight: 1.7 }}>
            ⚠️ 21+ only. Gambling involves risk. If you have a gambling problem, call 1-800-522-4700. Affiliate disclosure: PickWise AI earns a commission when you sign up through our links.
          </div>
        </div>
      </div>
    </>
  )
}
