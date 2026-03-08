import Head from 'next/head'
import Link from 'next/link'

const C = { bg: '#080b12', surface: '#0e1420', border: 'rgba(255,255,255,0.08)', green: '#00ff88', text: '#e8eaf0', muted: '#5a6070' }


export default function BlogPost() {
  return (
    <>
      <Head>
        <title>How to Win at Sports Betting (What the 3% Do Differently) — PickWise AI</title>
        <meta name="description" content="Only 3% of sports bettors are long-term profitable. Here's the exact framework that separates winners from losers." />
        <meta property="og:title" content="How to Win at Sports Betting (What the 3% Do Differently)" />
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
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: 1.05, marginTop: '12px', marginBottom: '12px', textTransform: 'uppercase' }}>How to Win at Sports Betting (What the 3% Do Differently)</h1>
            <p style={{ fontSize: '16px', color: C.muted, lineHeight: 1.6 }}>Only 3% of sports bettors are long-term profitable. Here's the exact framework that separates winners from losers.</p>
          </div>
          
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>The uncomfortable truth about sports betting</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>97% of sports bettors lose money long-term. But the 3% who win aren't luckier — they approach it differently. They treat it like an investment with an edge, not gambling. This guide covers exactly what they do.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>Rule 1: Specialize ruthlessly</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>The winning 3% don't bet every sport, every game, every day. They find 2-3 specific markets where they have a genuine information edge and bet those relentlessly. Maybe it's NFL divisional underdogs. Maybe it's NBA totals on back-to-backs. Find your edge, exploit it, ignore everything else.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>Rule 2: Line value over predicted outcomes</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>The question isn't "who will win?" — it's "is this line wrong?" A team can be the better team and still be a bad bet if the spread is too high. Winners are always asking: at this number, does this bet have positive expected value?</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>Rule 3: Volume and sample size</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>You cannot evaluate your betting performance over 50 bets. Variance is too high. Serious bettors place hundreds of bets per year to let their edge play out. This is why specialization matters — you need enough games in your market to generate a real sample.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>Rule 4: Never emotionally bet</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>The biggest leak in recreational bettors: betting on your favorite team, chasing losses after a bad day, over-betting after a winning streak. These are all emotional decisions. Profitable bettors bet the same way on Tuesday in February as they do in the Super Bowl.</p>
          </div>
          <div style={{ marginTop: '48px', background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Ready to put this into action?</div>
            <p style={{ fontSize: '14px', color: C.muted, marginBottom: '18px' }}>Our AI models pick the best bets daily. Follow along free.</p>
            <Link href="/picks/today" style={{ display: 'inline-block', background: C.green, color: '#000', padding: '12px 24px', borderRadius: '8px', fontWeight: '800', fontSize: '14px' }}>Follow Our Expert Picks →</Link>
          </div>
          <div style={{ marginTop: '20px', fontSize: '11px', color: C.muted, lineHeight: 1.6, padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            ⚠️ For entertainment only. Must be 21+. If you have a gambling problem: 1-800-522-4700.
          </div>
        </div>
      </div>
    </>
  )
}
