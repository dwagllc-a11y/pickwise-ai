import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const C = {
  bg: '#080b12',
  surface: '#0e1420',
  border: 'rgba(255,255,255,0.08)',
  green: '#00ff88',
  greenDim: 'rgba(0,255,136,0.12)',
  red: '#ff4444',
  gold: '#ffd700',
  text: '#e8eaf0',
  muted: '#5a6070',
  accent: '#0ea5e9',
}

const record = { wins: 847, losses: 423, pushes: 31, roi: '+18.4%', streak: 'W7' }

const affiliates = [
  { name: 'DraftKings', bonus: 'Bet $5 Get $200', logo: '🎯', color: '#00c74d', url: 'https://draftkings.com', rating: 4.9, tag: 'BEST OVERALL' },
  { name: 'FanDuel', bonus: 'No Sweat First Bet $1000', logo: '⚡', color: '#1493ff', url: 'https://fanduel.com', rating: 4.8, tag: 'BEST PROMOS' },
  { name: 'BetMGM', bonus: 'First Bet Up to $1500', logo: '♠️', color: '#c9a84c', url: 'https://betmgm.com', rating: 4.7, tag: 'BEST ODDS' },
  { name: 'Caesars', bonus: 'First Bet on Caesars $1000', logo: '👑', color: '#b8860b', url: 'https://caesars.com', rating: 4.6, tag: '' },
]

const sports = [
  { key: 'nfl', label: 'NFL', icon: '🏈' },
  { key: 'nba', label: 'NBA', icon: '🏀' },
  { key: 'mlb', label: 'MLB', icon: '⚾' },
  { key: 'nhl', label: 'NHL', icon: '🏒' },
]

function ConfidenceMeter({ value }) {
  const color = value >= 80 ? C.green : value >= 70 ? C.gold : '#ff8c00'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: '2px', transition: 'width 1s ease' }} />
      </div>
      <span style={{ fontSize: '13px', fontWeight: '700', color, minWidth: '36px' }}>{value}%</span>
    </div>
  )
}

export default function Home() {
  const [activeSport, setActiveSport] = useState('all')
  const [mounted, setMounted] = useState(false)
  const [todaysPicks, setTodaysPicks] = useState([])
  const [picksLoading, setPicksLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    fetch('/api/picks-engine')
      .then(r => r.json())
      .then(data => { if (data.picks) setTodaysPicks(data.picks) })
      .catch(() => {})
      .finally(() => setPicksLoading(false))
  }, [])

  const filtered = activeSport === 'all' ? todaysPicks : todaysPicks.filter(p => p.sport.toLowerCase() === activeSport)

  return (
    <>
      <Head>
        <title>PickWise AI — Expert Sports Betting Picks & Analysis | NFL, NBA, MLB, NHL</title>
        <meta name="description" content="AI-powered sports betting picks for NFL, NBA, MLB and NHL. Expert analysis, best odds, sportsbook reviews and daily picks with 58% win rate." />
        <meta property="og:title" content="PickWise AI — Expert Sports Betting Picks" />
        <meta property="og:description" content="AI-powered daily picks with 58% win rate. NFL, NBA, MLB, NHL analysis and top sportsbook bonuses." />
        <meta name="twitter:card" content="summary_large_image" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "PickWise AI",
          "url": "https://pickwise.ai",
          "description": "AI-powered sports betting picks and analysis for NFL, NBA, MLB, and NHL"
        })}} />
      </Head>

      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Barlow', sans-serif" }}>

        {/* Nav */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,11,18,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: '900', letterSpacing: '-0.02em', color: C.text }}>PICK<span style={{ color: C.green }}>WISE</span></span>
            <span style={{ fontSize: '10px', background: C.green, color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: '800', letterSpacing: '0.05em' }}>AI</span>
          </Link>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {[['Picks', '/picks/today'], ['NFL', '/picks/nfl'], ['NBA', '/picks/nba'], ['MLB', '/picks/mlb'], ['NHL', '/picks/nhl'], ['Sportsbooks', '/sportsbooks'], ['Blog', '/blog'], ['Pricing', '/pricing']].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '6px 12px', fontSize: '13px', fontWeight: '600', color: C.muted, borderRadius: '6px' }}>{label}</Link>
            ))}
            <Link href="/sportsbooks" style={{ marginLeft: '8px', background: C.green, color: '#000', padding: '7px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '800' }}>Get Bonus →</Link>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ background: `linear-gradient(180deg, #0d1825 0%, ${C.bg} 100%)`, borderBottom: `1px solid ${C.border}`, padding: '56px 24px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Grid background */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* Live badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,68,68,0.15)', border: '1px solid rgba(255,68,68,0.3)', borderRadius: '20px', padding: '5px 12px', marginBottom: '20px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.red, animation: mounted ? 'pulse 1.5s infinite' : 'none' }} />
              <span style={{ fontSize: '11px', fontWeight: '700', color: C.red, letterSpacing: '0.1em' }}>LIVE PICKS UPDATED</span>
            </div>

            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(42px, 7vw, 82px)', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '16px', textTransform: 'uppercase' }}>
              AI-POWERED<br /><span style={{ color: C.green }}>SPORTS PICKS</span><br />THAT WIN
            </h1>
            <p style={{ fontSize: '17px', color: C.muted, maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.6 }}>
              Machine learning models analyzing 10,000+ data points per game. NFL, NBA, MLB, NHL daily picks with full analysis.
            </p>

            {/* Record strip */}
            <div style={{ display: 'inline-flex', gap: '0', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', overflow: 'hidden', marginBottom: '32px' }}>
              {[['Season Record', `${record.wins}-${record.losses}`, C.text], ['Win Rate', '58.3%', C.green], ['ROI', record.roi, C.green], ['Current Streak', record.streak, C.gold]].map(([label, val, color]) => (
                <div key={label} style={{ padding: '14px 20px', borderRight: `1px solid ${C.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: C.muted, fontWeight: '600', letterSpacing: '0.06em', marginBottom: '4px' }}>{label.toUpperCase()}</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color, fontFamily: "'Barlow Condensed', sans-serif" }}>{val}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/picks/today" style={{ background: C.green, color: '#000', padding: '13px 28px', borderRadius: '8px', fontWeight: '800', fontSize: '15px' }}>Today's Picks →</Link>
              <Link href="/sportsbooks" style={{ background: 'rgba(255,255,255,0.08)', color: C.text, padding: '13px 28px', borderRadius: '8px', fontWeight: '700', fontSize: '15px' }}>Claim Free Bets</Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>

            {/* Left: Picks feed */}
            <div>
              {/* Paywall teaser banner */}
              <div style={{ background: 'linear-gradient(135deg, rgba(0,255,136,0.07), rgba(0,255,136,0.02))', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '12px', padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: C.green, marginBottom: '2px' }}>🔒 2 of {picksLoading ? '...' : todaysPicks.length} picks shown — unlock all</div>
                  <div style={{ fontSize: '12px', color: C.muted }}>Full confidence scores + premium analysis + email alerts</div>
                </div>
                <Link href="/pricing" style={{ background: C.green, color: '#000', padding: '8px 18px', borderRadius: '7px', fontWeight: '800', fontSize: '13px', whiteSpace: 'nowrap' }}>See Pricing →</Link>
              </div>

              {/* Sport filter */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: C.muted, fontWeight: '600', marginRight: '4px' }}>TODAY:</span>
                {[{ key: 'all', label: 'All Sports', icon: '🔥' }, ...sports].map(s => (
                  <button key={s.key} onClick={() => setActiveSport(s.key)} style={{ background: activeSport === s.key ? C.green : 'rgba(255,255,255,0.06)', color: activeSport === s.key ? '#000' : C.muted, border: 'none', borderRadius: '6px', padding: '7px 14px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>{s.icon}</span>{s.label}
                  </button>
                ))}
              </div>

              {/* Picks cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {picksLoading ? (
                  [1,2,3].map(i => (
                    <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ height: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', width: '35%', animation: 'pulse 1.5s infinite' }} />
                      <div style={{ height: '18px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', width: '55%', animation: 'pulse 1.5s infinite' }} />
                      <div style={{ height: '11px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', width: '80%', animation: 'pulse 1.5s infinite' }} />
                    </div>
                  ))
                ) : filtered.length === 0 ? (
                  <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '32px', textAlign: 'center', color: C.muted }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>📋</div>
                    No games on the slate right now. Check back soon.
                  </div>
                ) : filtered.map((pick, i) => (
                  <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
                    {/* Sport tag */}
                    <div style={{ position: 'absolute', top: 0, left: 0, background: pick.sport === 'NFL' ? '#ff6b35' : pick.sport === 'NBA' ? '#c9082a' : pick.sport === 'MLB' ? '#003087' : '#00509e', width: '4px', height: '100%' }} />
                    <div style={{ paddingLeft: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '11px', fontWeight: '700', color: C.muted, letterSpacing: '0.08em' }}>{pick.sport} · {pick.time}</span>
                          </div>
                          <div style={{ fontSize: '17px', fontWeight: '700', color: C.text }}>{pick.matchup}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '18px', fontWeight: '800', color: C.green, fontFamily: "'Barlow Condensed', sans-serif" }}>{pick.pick}</div>
                          <div style={{ fontSize: '13px', color: C.muted }}>{pick.odds}</div>
                        </div>
                      </div>
                      <p style={{ fontSize: '13px', color: '#8a90a0', lineHeight: 1.6, marginBottom: '12px' }}>{pick.analysis}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '11px', color: C.muted, fontWeight: '600' }}>AI CONFIDENCE</span>
                        <div style={{ flex: 1 }}><ConfidenceMeter value={pick.confidence} /></div>
                      </div>
                      {pick.bettingTip && (
                        <div style={{ marginTop: '10px', background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.1)', borderRadius: '6px', padding: '8px 10px', fontSize: '12px', color: '#7a9a7a' }}>
                          💡 {pick.bettingTip}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '14px 16px', fontSize: '11px', color: C.muted, lineHeight: 1.6 }}>
                ⚠️ <strong>Gambling Disclaimer:</strong> PickWise AI picks are for entertainment purposes only. Gambling involves risk. Please bet responsibly. If you have a gambling problem, call 1-800-522-4700. Must be 21+ and in a legal sports betting state to participate.
              </div>
            </div>

            {/* Right: Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Top sportsbooks */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.06em', color: C.text }}>TOP SPORTSBOOKS</span>
                  <span style={{ fontSize: '10px', background: 'rgba(0,255,136,0.15)', color: C.green, padding: '2px 7px', borderRadius: '4px', fontWeight: '700' }}>BONUSES</span>
                </div>
                {affiliates.map((a, i) => (
                  <a key={i} href={a.url} target="_blank" rel="noopener noreferrer sponsored" style={{ display: 'block', padding: '14px 16px', borderBottom: i < affiliates.length - 1 ? `1px solid ${C.border}` : 'none', transition: 'background 0.15s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ fontSize: '24px', width: '36px', textAlign: 'center' }}>{a.logo}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '700', color: C.text }}>{a.name}</span>
                          {a.tag && <span style={{ fontSize: '9px', background: 'rgba(0,255,136,0.15)', color: C.green, padding: '2px 5px', borderRadius: '3px', fontWeight: '800' }}>{a.tag}</span>}
                        </div>
                        <div style={{ fontSize: '12px', color: a.color, fontWeight: '600' }}>{a.bonus}</div>
                      </div>
                      <span style={{ fontSize: '16px', color: C.green }}>→</span>
                    </div>
                  </a>
                ))}
                <div style={{ padding: '12px 16px' }}>
                  <Link href="/sportsbooks" style={{ display: 'block', textAlign: 'center', fontSize: '13px', color: C.green, fontWeight: '700' }}>Compare All Sportsbooks →</Link>
                </div>
              </div>

              {/* Quick stats */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.06em', marginBottom: '14px' }}>THIS MONTH</div>
                {[['Overall Record', '63-41', C.green], ['NFL ATS', '14-8', C.green], ['NBA ATS', '29-18', C.green], ['MLB Run Line', '12-9', C.gold], ['NHL ML', '8-6', C.gold], ['Best Streak', 'W9', C.green]].map(([label, val, color]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: '13px', color: C.muted }}>{label}</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Email signup */}
              <div style={{ background: `linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,255,136,0.02))`, border: `1px solid rgba(0,255,136,0.2)`, borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '16px', fontWeight: '800', marginBottom: '6px' }}>🔔 Daily Picks to Inbox</div>
                <div style={{ fontSize: '13px', color: C.muted, marginBottom: '14px', lineHeight: 1.5 }}>Get tomorrow's top picks before the lines move. Free.</div>
                <input type="email" placeholder="your@email.com" style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: `1px solid ${C.border}`, borderRadius: '7px', padding: '10px 12px', color: C.text, fontSize: '13px', marginBottom: '8px' }} />
                <button style={{ width: '100%', background: C.green, color: '#000', border: 'none', borderRadius: '7px', padding: '10px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>Get Free Picks →</button>
              </div>
            </div>
          </div>

          {/* Sport sections */}
          <div style={{ marginTop: '48px' }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '28px', fontWeight: '900', letterSpacing: '0.02em', marginBottom: '20px', textTransform: 'uppercase' }}>Browse By Sport</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {[
                { sport: 'NFL', icon: '🏈', color: '#ff6b35', record: '94-61', desc: 'Point spreads, totals, moneylines, futures', href: '/picks/nfl' },
                { sport: 'NBA', icon: '🏀', color: '#c9082a', record: '187-121', desc: 'ATS picks, player props, game totals', href: '/picks/nba' },
                { sport: 'MLB', icon: '⚾', color: '#003087', record: '312-198', desc: 'Run lines, first-5, player props', href: '/picks/mlb' },
                { sport: 'NHL', icon: '🏒', color: '#00509e', record: '254-143', desc: 'Puck lines, moneylines, totals', href: '/picks/nhl' },
              ].map(s => (
                <Link key={s.sport} href={s.href} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '20px', display: 'block', borderTop: `3px solid ${s.color}` }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: '900', letterSpacing: '0.02em', color: C.text, marginBottom: '4px' }}>{s.sport} PICKS</div>
                  <div style={{ fontSize: '13px', color: s.color, fontWeight: '700', marginBottom: '6px' }}>Season: {s.record}</div>
                  <div style={{ fontSize: '12px', color: C.muted, lineHeight: 1.5 }}>{s.desc}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Latest blog posts */}
          <div style={{ marginTop: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '28px', fontWeight: '900', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Latest Analysis</h2>
              <Link href="/blog" style={{ fontSize: '13px', color: C.green, fontWeight: '700' }}>All Articles →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {[
                { title: 'How to Read NFL Point Spreads (Complete Guide)', sport: 'NFL', date: 'Today', href: '/blog/how-to-read-nfl-point-spreads' },
                { title: 'Best NBA Betting Strategies for 2025', sport: 'NBA', date: 'Yesterday', href: '/blog/nba-betting-strategies-2025' },
                { title: 'Top 5 Sportsbook Bonuses This Month', sport: 'BONUS', date: '2 days ago', href: '/blog/best-sportsbook-bonuses' },
                { title: 'MLB Betting: How to Bet Run Lines', sport: 'MLB', date: '3 days ago', href: '/blog/mlb-run-line-betting-guide' },
                { title: 'NHL Moneyline Betting Explained', sport: 'NHL', date: '4 days ago', href: '/blog/nhl-moneyline-betting' },
                { title: 'How to Manage Your Sports Betting Bankroll', sport: 'GUIDE', date: '5 days ago', href: '/blog/bankroll-management-sports-betting' },
              ].map((post, i) => (
                <Link key={i} href={post.href} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '18px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', background: 'rgba(255,255,255,0.08)', color: C.muted, padding: '3px 7px', borderRadius: '4px', flexShrink: 0, marginTop: '2px' }}>{post.sport}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: C.text, lineHeight: 1.4, marginBottom: '6px' }}>{post.title}</div>
                    <div style={{ fontSize: '11px', color: C.muted }}>{post.date}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${C.border}`, padding: '40px 24px', marginTop: '40px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '32px' }}>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: '900', marginBottom: '12px' }}>PICK<span style={{ color: C.green }}>WISE</span> AI</div>
                <p style={{ fontSize: '13px', color: C.muted, lineHeight: 1.7 }}>AI-powered sports betting analysis. 58%+ win rate. Daily picks for NFL, NBA, MLB, and NHL.</p>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.08em', color: C.muted, marginBottom: '12px' }}>PICKS</div>
                {[['Today\'s Picks', '/picks/today'], ['NFL Picks', '/picks/nfl'], ['NBA Picks', '/picks/nba'], ['MLB Picks', '/picks/mlb'], ['NHL Picks', '/picks/nhl']].map(([l, h]) => (
                  <Link key={h} href={h} style={{ display: 'block', fontSize: '13px', color: C.muted, marginBottom: '7px' }}>{l}</Link>
                ))}
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.08em', color: C.muted, marginBottom: '12px' }}>SPORTSBOOKS</div>
                {[['DraftKings Review', '/sportsbooks/draftkings'], ['FanDuel Review', '/sportsbooks/fanduel'], ['BetMGM Review', '/sportsbooks/betmgm'], ['Caesars Review', '/sportsbooks/caesars'], ['All Sportsbooks', '/sportsbooks']].map(([l, h]) => (
                  <Link key={h} href={h} style={{ display: 'block', fontSize: '13px', color: C.muted, marginBottom: '7px' }}>{l}</Link>
                ))}
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.08em', color: C.muted, marginBottom: '12px' }}>GUIDES</div>
                {[['How to Bet on Sports', '/blog/how-to-bet-on-sports'], ['Point Spread Explained', '/blog/point-spread-explained'], ['Bankroll Management', '/blog/bankroll-management-sports-betting'], ['Best Betting Apps', '/blog/best-sports-betting-apps'], ['Betting Blog', '/blog']].map(([l, h]) => (
                  <Link key={h} href={h} style={{ display: 'block', fontSize: '13px', color: C.muted, marginBottom: '7px' }}>{l}</Link>
                ))}
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '20px', fontSize: '11px', color: C.muted, lineHeight: 1.7 }}>
              <p>© {new Date().getFullYear()} PickWise AI. For entertainment purposes only. Must be 21+ to gamble. Gambling problem? Call 1-800-522-4700 (NCPG). PickWise AI contains affiliate links — we may earn a commission when you sign up through our links at no additional cost to you.</p>
            </div>
          </div>
        </footer>

        <style>{`
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
          a:hover { opacity: 0.85; }
        `}</style>
      </div>
    </>
  )
}
