// GET /api/kronos-status — public read of KRONOS's last heartbeat.
// Returns { status, lastSeen, agoMs } where status is one of:
//   online   (heartbeat fresh, idle)        -> green
//   working  (heartbeat fresh, state=busy)  -> yellow
//   offline  (no heartbeat within 5 min)    -> red
// On any backend error the client treats a failed fetch as "unknown" (muted).
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
})

const OFFLINE_MS = 5 * 60 * 1000

export default async function handler(req, res) {
  // Short CDN cache so heavy traffic doesn't hammer the KV free tier.
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30')
  try {
    const data = await redis.get('kronos:status') // { lastSeen, state } | null
    const lastSeen = data?.lastSeen ?? null
    const state = data?.state ?? 'idle'
    const now = Date.now()

    let status
    if (!lastSeen || now - lastSeen > OFFLINE_MS) status = 'offline'
    else if (state === 'busy') status = 'working'
    else status = 'online'

    res.status(200).json({ status, lastSeen, agoMs: lastSeen ? now - lastSeen : null })
  } catch (err) {
    // Surface as offline rather than 500 so the badge stays graceful.
    res.status(200).json({ status: 'offline', lastSeen: null, agoMs: null })
  }
}
