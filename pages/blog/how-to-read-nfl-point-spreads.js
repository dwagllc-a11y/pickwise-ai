import Head from 'next/head'
import Link from 'next/link'

const C = { bg: '#080b12', surface: '#0e1420', border: 'rgba(255,255,255,0.08)', green: '#00ff88', text: '#e8eaf0', muted: '#5a6070' }


export default function BlogPost() {
  return (
    <>
      <Head>
        <title>How to Read NFL Point Spreads: Complete Beginner Guide — PickWise AI</title>
        <meta name="description" content="Everything you need to know about NFL point spreads — how they work, how to read them, and how to bet them profitably." />
        <meta property="og:title" content="How to Read NFL Point Spreads: Complete Beginner Guide" />
        <meta name="twitter:card" content="summary_large_image" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Barlow', sans-serif", color: C.text }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,11,18,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: '900', color: C.text }}>PICK<span style={{ color: C.green }}>WISE</span> <span style={{ fontSize: '10px', background: C.green, color: '#000', padding: '2px 6px', borderRadius: '4px' }}>AI</span></Link>
          <Link href="/blog" style={{ fontSize: '13px', color: C.muted }}>← All Guides</Link>
        </nav>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>
          <div style={{ marginBottom: '36px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', background: 'rgba(255,255,255,0.08)', color: C.muted, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.06em' }}>NFL</span>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: 1.05, marginTop: '12px', marginBottom: '12px', textTransform: 'uppercase' }}>How to Read NFL Point Spreads: Complete Beginner Guide</h1>
            <p style={{ fontSize: '16px', color: C.muted, lineHeight: 1.6 }}>Everything you need to know about NFL point spreads — how they work, how to read them, and how to bet them profitably.</p>
          </div>
          
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>What is a point spread?</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>The point spread is the most common way to bet on NFL games. Instead of just picking who wins, you're betting on the margin of victory.</p>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>Example: Chiefs -7 vs Raiders +7</p>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>If you bet Chiefs -7, Kansas City needs to win by more than 7 points for you to win the bet. If you bet Raiders +7, Las Vegas can lose by up to 6 points and you still win.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>How does the juice work?</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>Most point spread bets come with -110 odds, meaning you bet $110 to win $100. This 10% edge — called the "juice" or "vig" — is how sportsbooks make money.</p>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>To break even long-term betting -110, you need to win 52.4% of your bets. Anything above that is profitable.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>How oddsmakers set the line</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>Sportsbooks set lines to generate equal action on both sides — they don't care who wins, they want to collect the vig. Lines move when more money comes in on one side.</p>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>This is why line shopping matters: different books may have Chiefs -6.5 vs -7. That half point can be the difference between winning, losing, and a push.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>Key numbers to know</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>In NFL betting, certain margins of victory are much more common than others. The most important: 3 (most common), 7, 6, 10, 14. If a spread crosses through 3 or 7, it's a big deal. A team favored by -3 is very different from -3.5.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>How to bet spreads profitably</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>The most important rule: shop for the best line. Having accounts at 3-4 sportsbooks and always getting the best number adds 2-3% to your win rate over time — nearly enough to overcome the vig by itself.</p>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>Our AI models analyze line movement, public betting percentages, injuries, weather, and historical trends to find spots where the market is off. Check our picks daily.</p>
          </div>
          <div style={{ marginTop: '48px', background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Ready to put this into action?</div>
            <p style={{ fontSize: '14px', color: C.muted, marginBottom: '18px' }}>Our AI models pick the best bets daily. Follow along free.</p>
            <Link href="/picks/nfl" style={{ display: 'inline-block', background: C.green, color: '#000', padding: '12px 24px', borderRadius: '8px', fontWeight: '800', fontSize: '14px' }}>See Today's NFL Picks →</Link>
          </div>
          <div style={{ marginTop: '20px', fontSize: '11px', color: C.muted, lineHeight: 1.6, padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            ⚠️ For entertainment only. Must be 21+. If you have a gambling problem: 1-800-522-4700.
          </div>
        </div>
      </div>
    </>
  )
}
