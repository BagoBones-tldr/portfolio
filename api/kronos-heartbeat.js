// POST /api/kronos-heartbeat — KRONOS checks in here from Quintin's machine.
// Auth: header `x-kronos-secret` must equal env KRONOS_HEARTBEAT_SECRET.
// Body: { state: 'idle' | 'busy' } (defaults to 'idle').
// Writes { lastSeen, state } to Upstash; the status route reads it.
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' })
  }
  if (req.headers['x-kronos-secret'] !== process.env.KRONOS_HEARTBEAT_SECRET) {
    return res.status(401).json({ error: 'unauthorized' })
  }
  try {
    const state = req.body?.state === 'busy' ? 'busy' : 'idle'
    await redis.set('kronos:status', { lastSeen: Date.now(), state })
    res.status(200).json({ ok: true, state })
  } catch (err) {
    res.status(500).json({ error: 'write failed' })
  }
}
