import { useEffect, useId, useRef } from 'react'

const route = 'M 210 30 C 20 20 25 215 200 245 C 370 275 310 105 475 110 S 950 90 1090 190 C 1270 320 1190 440 1020 420 C 850 400 970 300 1090 485 C 1230 700 910 735 720 665 S 410 510 265 580 C 80 670 20 470 115 410 C 205 350 345 455 225 680 C 180 765 245 805 380 785'
const stops = [0, .34, .67, 1]

export function ScrollRoute({ progress }: { progress: number }) {
  const maskId = useId()
  const path = useRef<SVGPathElement>(null)
  const traveler = useRef<SVGCircleElement>(null)
  const markers = useRef<(SVGCircleElement | null)[]>([])

  useEffect(() => {
    const line = path.current
    if (!line) return
    const length = line.getTotalLength()
    const point = line.getPointAtLength(length * progress)
    traveler.current?.setAttribute('cx', String(point.x))
    traveler.current?.setAttribute('cy', String(point.y))
    markers.current.forEach((marker, index) => {
      const stop = line.getPointAtLength(length * stops[index])
      marker?.setAttribute('cx', String(stop.x))
      marker?.setAttribute('cy', String(stop.y))
    })
  }, [progress])

  return (
    <svg className="scroll-route" viewBox="0 0 1280 820" preserveAspectRatio="none" aria-hidden="true">
      <defs><mask id={maskId}><path d={route} pathLength="1" fill="none" stroke="white" strokeWidth="24" strokeDasharray={`${progress} 1`} /></mask></defs>
      <path ref={path} className="route-line route-upcoming" d={route} />
      <path className="route-line route-visited" d={route} mask={`url(#${maskId})`} />
      {stops.map((stop, index) => <circle key={stop} ref={element => { markers.current[index] = element }} className={`route-stop${progress >= stop ? ' is-visited' : ''}`} r="10" />)}
      <circle ref={traveler} className="route-traveler" r="7" />
    </svg>
  )
}
