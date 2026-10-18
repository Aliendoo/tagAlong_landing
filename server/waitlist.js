import { createHash } from 'node:crypto'

export function createWaitlistHandler(save) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store')
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ success: false })
    }
    const origin = req.headers.origin
    if (origin) {
      try {
        if (new URL(origin).host !== req.headers.host) return res.status(403).json({ success: false })
      } catch { return res.status(403).json({ success: false }) }
    }
    if (!req.headers['content-type']?.startsWith('application/json')) return res.status(415).json({ success: false })
    let body
    try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body } catch { return res.status(400).json({ success: false }) }
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    if (body?.website || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false })
    const id = createHash('sha256').update(email).digest('hex')
    try {
      await save(id, email)
      return res.status(200).json({ success: true })
    } catch (error) {
      // Duplicate requests are successful without revealing membership or overwriting the signup date.
      if (error?.code === 6 || error?.code === 'already-exists') return res.status(200).json({ success: true })
      return res.status(503).json({ success: false })
    }
  }
}
