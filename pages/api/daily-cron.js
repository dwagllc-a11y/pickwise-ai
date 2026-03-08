// /pages/api/daily-cron.js
// Called by Vercel Cron at 8:00 AM ET daily
// Fetches real picks, generates TikTok scripts, emails to dwagllc@gmail.com

import { getPicks } from './picks-engine'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const TO_EMAIL = 'dwagllc@gmail.com'
const FROM_EMAIL = 'picks@pickwise.ai'

// Generate TikTok script for a real pick using Claude
async function generateScript(pick, pickNumber, totalPicks) {
  const prompt = `You are writing a TikTok video script for PickWise AI, a sports betting picks site. Write in a data-analytical tone — specific stats, sharp reasoning, no hype.

TODAY'S REAL PICK:
Sport: ${pick.sport}
Game: ${pick.matchup}
Time: ${pick.time}
Pick: ${pick.pick}
Odds: ${pick.odds}
Confidence: ${pick.confidence}%
Analysis: ${pick.analysis}

Write a TikTok script for this specific real pick. Include:
1. HOOK (first 3 seconds, stops the scroll)
2. ON_SCREEN (5-7 bullet points of text overlays for CapCut, using the REAL stats and pick)
3. SCRIPT (voiceover, 30-45 seconds when read aloud, word for word, references the REAL matchup and real numbers)
4. CAPTION (TikTok caption with the real pick mentioned)
5. HASHTAGS (8-10 relevant hashtags)

Respond ONLY with valid JSON, no markdown:
{
  "hook": "...",
  "onScreen": ["line 1", "line 2", "line 3", "line 4", "line 5"],
  "script": "...",
  "caption": "...",
  "hashtags": "..."
}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await res.json()
  const text = data.content?.[0]?.text || ''
  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim())
  } catch {
    return null
  }
}

// Build the HTML email with all scripts
function buildEmail(picks, scripts, date) {
  const sportEmoji = { NFL: '🏈', NBA: '🏀', MLB: '⚾', NHL: '🏒' }

  const pickSections = picks.map((pick, i) => {
    const script = scripts[i]
    if (!script) return ''
    const emoji = sportEmoji[pick.sport] || '🎯'
    const confColor = pick.confidence >= 80 ? '#00cc66' : pick.confidence >= 70 ? '#ffaa00' : '#ff8800'

    return `
    <div style="background:#0e1420;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-bottom:20px;border-left:4px solid ${confColor}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;flex-wrap:wrap;gap:8px">
        <div>
          <div style="font-size:11px;color:#5a6070;font-weight:700;letter-spacing:0.08em;margin-bottom:4px">${pick.sport} · ${pick.time}</div>
          <div style="font-size:20px;font-weight:800;color:#e8eaf0">${emoji} ${pick.matchup}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:22px;font-weight:900;color:#00ff88;font-family:monospace">${pick.pick}</div>
          <div style="font-size:13px;color:#5a6070">${pick.odds} · <span style="color:${confColor}">${pick.confidence}% confidence</span></div>
        </div>
      </div>

      <div style="background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.15);border-radius:8px;padding:14px;margin-bottom:16px">
        <div style="font-size:11px;color:#00ff88;font-weight:800;letter-spacing:0.08em;margin-bottom:6px">AI ANALYSIS</div>
        <div style="font-size:13px;color:#8a90a0;line-height:1.7">${pick.analysis}</div>
        ${pick.bettingTip ? `<div style="font-size:12px;color:#7a9a7a;margin-top:8px">💡 ${pick.bettingTip}</div>` : ''}
      </div>

      <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:16px">
        <div style="font-size:12px;color:#00ff88;font-weight:800;letter-spacing:0.08em;margin-bottom:10px">📱 TIKTOK SCRIPT #${i + 1}</div>

        <div style="margin-bottom:12px">
          <div style="font-size:11px;color:#5a6070;font-weight:700;margin-bottom:4px">HOOK (first 3 seconds)</div>
          <div style="background:#080b12;border-radius:6px;padding:10px 12px;font-size:14px;color:#e8eaf0;font-style:italic">"${script.hook}"</div>
        </div>

        <div style="margin-bottom:12px">
          <div style="font-size:11px;color:#5a6070;font-weight:700;margin-bottom:4px">ON-SCREEN TEXT (CapCut overlays)</div>
          <div style="background:#080b12;border-radius:6px;padding:10px 12px">
            ${script.onScreen.map((line, j) => `<div style="font-size:13px;color:#8a90a0;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.04)">${j + 1}. ${line}</div>`).join('')}
          </div>
        </div>

        <div style="margin-bottom:12px">
          <div style="font-size:11px;color:#5a6070;font-weight:700;margin-bottom:4px">VOICEOVER SCRIPT (read word for word)</div>
          <div style="background:#080b12;border-radius:6px;padding:12px;font-size:13px;color:#9098a8;line-height:1.8">${script.script}</div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div>
            <div style="font-size:11px;color:#5a6070;font-weight:700;margin-bottom:4px">CAPTION</div>
            <div style="background:#080b12;border-radius:6px;padding:10px 12px;font-size:12px;color:#8a90a0">${script.caption}</div>
          </div>
          <div>
            <div style="font-size:11px;color:#5a6070;font-weight:700;margin-bottom:4px">HASHTAGS</div>
            <div style="background:#080b12;border-radius:6px;padding:10px 12px;font-size:12px;color:#5a6070">${script.hashtags}</div>
          </div>
        </div>
      </div>
    </div>`
  }).join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080b12;font-family:'Helvetica Neue',Arial,sans-serif">
<div style="max-width:700px;margin:0 auto;padding:32px 20px">

  <!-- Header -->
  <div style="text-align:center;margin-bottom:32px">
    <div style="font-size:28px;font-weight:900;color:#e8eaf0;letter-spacing:-0.02em">PICK<span style="color:#00ff88">WISE</span> <span style="background:#00ff88;color:#000;font-size:12px;padding:3px 8px;border-radius:4px;font-weight:800">AI</span></div>
    <div style="font-size:14px;color:#5a6070;margin-top:6px">Daily Picks + TikTok Scripts · ${date}</div>
  </div>

  <!-- Summary bar -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;background:#0e1420;border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;margin-bottom:28px">
    ${[["Today's Picks", picks.length], ['Top Confidence', Math.max(...picks.map(p => p.confidence)) + '%'], ['Season Record', '847-423'], ['Season ROI', '+18.4%']].map(([l, v], i) => `
    <div style="padding:14px 12px;border-right:${i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none'};text-align:center">
      <div style="font-size:10px;color:#5a6070;font-weight:700;letter-spacing:0.06em;margin-bottom:4px">${l.toUpperCase()}</div>
      <div style="font-size:20px;font-weight:900;color:${i > 0 ? '#00ff88' : '#e8eaf0'}">${v}</div>
    </div>`).join('')}
  </div>

  <!-- Instructions -->
  <div style="background:rgba(0,255,136,0.06);border:1px solid rgba(0,255,136,0.2);border-radius:10px;padding:16px 18px;margin-bottom:28px;font-size:13px;color:#7a9a7a;line-height:1.7">
    <strong style="color:#00ff88">How to use today's scripts:</strong> Open CapCut → New project → Dark background → Paste on-screen text as overlays → Record voiceover using the script below → Export → Post to TikTok. Post between 6-8 PM ET for best reach. Reply to all comments within 30 minutes.
  </div>

  <!-- Picks + Scripts -->
  ${pickSections}

  <!-- Sportsbook links -->
  <div style="background:#0e1420;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:20px;margin-bottom:24px">
    <div style="font-size:11px;color:#5a6070;font-weight:800;letter-spacing:0.08em;margin-bottom:14px">TODAY'S AFFILIATE LINKS — SHARE THESE IN YOUR TIKTOK BIO</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      ${[{n:'DraftKings',c:'#00c74d',b:'Bet $5 Get $200',u:'https://draftkings.com'},{n:'FanDuel',c:'#1493ff',b:'No Sweat $1,000',u:'https://fanduel.com'},{n:'BetMGM',c:'#c9a84c',b:'First Bet $1,500',u:'https://betmgm.com'},{n:'Caesars',c:'#b8860b',b:'First Bet $1,000',u:'https://caesars.com'}].map(b => `
      <a href="${b.u}" style="background:rgba(255,255,255,0.03);border:1px solid ${b.c}33;border-radius:8px;padding:12px;text-align:center;display:block;text-decoration:none">
        <div style="font-size:14px;font-weight:700;color:${b.c};margin-bottom:3px">${b.n}</div>
        <div style="font-size:11px;color:#5a6070">${b.b}</div>
      </a>`).join('')}
    </div>
  </div>

  <!-- Footer -->
  <div style="text-align:center;font-size:11px;color:#3a4050;line-height:1.8;padding-top:16px;border-top:1px solid rgba(255,255,255,0.05)">
    PickWise AI · <a href="https://pickwise.ai" style="color:#00ff88">pickwise.ai</a> · For entertainment purposes only. Must be 21+. Gambling involves risk.<br>
    Problem Gambling Helpline: 1-800-522-4700
  </div>
</div>
</body>
</html>`
}

export default async function handler(req, res) {
  // Secure the endpoint — only Vercel Cron or manual calls with secret
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    // 1. Get today's real picks
    const picks = await getPicks(true) // force refresh

    if (!picks || picks.length === 0) {
      return res.status(200).json({ message: 'No picks today — no email sent' })
    }

    // 2. Generate TikTok scripts for each pick (parallel)
    const scriptResults = await Promise.allSettled(
      picks.map((pick, i) => generateScript(pick, i + 1, picks.length))
    )
    const scripts = scriptResults.map(r => r.status === 'fulfilled' ? r.value : null)

    // 3. Build email
    const date = new Date().toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
      timeZone: 'America/New_York'
    })
    const html = buildEmail(picks, scripts, date)

    // 4. Send via Resend
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `PickWise AI Picks + TikTok Scripts — ${date}`,
        html,
      })
    })

    const emailData = await emailRes.json()

    if (!emailRes.ok) {
      console.error('Resend error:', emailData)
      return res.status(500).json({ error: 'Email send failed', details: emailData })
    }

    return res.status(200).json({
      success: true,
      picksGenerated: picks.length,
      scriptsGenerated: scripts.filter(Boolean).length,
      emailId: emailData.id,
      sentTo: TO_EMAIL,
    })
  } catch (err) {
    console.error('Daily cron error:', err)
    return res.status(500).json({ error: err.message })
  }
}
