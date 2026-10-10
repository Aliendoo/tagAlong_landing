import { type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set('[data-reveal]', { autoAlpha: 0, y: 22 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 94%', once: true,
        onEnter: elements => gsap.to(elements, { autoAlpha: 1, y: 0, duration: .65, stagger: .09, ease: 'power2.out', clearProps: 'transform' }),
      })
    })
    return () => media.revert()
  }, { scope })
}
