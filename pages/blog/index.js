import Head from 'next/head'
import Link from 'next/link'

const C = { bg: '#080b12', surface: '#0e1420', border: 'rgba(255,255,255,0.08)', green: '#00ff88', text: '#e8eaf0', muted: '#5a6070' }

const posts = [
  { slug: 'how-to-bet-on-sports', title: 'How to Bet on Sports: Complete Beginner Guide 2025', sport: 'GUIDE', desc: 'Types of bets, how odds work, and where to place your first bet.', date: 'Mar 2025' },
  { slug: 'best-sportsbook-bonuses', title: 'Best Sportsbook Bonuses This Month (March 2025)', sport: 'BONUS', desc: 'The best welcome offers from DraftKings, FanDuel, BetMGM, and more.', date: 'Mar 2025' },
  { slug: 'how-to-win-at-sports-betting', title: "How to Win at Sports Betting (What the 3% Do Differently)", sport: 'GUIDE', desc: "The exact framework that separates long-term winners from losers.", date: 'Mar 2025' },
  { slug: 'how-to-read-nfl-point-spreads', title: 'How to Read NFL Point Spreads: Complete Beginner Guide', sport: 'NFL', desc: 'Everything you need to know about reading and betting NFL spreads.', date: 'Mar 2025' },
  { slug: 'nba-betting-strategies-2025', title: 'NBA Betting Strategies That Actually Work in 2025', sport: 'NBA', desc: 'Back-to-back angles, totals, and player prop strategies.', date: 'Mar 2025' },
  { slug: 'mlb-run-line-betting-guide', title: 'MLB Run Line Betting: Complete Guide to Winning', sport: 'MLB', desc: 'When to back the -1.5 and when to take the dog at +1.5.', date: 'Mar 2025' },
  { slug: 'nhl-moneyline-betting', title: 'NHL Moneyline Betting: How to Find Value Every Night', sport: 'NHL', desc: 'Goalie matchups, back-to-back angles, and plus-money value.', date: 'Mar 2025' },
  { slug: 'bankroll-management-sports-betting', title: 'Sports Betting Bankroll Management: The Complete System', sport: 'GUIDE', desc: 'Unit sizing, Kelly criterion, and how to never go broke.', date: 'Mar 2025' },
  { slug: 'best-sports-betting-apps', title: 'Best Sports Betting Apps 2025: Ranked and Reviewed', sport: 'GUIDE', desc: 'DraftKings vs FanDuel vs BetMGM — which app is best?', date: 'Mar 2025' },
  { slug: 'point-spread-explained', title: 'Point Spread Betting Explained: A Simple Guide', sport: 'GUIDE', desc: 'The simplest explanation of spread betting for beginners.', date: 'Mar 2025' },
]

const sportColors = { NFL: '#ff6b35', NBA: '#c9082a', MLB: '#003087', NHL: '#00509e', GUIDE: '#5a6070', BONUS: '#ffd700' }

export default function Blog() {
  return (
    <>
      <Head>
        <title>Sports Betting Guides & Analysis — PickWise AI Blog</title>
        <meta name="description" content="Expert sports betting guides, strategy articles, and sportsbook reviews. Learn how to bet on NFL, NBA, MLB, and NHL profitably." />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Barlow', sans-serif", color: C.text }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,11,18,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: '900', color: C.text }}>PICK<span style={{ color: C.green }}>WISE</span> <span style={{ fontSize: '10px', background: C.green, color: '#000', padding: '2px 6px', borderRadius: '4px' }}>AI</span></Link>
          <Link href="/picks/today" style={{ fontSize: '13px', color: C.muted }}>← Today's Picks</Link>
        </nav>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px 80px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '12px' }}>Sports Betting<br /><span style={{ color: C.green }}>Guides & Strategy</span></h1>
            <p style={{ fontSize: '16px', color: C.muted, lineHeight: 1.6 }}>Expert analysis, betting strategies, and sportsbook reviews to help you bet smarter.</p>
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {posts.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '20px 24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', background: `${sportColors[p.sport]}22`, color: sportColors[p.sport], padding: '4px 8px', borderRadius: '5px', flexShrink: 0, marginTop: '2px', letterSpacing: '0.04em' }}>{p.sport}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: C.text, marginBottom: '5px', lineHeight: 1.3 }}>{p.title}</div>
                  <div style={{ fontSize: '13px', color: C.muted }}>{p.desc}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', color: C.muted }}>{p.date}</span>
                  <span style={{ color: C.green, fontSize: '16px' }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
