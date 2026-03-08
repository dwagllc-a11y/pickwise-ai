// /pages/api/picks-engine.js
// Fetches real lines from The Odds API, runs Claude AI analysis, returns picks

const ODDS_API_KEY = process.env.ODDS_API_KEY
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const ODDS_BASE = 'https://api.the-odds-api.com/v4'

const SPORTS = [
  { key: 'americanfootball_nfl', label: 'NFL', icon: '🏈', color: '#ff6b35' },
  { key: 'basketball_nba', label: 'NBA', icon: '🏀', color: '#c9082a' },
  { key: 'baseball_mlb', label: 'MLB', icon: '⚾', color: '#003087' },
  { key: 'icehockey_nhl', label: 'NHL', icon: '🏒', color: '#00509e' },
]

// Fetch odds for one sport
async function fetchOdds(sportKey) {
  const url = `${ODDS_BASE}/sports/${sportKey}/odds?apiKey=${ODDS_API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american&bookmakers=draftkings,fanduel,betmgm`
  const res = await fetch(url)
  if (!res.ok) return []
  const data = await res.json()
  return data || []
}

// Format a game into a clean object for Claude to analyze
function formatGame(game, sportLabel) {
  const home = game.home_team
  const away = game.away_team
  const commence = new Date(game.commence_time)
  const timeStr = commence.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' }) + ' ET'

  // Pull best lines from bookmakers
  let spread = null, total = null, homeML = null, awayML = null

  for (const bm of (game.bookmakers || [])) {
    for (const market of (bm.markets || [])) {
      if (market.key === 'spreads' && !spread) {
        const homeOutcome = market.outcomes.find(o => o.name === home)
        const awayOutcome = market.outcomes.find(o => o.name === away)
        if (homeOutcome && awayOutcome) {
          spread = {
            homeSpread: homeOutcome.point,
            homeOdds: homeOutcome.price,
            awaySpread: awayOutcome.point,
            awayOdds: awayOutcome.price,
            book: bm.title
          }
        }
      }
      if (market.key === 'totals' && !total) {
        const over = market.outcomes.find(o => o.name === 'Over')
        const under = market.outcomes.find(o => o.name === 'Under')
        if (over && under) {
          total = { line: over.point, overOdds: over.price, underOdds: under.price, book: bm.title }
        }
      }
      if (market.key === 'h2h') {
        const homeO = market.outcomes.find(o => o.name === home)
        const awayO = market.outcomes.find(o => o.name === away)
        if (homeO && !homeML) homeML = homeO.price
        if (awayO && !awayML) awayML = awayO.price
      }
    }
  }

  return {
    id: game.id,
    sport: sportLabel,
    home,
    away,
    time: timeStr,
    spread,
    total,
    homeML,
    awayML,
  }
}

// Ask Claude to analyze a game and produce a pick
async function analyzeGame(game) {
  const prompt = `You are an expert sports betting analyst. Analyze this game and produce a sharp betting pick.

GAME DATA:
Sport: ${game.sport}
Matchup: ${game.away} @ ${game.home}
Time: ${game.time}
${game.spread ? `Spread: ${game.home} ${game.spread.homeSpread > 0 ? '+' : ''}${game.spread.homeSpread} (${game.spread.homeOdds}) | ${game.away} ${game.spread.awaySpread > 0 ? '+' : ''}${game.spread.awaySpread} (${game.spread.awayOdds})` : 'Spread: N/A'}
${game.total ? `Total: ${game.total.line} | Over ${game.total.overOdds} | Under ${game.total.underOdds}` : 'Total: N/A'}
${game.homeML ? `Moneyline: ${game.home} ${game.homeML} | ${game.away} ${game.awayML}` : ''}

Based on the lines, typical season trends for these teams, matchup dynamics, home/away splits, and your knowledge of current form, produce a single best pick for this game.

Respond ONLY with valid JSON, no markdown, no explanation outside the JSON:
{
  "pick": "team name and line (e.g. Chiefs -7 or Over 224.5)",
  "pickType": "ATS" or "Total" or "ML",
  "odds": "the odds as shown (e.g. -110)",
  "confidence": number between 55 and 88,
  "analysis": "2-3 sentence sharp analysis explaining WHY this pick has value. Reference specific stats, trends, or matchup angles. Be specific and data-driven. Do not be generic.",
  "bettingTip": "One sentence on how to bet this — unit size recommendation and which book to use"
}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await res.json()
  const text = data.content?.[0]?.text || ''

  try {
    const clean = text.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return null
  }
}

// Cache picks in memory (resets on redeploy — good enough for daily picks)
let picksCache = null
let cacheDate = null

export async function getPicks(forceRefresh = false) {
  const today = new Date().toDateString()

  // Return cached picks if same day
  if (picksCache && cacheDate === today && !forceRefresh) {
    return picksCache
  }

  const allGames = []

  // Fetch all sports in parallel
  const results = await Promise.allSettled(
    SPORTS.map(s => fetchOdds(s.key).then(games => ({ games, sport: s })))
  )

  for (const result of results) {
    if (result.status !== 'fulfilled') continue
    const { games, sport } = result.value

    // Take up to 3 games per sport (best matchups = earliest games + biggest markets)
    const topGames = games.slice(0, 3)
    for (const game of topGames) {
      allGames.push({ ...formatGame(game, sport.label), sportMeta: sport })
    }
  }

  // Analyze games in parallel (max 8 to avoid rate limits)
  const toAnalyze = allGames.slice(0, 8)
  const analyzed = await Promise.allSettled(
    toAnalyze.map(async (game) => {
      const analysis = await analyzeGame(game)
      if (!analysis) return null
      return {
        sport: game.sport,
        sportMeta: game.sportMeta,
        time: game.time,
        matchup: `${game.away} vs ${game.home}`,
        pick: analysis.pick,
        pickType: analysis.pickType,
        odds: analysis.odds,
        confidence: analysis.confidence,
        analysis: analysis.analysis,
        bettingTip: analysis.bettingTip,
      }
    })
  )

  const picks = analyzed
    .filter(r => r.status === 'fulfilled' && r.value)
    .map(r => r.value)
    .sort((a, b) => b.confidence - a.confidence) // highest confidence first

  picksCache = picks
  cacheDate = today

  return picks
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const forceRefresh = req.query.refresh === '1'

  try {
    const picks = await getPicks(forceRefresh)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate') // cache 1hr on CDN
    return res.status(200).json({ picks, generated: new Date().toISOString(), count: picks.length })
  } catch (err) {
    console.error('Picks engine error:', err)
    return res.status(500).json({ error: err.message })
  }
}
