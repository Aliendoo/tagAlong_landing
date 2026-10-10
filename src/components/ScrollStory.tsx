import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { calendarSequence, journeySequence, swipeSequence } from '../data/phoneSequences'
import { ScrollPhone } from './ScrollPhone'
import { GroupChatBackdrop } from './GroupChatBackdrop'
import { PhoneDock } from './PhoneDock'
gsap.registerPlugin(useGSAP, ScrollTrigger)
const chapters = [
  { at: 0, jump: .08, label: 'A little less planning.', title: 'A lot more going.', description: 'Find the dates. Vote on the spots. Make a trip everyone wants in on.' },
  { at: .32, jump: .38, label: 'Everyone’s calendar. One plan.', title: 'Find your overlap.', description: 'Share when you’re free. Tagalong finds the days that work for your whole crew.' },
  { at: .48, jump: .66, label: 'Good taste is a group effort.', title: 'Keep the good ones.', description: 'A quick yes. An easy pass. Turn everyone’s saved spots into a shared shortlist.' },
  { at: .78, jump: .95, label: 'From “we should” to “we’re going.”', title: 'Your trip, together.', description: 'The dates are set. The favorites are in. All that’s left is making memories.' },
] as const
const journeyChapters = [
  { at: 0, jump: .08, label: 'From the group chat to the real thing.', title: 'Make the trip happen.', description: 'Saved reels. Shared dates. Favorite spots. One plan for all of you.' },
  { at: .18, jump: .47, label: 'Everyone’s calendar. One plan.', title: 'Find your overlap.', description: 'Share when you’re free. Pick the days that work for your whole crew.' },
  { at: .52, jump: .68, label: 'Good taste is a group effort.', title: 'Keep the good ones.', description: 'A Yes, Maybe, or No turns everyone’s favorites into your shared shortlist.' },
  { at: .81, jump: .95, label: 'From “we should” to “we’re going.”', title: 'Your trip, together.', description: 'The dates are set. The favorites are in. It’s time to go.' },
] as const
export function ScrollStory({ singlePhone = true }: { singlePhone?: boolean }) {
  const section = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const storyChapters = singlePhone ? journeyChapters : chapters
  const active = storyChapters.findLastIndex(chapter => progress >= chapter.at)
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const clock = { progress: 0 }
      gsap.to(clock, { progress: 1, ease: 'none', onUpdate: () => setProgress(clock.progress), scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom bottom', scrub: .3, invalidateOnRefresh: true } })
    })
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => media.revert()
  }, { scope: section })
  const jump = (index: number) => {
    const element = section.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setProgress(storyChapters[index].jump); return }
    const top = window.scrollY + element.getBoundingClientRect().top
    window.scrollTo({ top: top + (element.offsetHeight - window.innerHeight) * storyChapters[index].jump, behavior: 'smooth' })
  }
  return (
    <section className={`scroll-story${singlePhone ? ' single-phone-story' : ''}`} id="in-action" ref={section} aria-label="See how Tagalong works" data-stage={active}>
      <div className="story-sticky">
        <div className="story-glow" aria-hidden="true" />
        {!singlePhone && <div className="story-heading"><p className="eyebrow">{storyChapters[active].label}</p><h2>{storyChapters[active].title}</h2><p className="story-description">{storyChapters[active].description}</p></div>}
        {singlePhone ? <div className="single-phone-stage"><GroupChatBackdrop progress={progress} /><ScrollPhone sequence={journeySequence} progress={progress} /></div> : <div className="phone-pair"><ScrollPhone sequence={calendarSequence} progress={progress} /><ScrollPhone sequence={swipeSequence} progress={progress} /></div>}
        {singlePhone && <div className="story-heading"><h2>{storyChapters[active].title}</h2></div>}
        {singlePhone && <PhoneDock active={active} onSelect={jump} />}
        {!singlePhone && <nav className="story-chapters" aria-label="Product walkthrough chapters">{['Discover', 'Find a time', 'Vote together', 'Go'].map((label, index) => (
          <button type="button" key={label} onClick={() => jump(index)} aria-current={active === index ? 'step' : undefined}><span className="chapter-track" /><span>{label}</span></button>
        ))}</nav>}
        {!singlePhone && <span className="story-scroll-cue" aria-hidden="true">Scroll to explore <span>↓</span></span>}
      </div>
    </section>
  )
}
