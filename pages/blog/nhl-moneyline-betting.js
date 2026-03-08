import Head from 'next/head'
import Link from 'next/link'

const C = { bg: '#080b12', surface: '#0e1420', border: 'rgba(255,255,255,0.08)', green: '#00ff88', text: '#e8eaf0', muted: '#5a6070' }


export default function BlogPost() {
  return (
    <>
      <Head>
        <title>NHL Moneyline Betting: How to Find Value Every Night — PickWise AI</title>
        <meta name="description" content="How to bet NHL moneylines profitably. Goalie matchups, back-to-back angles, and how to find plus-money value." />
        <meta property="og:title" content="NHL Moneyline Betting: How to Find Value Every Night" />
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
            <span style={{ fontSize: '11px', fontWeight: '800', background: 'rgba(255,255,255,0.08)', color: C.muted, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.06em' }}>NHL</span>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: 1.05, marginTop: '12px', marginBottom: '12px', textTransform: 'uppercase' }}>NHL Moneyline Betting: How to Find Value Every Night</h1>
            <p style={{ fontSize: '16px', color: C.muted, lineHeight: 1.6 }}>How to bet NHL moneylines profitably. Goalie matchups, back-to-back angles, and how to find plus-money value.</p>
          </div>
          
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>Why NHL moneylines offer unique value</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>Hockey is the highest-variance major sport — upsets happen constantly. A +150 underdog wins roughly 35% of games in the NHL, which is higher than in any other sport. This creates consistent value on the right underdogs if you know where to look.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>The goalie angle: most important factor</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>In no sport does one player matter more than in hockey. Elite goaltenders like Shesterkin, Hellebuyck, and Bobrovsky can steal games against superior teams. When you're getting plus-money on a team with a top-5 goalie against an average opponent, that's value.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>Back-to-back and travel angles</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>Teams on back-to-backs cover at roughly 44% — a massive edge. This is amplified when: the road team is on the second game of a back-to-back, they traveled a significant distance, and the opponent is well-rested at home.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>Puck line vs moneyline: when to use each</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>The puck line (-1.5) offers plus money on heavy favorites, similar to MLB run lines. The key: only use the puck line when a dominant team is facing a struggling offense. When there's goalie uncertainty, stick with the moneyline — variance is too high for puck lines.</p>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: C.text, marginBottom: "12px", letterSpacing: "-0.01em" }}>The line shopping edge in NHL</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#9098a8", marginBottom: "14px" }}>NHL lines move significantly based on confirmed starting goalies — announced 30-90 minutes before game time. If you can shop lines before and after goalie confirmation, you can often find significant value. This is where having multiple sportsbook accounts pays off most.</p>
          </div>
          <div style={{ marginTop: '48px', background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Ready to put this into action?</div>
            <p style={{ fontSize: '14px', color: C.muted, marginBottom: '18px' }}>Our AI models pick the best bets daily. Follow along free.</p>
            <Link href="/picks/nhl" style={{ display: 'inline-block', background: C.green, color: '#000', padding: '12px 24px', borderRadius: '8px', fontWeight: '800', fontSize: '14px' }}>See Today's NHL Picks →</Link>
          </div>
          <div style={{ marginTop: '20px', fontSize: '11px', color: C.muted, lineHeight: 1.6, padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            ⚠️ For entertainment only. Must be 21+. If you have a gambling problem: 1-800-522-4700.
          </div>
        </div>
      </div>
    </>
  )
}
