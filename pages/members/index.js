import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const C = { bg: '#080b12', surface: '#0e1420', border: 'rgba(255,255,255,0.08)', green: '#00ff88', text: '#e8eaf0', muted: '#5a6070', gold: '#ffd700', red: '#ff4444' }

const premiumPicks = [
  { sport: 'NBA', time: '7:10 PM ET', matchup: 'Celtics vs 76ers', pick: 'Celtics -4.5', confidence: 84, odds: '-110', tier: 'BEST BET', analysis: 'Boston is 18-4-2 ATS at home this season. Philadelphia is 0-6 ATS as road underdogs without Embiid. The line opened at -3.5 and has been bet up to -4.5 — sharp money is on Boston. Our model gives Boston a 61.2% implied win probability at this spread. Lean heavily.' },
  { sport: 'NFL', time: 'Sun 4:25 PM', matchup: 'Chiefs vs Raiders', pick: 'Chiefs -7', confidence: 82, odds: '-115', tier: 'STRONG', analysis: 'Mahomes is 31-8 ATS as a home favorite. The Raiders OL ranks 28th in pass block win rate — KC pass rush averages 5.2 QB pressures per game. Public money is 68% on Chiefs, but line movement confirms sharp action on the same side. Unusual alignment.' },
  { sport: 'NBA', time: '9:30 PM ET', matchup: 'Lakers vs Warriors', pick: 'Over 224.5', confidence: 78, odds: '-108', tier: 'STRONG', analysis: 'Both teams rank top-10 in pace (Lakers 6th, Warriors 4th). Combined defensive rating in last 5 meetings: 115.8 — well above league average. Total has hit in 7 of last 9 matchups. Neither team has a strong incentive to slow the game down.' },
  { sport: 'NHL', time: '7:00 PM ET', matchup: 'Rangers vs Bruins', pick: 'Rangers ML', confidence: 71, odds: '+115', tier: 'VALUE', analysis: 'Shesterkin is posting a .934 SV% in his last 8 home starts. Bruins are on the second of a back-to-back after travelling from Denver. Road back-to-back teams are 38-54 ATS this season. Getting plus money on the elite goalie at home is value.' },
  { sport: 'MLB', time: '6:40 PM ET', matchup: 'Yankees vs Red Sox', pick: 'Yankees -1.5', confidence: 67, odds: '+145', tier: 'VALUE', analysis: 'Gerrit Cole vs a AAA call-up is as good as it gets on the run line. Yankees bullpen is fully rested (4 days off). Red Sox lineup ranks 27th vs RHP in wRC+ over the last 30 days. The +145 run line is plus money on a heavy favorite — worth a half-unit play.' },
  { sport: 'NBA', time: '9:00 PM ET', matchup: 'Nuggets vs Suns', pick: 'Jokic O27.5 pts', confidence: 72, odds: '-115', tier: 'PROP', analysis: 'Phoenix ranks 27th in points allowed in the paint. Jokic is averaging 31.2 points in his last 5 games vs the Suns. His usage rate spikes to 34.1% in this matchup. At -115, this prop has clear positive expected value.' },
]

const tierColors = { 'BEST BET': C.gold, 'STRONG': C.green, 'VALUE': '#60a5fa', 'PROP': '#a78bfa' }

function ConfBar({ v }) {
  const color = v >= 80 ? C.green : v >= 70 ? C.gold : '#ff8c00'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px' }}>
        <div style={{ width: `${v}%`, height: '100%', background: color, borderRadius: '3px' }} />
      </div>
      <span style={{ fontSize: '13px', fontWeight: '800', color, minWidth: '36px' }}>{v}%</span>
    </div>
  )
}

export default function Members() {
  const router = useRouter()
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    const { session_id, plan } = router.query
    if (!session_id) {
      // Check localStorage for existing session
      const saved = localStorage.getItem('pw_member')
      if (saved) {
        setMember(JSON.parse(saved))
        setLoading(false)
      } else {
        router.replace('/pricing')
      }
      return
    }

    // Verify new session
    fetch('/api/verify-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.active) {
          const memberData = { ...data, verified_at: Date.now() }
          localStorage.setItem('pw_member', JSON.stringify(memberData))
          setMember(memberData)
        } else {
          router.replace('/pricing')
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        router.replace('/pricing')
      })
  }, [router.query])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
          <div style={{ color: C.green, fontWeight: '700' }}>Verifying your access...</div>
        </div>
      </div>
    )
  }

  const planLabel = member?.plan === 'daily' ? 'Daily Pass' : member?.plan === 'weekly' ? 'Weekly Pass' : 'Monthly Member'
  const planColor = member?.plan === 'daily' ? '#60a5fa' : member?.plan === 'weekly' ? C.green : C.gold

  return (
    <>
      <Head>
        <title>Members Dashboard — PickWise AI</title>
        <meta name="robots" content="noindex" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Barlow', sans-serif", color: C.text }}>
        {/* Nav */}
        <nav style={{ background: 'rgba(8,11,18,0.98)', borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: '900', color: C.text }}>PICK<span style={{ color: C.green }}>WISE</span> <span style={{ fontSize: '10px', background: C.green, color: '#000', padding: '2px 6px', borderRadius: '4px' }}>AI</span></Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', background: `${planColor}22`, color: planColor, padding: '4px 10px', borderRadius: '6px', fontWeight: '700', border: `1px solid ${planColor}44` }}>
              ✓ {planLabel}
            </span>
            <span style={{ fontSize: '12px', color: C.muted }}>{member?.email}</span>
          </div>
        </nav>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px 80px' }}>

          {/* Welcome */}
          <div style={{ background: 'linear-gradient(135deg, rgba(0,255,136,0.07), rgba(0,255,136,0.02))', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '14px', padding: '24px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '13px', color: C.green, fontWeight: '700', marginBottom: '4px' }}>🔓 PREMIUM ACCESS ACTIVE</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '24px', fontWeight: '900' }}>Today's Full Pick Sheet</div>
              <div style={{ fontSize: '13px', color: C.muted, marginTop: '4px' }}>{premiumPicks.length} picks · Updated 9:47 AM ET · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
            </div>
            <div style={{ display: 'flex', gap: '16px', textAlign: 'center' }}>
              {[['6', 'Picks Today'], ['84%', 'Top Confidence'], ['W7', 'Streak']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '28px', fontWeight: '900', color: C.green }}>{v}</div>
                  <div style={{ fontSize: '11px', color: C.muted }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sport filter */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {['All', 'NBA', 'NFL', 'MLB', 'NHL', 'PROP'].map(s => (
              <button key={s} style={{ background: 'rgba(255,255,255,0.06)', color: C.muted, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>{s}</button>
            ))}
          </div>

          {/* Premium picks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
            {premiumPicks.map((pick, i) => (
              <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11px', fontWeight: '800', color: C.muted, letterSpacing: '0.06em' }}>{pick.sport} · {pick.time}</span>
                        <span style={{ fontSize: '10px', fontWeight: '800', background: `${tierColors[pick.tier]}22`, color: tierColors[pick.tier], padding: '2px 7px', borderRadius: '4px', letterSpacing: '0.04em' }}>{pick.tier}</span>
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '700' }}>{pick.matchup}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '24px', fontWeight: '900', color: C.green }}>{pick.pick}</div>
                      <div style={{ fontSize: '14px', color: C.muted }}>{pick.odds}</div>
                    </div>
                  </div>

                  <div style={{ margin: '14px 0 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '11px', color: C.muted, fontWeight: '600', whiteSpace: 'nowrap' }}>AI CONFIDENCE</span>
                      <div style={{ flex: 1 }}><ConfBar v={pick.confidence} /></div>
                    </div>
                  </div>

                  <p style={{ fontSize: '14px', color: '#8a90a0', lineHeight: 1.7, margin: '12px 0 8px' }}>{pick.analysis}</p>

                  <button onClick={() => setExpanded(expanded === i ? null : i)} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 12px', fontSize: '12px', color: C.muted, cursor: 'pointer', fontFamily: 'inherit', fontWeight: '600' }}>
                    {expanded === i ? '▲ Less' : '▼ Betting Guide'}
                  </button>

                  {expanded === i && (
                    <div style={{ marginTop: '14px', padding: '14px', background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.12)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: C.green, letterSpacing: '0.06em', marginBottom: '8px' }}>HOW TO BET THIS</div>
                      <div style={{ fontSize: '13px', color: '#8a90a0', lineHeight: 1.7 }}>
                        <strong style={{ color: C.text }}>Recommended stake:</strong> {pick.tier === 'BEST BET' ? '2-3 units' : pick.tier === 'STRONG' ? '1-2 units' : '1 unit'}<br />
                        <strong style={{ color: C.text }}>Best book for this line:</strong> Check DraftKings and FanDuel — lines can vary by half a point.<br />
                        <strong style={{ color: C.text }}>Line to avoid:</strong> Do not bet {pick.sport === 'NBA' || pick.sport === 'NFL' ? `worse than ${pick.odds.includes('+') ? parseInt(pick.odds) - 10 : parseInt(pick.odds) - 10}` : 'significantly worse odds'}.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sportsbook links for members */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.06em', marginBottom: '14px' }}>PLACE YOUR BETS — BEST AVAILABLE LINES</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
              {[
                { name: 'DraftKings', color: '#00c74d', url: 'https://draftkings.com', bonus: 'Bet $5 Get $200' },
                { name: 'FanDuel', color: '#1493ff', url: 'https://fanduel.com', bonus: 'No Sweat $1K' },
                { name: 'BetMGM', color: '#c9a84c', url: 'https://betmgm.com', bonus: 'First Bet $1.5K' },
                { name: 'Caesars', color: '#b8860b', url: 'https://caesars.com', bonus: 'First Bet $1K' },
              ].map(b => (
                <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer sponsored" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${b.color}33`, borderRadius: '8px', padding: '12px', textAlign: 'center', display: 'block' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: b.color, marginBottom: '3px' }}>{b.name}</div>
                  <div style={{ fontSize: '11px', color: C.muted }}>{b.bonus}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{ fontSize: '11px', color: C.muted, lineHeight: 1.7, padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            ⚠️ For entertainment purposes only. 21+. Gambling involves risk. If you have a gambling problem, call 1-800-522-4700. Past performance does not guarantee future results.
          </div>
        </div>
      </div>
    </>
  )
}
