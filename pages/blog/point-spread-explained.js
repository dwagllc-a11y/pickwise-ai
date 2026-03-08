import Head from 'next/head'
import Link from 'next/link'

const C = { bg: '#080b12', surface: '#0e1420', border: 'rgba(255,255,255,0.08)', green: '#00ff88', text: '#e8eaf0', muted: '#5a6070' }


export default function BlogPost() {
  return (
    <>
      <Head>
        <title>Point Spread Betting Explained: A Simple Guide — PickWise AI</title>
        <meta name="description" content="What is a point spread and how does it work? The simplest explanation of spread betting for beginners." />
        <meta property="og:title" content="Point Spread Betting Explained: A Simple Guide" />
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
            <span style={{ fontSize: '11px', fontWeight: '800', background: 'rgba(255,255,255,0.08)', color: C.muted, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.06em' }}>GUIDE</span>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: 1.05, marginTop: '12px', marginBottom: '12px', textTransform: 'uppercase' }}>Point Spread Betting Explained: A Simple Guide</h1>
            <p style={{ fontSize: '16px', color: C.muted, lineHeight: 1.6 }}>What is a point spread and how does it work? The simplest explanation of spread betting for beginners.</p>
          </div>
          
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>The basics in one paragraph</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>A point spread is a handicap given to the underdog to level the playing field for bettors. If the Chiefs are -7 favorites, they need to win by more than 7 to cover. If the Raiders are +7 underdogs, they can lose by up to 6 and still cover. Bet the Chiefs: they need to win by 8+. Bet the Raiders: they can lose by 6 or fewer, tie, or win outright.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>Reading a spread: real examples</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>Chiefs -7 (-115) vs Raiders +7 (-105)</p>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>To bet Chiefs: risk $115 to win $100. Chiefs must win by 8+. To bet Raiders: risk $105 to win $100. Raiders must lose by 6 or fewer, or win. If Chiefs win by exactly 7: push (bet refunded).</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>What does the juice mean?</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>The numbers in parentheses (-115, -105) are the juice — the sportsbook's cut. Standard is -110 on both sides. When you see -115/-105, the book is slightly shading one side. You want to bet the -105 side when possible.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>What moves a spread?</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>Lines move when too much money comes in on one side. If everyone bets the Chiefs, the book moves the line to Chiefs -7.5 or Chiefs -8 to attract Raiders bettors. Sharp bettors watch line movement to see where smart money is going.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>The most important rule: shop for the best line</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>Before every bet, check 2-3 sportsbooks. A half-point difference — say -6.5 vs -7 on a spread — can be the difference between winning and pushing. This is why having accounts at multiple books is the single biggest edge available to recreational bettors.</p>
          </div>
          <div style={{ marginTop: '48px', background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Ready to put this into action?</div>
            <p style={{ fontSize: '14px', color: C.muted, marginBottom: '18px' }}>Our AI models pick the best bets daily. Follow along free.</p>
            <Link href="/picks/today" style={{ display: 'inline-block', background: C.green, color: '#000', padding: '12px 24px', borderRadius: '8px', fontWeight: '800', fontSize: '14px' }}>See Today's Picks →</Link>
          </div>
          <div style={{ marginTop: '20px', fontSize: '11px', color: C.muted, lineHeight: 1.6, padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            ⚠️ For entertainment only. Must be 21+. If you have a gambling problem: 1-800-522-4700.
          </div>
        </div>
      </div>
    </>
  )
}
