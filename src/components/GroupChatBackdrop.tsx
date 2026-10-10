import { useEffect, useRef, useState } from 'react'
import { ScrollRoute } from './ScrollRoute'

const messages = [
  { id: 'rome', at: 0, text: 'When are we going to Rome?', outgoing: false },
  { id: 'free', at: .08, text: 'When are you free?', outgoing: true },
  { id: 'reel', at: .20, text: 'Look at this cute reel. We should go here.', outgoing: false },
  { id: 'place', at: .38, text: 'Does this place work?', outgoing: false },
  { id: 'dates', at: .45, text: '27–29 works for me!', outgoing: true },
]

export function GroupChatBackdrop({ progress }: { progress: number }) {
  const backdrop = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const element = backdrop.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setEntered(entry.isIntersecting), { threshold: .2 })
    observer.observe(element)
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduced(preference.matches)
    updatePreference()
    preference.addEventListener('change', updatePreference)
    return () => { observer.disconnect(); preference.removeEventListener('change', updatePreference) }
  }, [])

  const latest = messages.findLast(message => progress >= message.at - .035)?.id

  return (
    <div className="group-chat-backdrop" ref={backdrop} aria-hidden="true">
      <ScrollRoute progress={progress} />
      {messages.map(message => {
        const state = reduced ? 'visible' : !entered ? 'hidden' : progress >= message.at ? 'visible' : progress >= message.at - .035 ? 'typing' : 'hidden'
        return (
          <div className={`chat-message chat-${message.id}${message.outgoing ? ' is-outgoing' : ''}`} data-state={state} data-mobile-current={message.id === latest || undefined} key={message.id}>
            {state === 'typing' ? <div className="ios-bubble ios-typing"><i /><i /><i /></div> : <>
              {message.id === 'reel' && <div className="ios-link-preview"><img src={`${import.meta.env.BASE_URL}images/rome.webp`} alt="" width="400" height="240" /><div>Trevi Fountain<span>Rome, Italy</span></div></div>}
              <div className="ios-bubble"><p>{message.text}</p></div>
            </>}
          </div>
        )
      })}
    </div>
  )
}
