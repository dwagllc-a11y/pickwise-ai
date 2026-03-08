import Head from 'next/head'
import Link from 'next/link'

const C = { bg: '#080b12', surface: '#0e1420', border: 'rgba(255,255,255,0.08)', green: '#00ff88', text: '#e8eaf0', muted: '#5a6070' }

const picks = [
  {
    "matchup": "Yankees vs Red Sox",
    "time": "6:40 PM ET",
    "pick": "Yankees -1.5",
    "odds": "+145",
    "confidence": 67,
    "type": "Run Line",
    "analysis": "Cole on the mound, rested bullpen. Red Sox starting a AAA call-up. This is a mismatch at the pitcher level. Yankees cover the RL."
  },
  {
    "matchup": "Dodgers vs Giants",
    "time": "9:45 PM ET",
    "pick": "Under 7.5",
    "odds": "-112",
    "confidence": 71,
    "type": "Total",
    "analysis": "Two elite starters going in a pitcher-friendly park. Oracle Park night games have gone under at 63% this season. Back the under."
  },
  {
    "matchup": "Braves vs Mets",
    "time": "7:10 PM ET",
    "pick": "Braves ML",
    "odds": "-135",
    "confidence": 76,
    "type": "Moneyline",
    "analysis": "Braves ace vs Mets number 4 starter. Atlanta offense is top-3 in runs scored. Lay the juice on the superior team here."
  }
]

function ConfBar({ v }) {
  const color = v >= 80 ? '#00ff88' : v >= 70 ? '#ffd700' : '#ff8c00'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
        <div style={{ width: `${v}%`, height: '100%', background: color, borderRadius: '2px' }} />
      </div>
      <span style={{ fontSize: '13px', fontWeight: '700', color, minWidth: '36px' }}>{v}%</span>
    </div>
  )
}

export default function PicksPage() {
  return (
    <>
      <Head>
        <title>MLB Betting Picks & Predictions — PickWise AI</title>
        <meta name="description" content="Daily MLB run line picks, game totals, first-5 innings, and player prop predictions." />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Barlow', sans-serif", color: C.text }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,11,18,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: '900', color: C.text }}>PICK<span style={{ color: C.green }}>WISE</span> <span style={{ fontSize: '10px', background: C.green, color: '#000', padding: '2px 6px', borderRadius: '4px' }}>AI</span></Link>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {['NFL', 'NBA', 'MLB', 'NHL'].map(s => (
              <Link key={s} href={`/picks/${s.toLowerCase()}`} style={{ fontSize: '13px', fontWeight: '700', color: C.muted }}>{s}</Link>
            ))}
            <Link href="/sportsbooks" style={{ background: C.green, color: '#000', padding: '7px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '800' }}>Free Bets →</Link>
          </div>
        </nav>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '11px', color: '#003087', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '10px' }}>AI PICKS</div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: '900', letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '12px' }}>⚾ MLB Betting Picks & Predictions</h1>
            <p style={{ fontSize: '15px', color: C.muted, lineHeight: 1.6, marginBottom: '20px' }}>Daily MLB run line picks, game totals, first-5 innings, and player prop predictions.</p>
            <div style={{ display: 'inline-flex', gap: '0', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
              {[['Season Record', '312-198 RL', C.text], ['ROI', '+16.8%', C.green]].map(([l, v, c]) => (
                <div key={l} style={{ padding: '10px 18px', borderRight: `1px solid ${C.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: C.muted, fontWeight: '600', letterSpacing: '0.06em' }}>{l.toUpperCase()}</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: c, fontFamily: "'Barlow Condensed', sans-serif" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
            {picks.map((p, i) => (
              <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '22px', borderLeft: `4px solid #003087` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: C.muted, fontWeight: '700', letterSpacing: '0.06em', marginBottom: '3px' }}>{p.type} · {p.time}</div>
                    <div style={{ fontSize: '18px', fontWeight: '700' }}>{p.matchup}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: '900', color: C.green }}>{p.pick}</div>
                    <div style={{ fontSize: '13px', color: C.muted }}>{p.odds}</div>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#8a90a0', lineHeight: 1.6, marginBottom: '12px' }}>{p.analysis}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '11px', color: C.muted, fontWeight: '600', whiteSpace: 'nowrap' }}>AI CONFIDENCE</span>
                  <div style={{ flex: 1 }}><ConfBar v={p.confidence} /></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: '800', marginBottom: '6px' }}>Maximize Your Winnings</div>
            <p style={{ fontSize: '13px', color: C.muted, marginBottom: '16px' }}>Claim free bet bonuses from top sportsbooks before placing today's picks.</p>
            <Link href="/sportsbooks" style={{ display: 'inline-block', background: C.green, color: '#000', padding: '11px 24px', borderRadius: '7px', fontWeight: '800', fontSize: '14px' }}>Claim Free Bets →</Link>
          </div>

          <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '11px', color: C.muted, lineHeight: 1.6 }}>
            ⚠️ For entertainment purposes only. Must be 21+. Gambling involves risk. Problem Gambling Helpline: 1-800-522-4700.
          </div>
        </div>
      </div>
    </>
  )
}
