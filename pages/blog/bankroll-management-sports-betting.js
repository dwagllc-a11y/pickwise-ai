import Head from 'next/head'
import Link from 'next/link'

const C = { bg: '#080b12', surface: '#0e1420', border: 'rgba(255,255,255,0.08)', green: '#00ff88', text: '#e8eaf0', muted: '#5a6070' }


export default function BlogPost() {
  return (
    <>
      <Head>
        <title>Sports Betting Bankroll Management: The Complete System — PickWise AI</title>
        <meta name="description" content="The bankroll management system that keeps professional bettors in action. Unit sizing, Kelly criterion, and how to never go broke." />
        <meta property="og:title" content="Sports Betting Bankroll Management: The Complete System" />
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
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: 1.05, marginTop: '12px', marginBottom: '12px', textTransform: 'uppercase' }}>Sports Betting Bankroll Management: The Complete System</h1>
            <p style={{ fontSize: '16px', color: C.muted, lineHeight: 1.6 }}>The bankroll management system that keeps professional bettors in action. Unit sizing, Kelly criterion, and how to never go broke.</p>
          </div>
          
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>Why bankroll management is more important than picking winners</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>You can win 55% of your bets and still go broke with bad bankroll management. Conversely, a disciplined bettor with a 53% win rate can grow their bankroll steadily for years. The math of betting means variance will create losing streaks — your job is to survive them.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>The 1-5 unit system</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>Professional bettors use units — a percentage of their bankroll — instead of fixed dollar amounts. Standard: 1 unit = 1-2% of your total bankroll. A $1,000 bankroll means 1 unit = $10-20.</p>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>Unit sizing by confidence: 1 unit = standard play, 2 units = strong play, 3 units = max confidence. Never go above 3 units on a single bet. Never.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>The Kelly Criterion simplified</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>The Kelly Criterion calculates optimal bet size based on your edge and the odds. Simplified: if you have a 55% chance of winning a -110 bet, Kelly says bet about 5.5% of your bankroll. Most pros use half-Kelly (2.75%) to reduce variance. Never use full Kelly — it's too aggressive for the variance in sports betting.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>How many units to have in reserve</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>Never have more than 50% of your bankroll in action at once. Keep a reserve for adding to positions, taking advantage of line movement, and surviving downswings. The biggest mistake beginners make: going all-in during a hot streak and then having nothing left when variance catches up.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>Tracking your bets: the non-negotiable habit</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>You cannot improve without data. Track every single bet: date, sport, matchup, pick, odds, units wagered, result. Review monthly. Without tracking, you'll have no idea which sports, bet types, or situations are actually profitable for you. This is how you turn betting from gambling into an edge.</p>
          </div>
          <div style={{ marginTop: '48px', background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Ready to put this into action?</div>
            <p style={{ fontSize: '14px', color: C.muted, marginBottom: '18px' }}>Our AI models pick the best bets daily. Follow along free.</p>
            <Link href="/sportsbooks" style={{ display: 'inline-block', background: C.green, color: '#000', padding: '12px 24px', borderRadius: '8px', fontWeight: '800', fontSize: '14px' }}>Start Betting Smart →</Link>
          </div>
          <div style={{ marginTop: '20px', fontSize: '11px', color: C.muted, lineHeight: 1.6, padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            ⚠️ For entertainment only. Must be 21+. If you have a gambling problem: 1-800-522-4700.
          </div>
        </div>
      </div>
    </>
  )
}
