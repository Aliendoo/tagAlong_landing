import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import contact from '../api/contact.js'
import waitlist from '../api/waitlist.js'

process.env.CONTACT_LOCAL_PREVIEW = 'true'
const root = resolve('dist')
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' }
createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://127.0.0.1').pathname
  if (pathname === '/api/contact' || pathname === '/api/waitlist') {
    let body = ''
    for await (const chunk of req) {
      body += chunk
      if (Buffer.byteLength(body) > 20000) {
        res.writeHead(413).end()
        return
      }
    }
    req.body = body
    res.status = code => { res.statusCode = code; return res }
    res.json = value => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(value)) }
    await (pathname === '/api/contact' ? contact : waitlist)(req, res)
    return
  }
  const file = resolve(root, '.' + decodeURIComponent(pathname === '/' ? '/index.html' : pathname))
  if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return }
  try {
    const data = await readFile(file)
    res.setHeader('Content-Type', mime[extname(file)] || 'application/octet-stream')
    res.setHeader('Cache-Control', 'no-store')
    res.end(data)
  } catch { res.writeHead(404).end('Not found') }
}).listen(5188, '127.0.0.1', () => console.log('Contact preview at http://127.0.0.1:5188/#contact'))
