import Head from 'next/head'
import Link from 'next/link'

const C = { bg: '#080b12', surface: '#0e1420', border: 'rgba(255,255,255,0.08)', green: '#00ff88', text: '#e8eaf0', muted: '#5a6070' }

const picks = [
  {
    "matchup": "Chiefs vs Raiders",
    "time": "Sun 4:25 PM ET",
    "pick": "Chiefs -7",
    "odds": "-115",
    "confidence": 82,
    "type": "ATS",
    "analysis": "Mahomes at home dominant all season. Raiders OL banged up, KC pass rush should feast. Chiefs covered 6 of last 8 as home favorites."
  },
  {
    "matchup": "Eagles vs Cowboys",
    "time": "Sun 1:00 PM ET",
    "pick": "Over 47.5",
    "odds": "-110",
    "confidence": 74,
    "type": "Total",
    "analysis": "Both offenses among top-10 in scoring. Cowboys secondary ranked 28th vs pass. Total has gone over in 5 straight Eagles home games."
  },
  {
    "matchup": "Dolphins vs Bills",
    "time": "Sun 8:20 PM ET",
    "pick": "Bills -3",
    "odds": "-108",
    "confidence": 69,
    "type": "ATS",
    "analysis": "Bills at home with weather advantage. Dolphins struggle in cold. Allen playing at MVP level. Lean Bills to cover in prime time."
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
        <title>NFL Betting Picks & Predictions — PickWise AI</title>
        <meta name="description" content="Expert NFL point spread picks, totals, and moneyline predictions with AI analysis." />
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
            <div style={{ fontSize: '11px', color: '#ff6b35', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '10px' }}>AI PICKS</div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: '900', letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '12px' }}>🏈 NFL Betting Picks & Predictions</h1>
            <p style={{ fontSize: '15px', color: C.muted, lineHeight: 1.6, marginBottom: '20px' }}>Expert NFL point spread picks, totals, and moneyline predictions with AI analysis.</p>
            <div style={{ display: 'inline-flex', gap: '0', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
              {[['Season Record', '94-61 ATS', C.text], ['ROI', '+14.2%', C.green]].map(([l, v, c]) => (
                <div key={l} style={{ padding: '10px 18px', borderRight: `1px solid ${C.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: C.muted, fontWeight: '600', letterSpacing: '0.06em' }}>{l.toUpperCase()}</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: c, fontFamily: "'Barlow Condensed', sans-serif" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
            {picks.map((p, i) => (
              <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '22px', borderLeft: `4px solid #ff6b35` }}>
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
