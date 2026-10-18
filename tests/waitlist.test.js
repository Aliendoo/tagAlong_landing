import test from 'node:test'
import assert from 'node:assert/strict'
import { createWaitlistHandler } from '../server/waitlist.js'

function response() {
  return { headers: {}, setHeader(k, v) { this.headers[k] = v }, status(code) { this.code = code; return this }, json(body) { this.body = body; return this } }
}
const request = (body, extra = {}) => ({ method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://tagalong.example', host: 'tagalong.example' }, body, ...extra })
test('normalizes emails and gives repeats the same storage ID', async () => {
  const rows = []
  const handle = createWaitlistHandler(async (...row) => { rows.push(row) })
  for (const email of [' Friend@Example.com ', 'friend@example.com']) {
    const res = response(); await handle(request({ email }), res); assert.equal(res.body.success, true)
  }
  assert.deepEqual(rows[0], rows[1]); assert.equal(rows[0][1], 'friend@example.com'); assert.equal(rows[0][0].length, 64)
})
test('rejects invalid input, bots, foreign origins and unsupported methods without writing', async () => {
  let writes = 0
  const handle = createWaitlistHandler(async () => { writes++ })
  for (const req of [request({ email: 'bad' }), request(null), request('{'), request({ email: 'a@b.com', website: 'bot' }), request({ email: 'a@b.com' }, { method: 'GET' }), request({ email: 'a@b.com' }, { headers: { origin: 'https://other.example', host: 'tagalong.example' } })]) {
    const res = response(); await handle(req, res); assert.ok(res.code >= 400)
  }
  assert.equal(writes, 0)
})
test('duplicate signup succeeds but storage failures never claim success', async () => {
  for (const [code, expected] of [[6, 200], ['already-exists', 200], ['unavailable', 503]]) {
    const handle = createWaitlistHandler(async () => { throw { code } })
    const res = response(); await handle(request({ email: 'friend@example.com' }), res)
    assert.equal(res.code, expected); assert.equal(res.body.success, expected === 200)
  }
})
