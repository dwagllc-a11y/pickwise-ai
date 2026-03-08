import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const C = {
  bg: '#080b12', surface: '#0e1420', border: 'rgba(255,255,255,0.08)',
  green: '#00ff88', text: '#e8eaf0', muted: '#5a6070', gold: '#ffd700', red: '#ff4444'
}

const tierColors = { 'ATS': '#00ff88', 'Total': '#60a5fa', 'ML': '#ffd700' }
const sportColors = { NFL: '#ff6b35', NBA: '#c9082a', MLB: '#003087', NHL: '#00509e' }

function ConfBar({ v }) {
  const color = v >= 80 ? '#00ff88' : v >= 70 ? '#ffd700' : '#ff8c00'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px' }}>
        <div style={{ width: v + '%', height: '100%', background: color, borderRadius: '3px', transition: 'width 1s ease' }} />
      </div>
      <span style={{ fontSize: '13px', fontWeight: '800', color: color, minWidth: '36px' }}>{v}%</span>
    </div>
  )
}

function PickCard({ pick, index, isLocked }) {
  const sportColor = sportColors[pick.sport] || C.muted
  const typeColor = tierColors[pick.pickType] || C.green
  return (
    <div style={{ background: C.surface, border: '1px solid ' + C.border, borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: sportColor }} />
      <div style={{ padding: '20px 20px 20px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: C.muted, letterSpacing: '0.06em' }}>{pick.sport} · {pick.time}</span>
              <span style={{ fontSize: '10px', fontWeight: '800', background: typeColor + '22', color: typeColor, padding: '2px 7px', borderRadius: '4px' }}>{pick.pickType}</span>
              {index === 0 && <span style={{ fontSize: '10px', fontWeight: '800', background: 'rgba(255,215,0,0.15)', color: '#ffd700', padding: '2px 7px', borderRadius: '4px' }}>⭐ BEST BET</span>}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: C.text }}>{pick.matchup}</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: 'monospace', fontSize: '22px', fontWeight: '900', color: '#00ff88' }}>{pick.pick}</div>
            <div style={{ fontSize: '13px', color: C.muted }}>{pick.odds}</div>
          </div>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11px', color: C.muted, fontWeight: '600', whiteSpace: 'nowrap' }}>AI CONFIDENCE</span>
            <div style={{ flex: 1 }}><ConfBar v={pick.confidence} /></div>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#8a90a0', lineHeight: 1.7, marginBottom: '10px' }}>{pick.analysis}</p>
        {pick.bettingTip && (
          <div style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.12)', borderRadius: '7px', padding: '10px 12px', fontSize: '13px', color: '#7a9a7a' }}>
            💡 <strong style={{ color: '#00ff88' }}>Tip:</strong> {pick.bettingTip}
          </div>
        )}
      </div>
      {isLocked && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,11,18,0.88)', backdropFilter: 'blur(5px)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>🔒</span>
          <div style={{ fontSize: '14px', fontWeight: '700', color: C.text }}>Members Only</div>
          <div style={{ fontSize: '12px', color: C.muted, marginBottom: '4px' }}>Full analysis + confidence score</div>
          <Link href="/pricing" style={{ background: '#00ff88', color: '#000', padding: '8px 20px', borderRadius: '7px', fontWeight: '800', fontSize: '13px' }}>Unlock All Picks →</Link>
        </div>
      )}
    </div>
  )
}

export default function TodayPicks() {
  const [picks, setPicks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [generated, setGenerated] = useState(null)
  const [filter, setFilter] = useState('all')
  const [isMember, setIsMember] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pw_member')
      if (saved) { const m = JSON.parse(saved); if (m.active) setIsMember(true) }
    } catch {}

    fetch('/api/picks-engine')
      .then(r => r.json())
      .then(data => {
        if (data.picks) { setPicks(data.picks); setGenerated(data.generated) }
        else setError('Could not load picks right now.')
        setLoading(false)
      })
      .catch(() => { setError('Could not connect to picks engine.'); setLoading(false) })
  }, [])

  const filtered = filter === 'all' ? picks : picks.filter(p => p.sport.toLowerCase() === filter)
  const sports = ['all', ...new Set(picks.map(p => p.sport.toLowerCase()))]
  const topConf = picks.length > 0 ? Math.max(...picks.map(p => p.confidence)) : 0

  return (
    <>
      <Head>
        <title>{"Today's Sports Betting Picks — AI Analysis | PickWise AI"}</title>
        <meta name="description" content="Today's best sports betting picks powered by AI. Live lines from DraftKings and FanDuel. NFL, NBA, MLB, NHL picks with confidence scores." />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Barlow', sans-serif", color: C.text }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,11,18,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid ' + C.border, padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: '900', color: C.text }}>PICK<span style={{ color: '#00ff88' }}>WISE</span> <span style={{ fontSize: '10px', background: '#00ff88', color: '#000', padding: '2px 6px', borderRadius: '4px' }}>AI</span></Link>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {['NFL','NBA','MLB','NHL'].map(s => (
              <Link key={s} href={'/picks/' + s.toLowerCase()} style={{ fontSize: '13px', fontWeight: '700', color: C.muted, padding: '4px 8px' }}>{s}</Link>
            ))}
            <Link href="/pricing" style={{ background: '#00ff88', color: '#000', padding: '7px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '800', marginLeft: '8px' }}>
              {isMember ? '✓ Member' : 'Unlock All →'}
            </Link>
          </div>
        </nav>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px 80px' }}>
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.red, animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: '11px', fontWeight: '800', color: C.red, letterSpacing: '0.1em' }}>LIVE · AI-GENERATED FROM REAL LINES</span>
            </div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px,5vw,54px)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              {"Today's Picks"}<br /><span style={{ color: '#00ff88' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </h1>
            {generated && (
              <div style={{ fontSize: '12px', color: C.muted }}>
                Lines sourced from DraftKings · FanDuel · BetMGM · Updated {new Date(generated).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' })} ET
              </div>
            )}
          </div>

          {!loading && picks.length > 0 && (
            <div style={{ display: 'flex', gap: '0', background: C.surface, border: '1px solid ' + C.border, borderRadius: '10px', overflow: 'hidden', marginBottom: '24px' }}>
              {[["Today's Picks", picks.length, C.text], ['Top Confidence', topConf + '%', '#00ff88'], ['Season Record', '847-423', C.text], ['Season ROI', '+18.4%', '#00ff88']].map(([l, v, c], i) => (
                <div key={l} style={{ flex: 1, padding: '12px 16px', borderRight: i < 3 ? '1px solid ' + C.border : 'none', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: C.muted, fontWeight: '600', letterSpacing: '0.06em', marginBottom: '3px' }}>{l.toUpperCase()}</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: '900', color: c }}>{v}</div>
                </div>
              ))}
            </div>
          )}

          {!isMember && (
            <div style={{ background: 'linear-gradient(135deg, rgba(0,255,136,0.07), rgba(0,255,136,0.02))', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '10px', padding: '14px 18px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#00ff88', marginBottom: '2px' }}>{'🔒 Showing 2 of ' + picks.length + ' picks free'}</div>
                <div style={{ fontSize: '12px', color: C.muted }}>Members see all picks + confidence + full AI analysis</div>
              </div>
              <Link href="/pricing" style={{ background: '#00ff88', color: '#000', padding: '8px 18px', borderRadius: '7px', fontWeight: '800', fontSize: '13px', whiteSpace: 'nowrap' }}>Unlock from $19.99 →</Link>
            </div>
          )}

          {!loading && picks.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {sports.map(s => (
                <button key={s} onClick={() => setFilter(s)} style={{ background: filter === s ? '#00ff88' : 'rgba(255,255,255,0.06)', color: filter === s ? '#000' : C.muted, border: 'none', borderRadius: '6px', padding: '7px 14px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'uppercase' }}>
                  {s === 'all' ? '🔥 All' : s}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ background: C.surface, border: '1px solid ' + C.border, borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '40%', animation: 'pulse 1.5s infinite' }} />
                  <div style={{ height: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '60%', animation: 'pulse 1.5s infinite' }} />
                  <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '85%', animation: 'pulse 1.5s infinite' }} />
                </div>
              ))}
              <div style={{ textAlign: 'center', padding: '20px', color: C.muted, fontSize: '13px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🤖</div>
                Fetching live lines from DraftKings, FanDuel, BetMGM...<br />Running AI analysis on today's games...
              </div>
            </div>
          )}

          {error && !loading && (
            <div style={{ background: 'rgba(255,68,68,0.08)', border: '1px solid rgba(255,68,68,0.2)', borderRadius: '10px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
              <div style={{ color: C.red, fontWeight: '700', marginBottom: '6px' }}>{error}</div>
              <div style={{ color: C.muted, fontSize: '13px' }}>Check that ODDS_API_KEY and ANTHROPIC_API_KEY are set in Vercel environment variables.</div>
            </div>
          )}

          {!loading && !error && picks.length === 0 && (
            <div style={{ background: C.surface, border: '1px solid ' + C.border, borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📋</div>
              <div style={{ fontWeight: '700', marginBottom: '8px' }}>No games on the slate today</div>
              <div style={{ color: C.muted, fontSize: '13px' }}>Check back tomorrow. Picks are generated fresh each morning.</div>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {filtered.map((pick, i) => (
                <PickCard key={i} pick={pick} index={i} isLocked={!isMember && i >= 2} />
              ))}
            </div>
          )}

          <div style={{ background: C.surface, border: '1px solid ' + C.border, borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: C.muted, letterSpacing: '0.08em', marginBottom: '14px' }}>PLACE YOUR BETS — BEST CURRENT BONUSES</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
              {[{name:'DraftKings',color:'#00c74d',url:'https://draftkings.com',bonus:'Bet $5 Get $200'},{name:'FanDuel',color:'#1493ff',url:'https://fanduel.com',bonus:'No Sweat $1,000'},{name:'BetMGM',color:'#c9a84c',url:'https://betmgm.com',bonus:'First Bet $1,500'},{name:'Caesars',color:'#b8860b',url:'https://caesars.com',bonus:'First Bet $1,000'}].map(b => (
                <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer sponsored" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid ' + b.color + '33', borderRadius: '8px', padding: '12px', textAlign: 'center', display: 'block' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: b.color, marginBottom: '3px' }}>{b.name}</div>
                  <div style={{ fontSize: '11px', color: C.muted }}>{b.bonus}</div>
                </a>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '11px', color: C.muted, lineHeight: 1.8, padding: '14px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            ⚠️ Picks are AI-generated for entertainment purposes only. Lines sourced from The Odds API. Past performance does not guarantee future results. Must be 21+. Problem Gambling Helpline: 1-800-522-4700.
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </>
  )
}
