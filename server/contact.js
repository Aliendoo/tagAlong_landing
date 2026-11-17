export function createContactHandler(save) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store')
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ success: false })
    }
    try {
      if (req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) {
        return res.status(403).json({ success: false })
      }
    } catch {
      return res.status(403).json({ success: false })
    }
    if (!req.headers['content-type']?.startsWith('application/json')) {
      return res.status(415).json({ success: false })
    }
    let body
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    } catch {
      return res.status(400).json({ success: false })
    }
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const message = typeof body?.message === 'string' ? body.message.trim() : ''
    const id = typeof body?.id === 'string' ? body.id : ''
    if (body?.website || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        !message || message.length > 3000 || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      return res.status(400).json({ success: false })
    }
    try {
      await save(id, { email, message })
      return res.status(200).json({ success: true })
    } catch (error) {
      if (error?.code === 6 || error?.code === 'already-exists') {
        return res.status(200).json({ success: true })
      }
      return res.status(503).json({ success: false })
    }
  }
}
