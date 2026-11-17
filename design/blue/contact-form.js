const form = document.getElementById('contact-form')
if (form) {
  const email = form.elements.email
  const message = form.elements.message
  const button = form.querySelector('button')
  const status = document.getElementById('contact-status')
  let requestId = crypto.randomUUID()
  let pending = false

  form.addEventListener('input', () => {
    requestId = crypto.randomUUID()
    email.removeAttribute('aria-invalid')
    message.removeAttribute('aria-invalid')
    status.textContent = ''
  })

  form.addEventListener('submit', async event => {
    event.preventDefault()
    if (pending) return
    if (!email.checkValidity()) {
      email.setAttribute('aria-invalid', 'true')
      status.textContent = 'Enter a valid email so we can reply.'
      email.focus()
      return
    }
    if (!message.value.trim()) {
      message.setAttribute('aria-invalid', 'true')
      status.textContent = 'Add a message before sending.'
      message.focus()
      return
    }
    pending = true
    button.disabled = true
    email.readOnly = message.readOnly = true
    button.textContent = 'Sending…'
    status.textContent = ''
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: requestId,
          email: email.value,
          message: message.value,
          website: form.elements.website.value,
        }),
        signal: AbortSignal.timeout(15000),
      })
      const result = await response.json()
      if (!response.ok || result.success !== true) throw new Error('Not saved')
      form.reset()
      requestId = crypto.randomUUID()
      status.textContent = 'Message received. Thanks for getting in touch!'
    } catch {
      status.textContent = 'Your message couldn’t be saved. Please try again.'
    } finally {
      pending = false
      button.disabled = false
      email.readOnly = message.readOnly = false
      button.textContent = 'Send message'
    }
  })
}
