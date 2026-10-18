import { useRef, useState, type FormEvent } from 'react'

export function WaitlistSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const submitting = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    submitting.current = true
    setStatus('submitting')
    setError('')
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), website: new FormData(event.currentTarget).get('website') }),
        signal: AbortSignal.timeout(15000),
      })
      const result = await response.json()
      if (!response.ok || result.success !== true) throw new Error('Signup was not confirmed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
      setError('We couldn’t save your email. Please try again in a moment.')
    } finally {
      submitting.current = false
    }
  }

  return (
    <section className="waitlist-section" id="waitlist">
      <div className="waitlist-content">
        <div data-reveal>
          <p className="beta-invitation">Your next trip starts here.</p>
          <p className="beta-description">Be one of the first to try TagAlong with your friends.</p>
          {status === 'success' ? (
            <div className="signup-success" role="status"><span aria-hidden="true">✓</span> You’re on the list. We’ll email you when it’s time.</div>
          ) : (
            <form className="signup-form" onSubmit={submit} aria-label="Join the beta list">
              <div className="signup-trap" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
              <label htmlFor="signup-email">Email address</label>
              <div className="signup-fields">
                <input id="signup-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" required maxLength={254}
                  value={email} onChange={event => setEmail(event.target.value)} readOnly={status === 'submitting'} aria-describedby={status === 'error' ? 'signup-error' : undefined} />
                <button className="button button-orange cta-button" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Joining…' : 'Join Beta List'}</button>
              </div>
              {status === 'error' && <p className="signup-error" id="signup-error" role="alert">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
