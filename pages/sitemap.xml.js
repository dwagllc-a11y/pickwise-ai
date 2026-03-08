const BASE = 'https://pickwise.ai'
const pages = [
  '', '/picks/today', '/picks/nfl', '/picks/nba', '/picks/mlb', '/picks/nhl',
  '/sportsbooks', '/sportsbooks/draftkings', '/sportsbooks/fanduel', '/sportsbooks/betmgm', '/sportsbooks/caesars',
  '/blog', '/blog/how-to-bet-on-sports', '/blog/best-sportsbook-bonuses', '/blog/how-to-win-at-sports-betting',
  '/blog/how-to-read-nfl-point-spreads', '/blog/nba-betting-strategies-2025', '/blog/mlb-run-line-betting-guide',
  '/blog/nhl-moneyline-betting', '/blog/bankroll-management-sports-betting', '/blog/best-sports-betting-apps',
  '/blog/point-spread-explained',
]
export default function Sitemap() { return null }
export async function getServerSideProps({ res }) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p => `<url><loc>${BASE}${p}</loc><changefreq>${p.includes('/picks') ? 'daily' : 'weekly'}</changefreq><priority>${p === '' ? '1.0' : '0.8'}</priority></url>`).join('')}</urlset>`
  res.setHeader('Content-Type', 'text/xml')
  res.write(xml)
  res.end()
  return { props: {} }
}
