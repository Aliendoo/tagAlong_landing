import { type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const OFFSET = 24

function reveal(elements: Element[]) {
  gsap.to(elements, {
    autoAlpha: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.12,
    overwrite: true,
    // Hand transform back to CSS so hover lifts (.step:hover) keep working.
    clearProps: 'transform',
  })
}

// Hides an element once it's fully off-screen so it can fade in again next time.
function reset(elements: Element[], y: number) {
  gsap.set(elements, { autoAlpha: 0, y, overwrite: true })
}

// Fades in anything marked with data-reveal each time it scrolls into view:
// rising from below when scrolling down, settling from above when scrolling up.
// Elements entering together are staggered slightly so groups (cards, bios) flow in.
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set('[data-reveal]', { autoAlpha: 0, y: OFFSET })

      ScrollTrigger.batch('[data-reveal]', {
        start: 'top bottom',
        end: 'bottom top',
        onEnter: reveal,
        onEnterBack: reveal,
        onLeave: (elements) => reset(elements, -OFFSET),
        onLeaveBack: (elements) => reset(elements, OFFSET),
      })

      heroPhoneHandoff()
      fillOutlineHeadings()
      driftGlows(scope.current)
    })

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 681px)', () => dealCards('fan'))
    mm.add('(prefers-reduced-motion: no-preference) and (max-width: 680px)', () => dealCards('slide'))
  }, { scope })
}

// Scroll-linked ("scrubbed") motion: these follow the scroll position instead of playing on their own.

// As you scroll through the hero, the phone swings from leaning left to leaning right and drifts down
// while the photo and stickers float off and fade,
// handing off to the stats below.
function heroPhoneHandoff() {
  // Runs from the first scroll until the phone has left the screen.
  const scrollTrigger = { trigger: '.hero-section', start: 'top top', endTrigger: '.phone-frame', end: 'bottom top', scrub: 0.5 }
  // Pendulum tilt: leans left at the top of the page and swings over to leaning right.
  gsap.fromTo('.phone-frame', { rotation: -8, y: 0, scale: 1 }, { rotation: 8, y: 110, scale: 0.94, ease: 'none', scrollTrigger })
  // Stickers already float with a CSS transform animation, so drift them through the separate `translate` property.
  gsap.to('.photo-card-back', { '--drift-y': '-90px', opacity: 0.3, ease: 'none', scrollTrigger })
  gsap.to('.sticker-saved', { '--drift-y': '-150px', opacity: 0, ease: 'none', scrollTrigger })
  gsap.to('.sticker-friends', { '--drift-y': '-50px', opacity: 0.2, ease: 'none', scrollTrigger })
}

// Orange outline headings fill in with solid color as they move up the screen.
function fillOutlineHeadings() {
  gsap.utils.toArray<HTMLElement>('.how-section .outline-orange, .founders-section .outline-orange').forEach((heading) => {
    gsap.fromTo(heading, { color: 'rgba(255,107,0,0)' }, {
      color: 'rgba(255,107,0,1)',
      ease: 'none',
      scrollTrigger: { trigger: heading, start: 'top 85%', end: 'top 40%', scrub: true },
    })
  })
}

// How-it-works cards deal out like a swipe stack: fanned in the middle on desktop, sliding in on phones.
function dealCards(style: 'fan' | 'slide') {
  const cards = gsap.utils.toArray<HTMLElement>('.step')
  if (style === 'fan') {
    gsap.from(cards, {
      x: (i, card: HTMLElement) => (1 - i) * (card.offsetWidth + 20),
      y: 24,
      rotation: (i) => [-7, 2, 7][i] ?? 0,
      ease: 'none',
      scrollTrigger: { trigger: '.steps-grid', start: 'top 90%', end: 'top 45%', scrub: 0.5, invalidateOnRefresh: true },
    })
  } else {
    cards.forEach((card, i) => {
      gsap.from(card, {
        x: i % 2 ? 40 : -40,
        rotation: i % 2 ? 4 : -4,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 65%', scrub: 0.5 },
      })
    })
  }
}

// Background glows move at slightly different speeds than the content for a sense of depth.
function driftGlows(container: HTMLElement | null) {
  const shifts = [-120, 80, -60, 140, -100, 60, -140, 100]
  gsap.utils.toArray<HTMLElement>('.page-glows span').forEach((glow, i) => {
    gsap.to(glow, {
      y: shifts[i % shifts.length],
      ease: 'none',
      scrollTrigger: { trigger: container, start: 'top top', end: 'bottom bottom', scrub: true },
    })
  })
}
