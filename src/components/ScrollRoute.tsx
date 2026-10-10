import { useEffect, useId, useRef } from 'react'

const route = 'M 210 75 C 20 30 25 215 200 245 C 370 275 310 105 475 110 S 950 90 1090 190 C 1270 320 1190 440 1020 420 C 850 400 970 300 1090 485 C 1230 700 910 735 720 665 S 410 510 265 580 C 80 670 20 470 115 410 C 205 350 345 455 225 680 C 180 765 245 805 380 785'
const mobileRoute = 'M 53 62 C 2 53 10 171 61 183 C 116 196 278 105 332 146 C 391 185 382 300 337 317 C 282 338 314 387 349 425 C 394 488 352 572 273 561 C 198 551 130 596 68 576 C 4 555 14 461 56 463'
const stops = [0, .34, .67, 1]

function RouteArtwork({ progress, mobile = false }: { progress: number; mobile?: boolean }) {
  const artwork = mobile ? mobileRoute : route
  const maskId = useId()
  const path = useRef<SVGPathElement>(null)
  const traveler = useRef<SVGCircleElement>(null)
  const markers = useRef<(SVGGElement | null)[]>([])

  useEffect(() => {
    const line = path.current
    if (!line) return
    const length = line.getTotalLength()
    const point = line.getPointAtLength(length * progress)
    traveler.current?.setAttribute('cx', String(point.x))
    traveler.current?.setAttribute('cy', String(point.y))
    markers.current.forEach((marker, index) => {
      const stop = line.getPointAtLength(length * stops[index])
      marker?.setAttribute('transform', `translate(${stop.x} ${stop.y})`)
    })
  }, [progress, mobile])

  return (
    <svg className={`scroll-route ${mobile ? 'route-mobile' : 'route-desktop'}`} viewBox={mobile ? '0 0 390 620' : '0 0 1280 820'} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs><mask id={maskId}><path d={artwork} pathLength="1" fill="none" stroke="white" strokeWidth="24" strokeDasharray={`${progress} 1`} /></mask></defs>
      <path ref={path} className="route-line route-upcoming" d={artwork} />
      <path className="route-line route-visited" d={artwork} mask={`url(#${maskId})`} />
      {stops.map((stop, index) => <g key={stop} ref={element => { markers.current[index] = element }} className={`route-stop${progress >= stop ? ' is-visited' : ''}`}>
        <g className="route-pin-art" transform={mobile ? 'scale(.58)' : undefined}><path className="route-pin" d="M0 0C-7-9-25-26-24-42C-23-71 23-72 25-42C26-27 9-9 0 0Z" />
        <path className="route-pin-sketch" d="M-16-44C-16-56-5-61 5-59M17-32C13-22 5-14 1-9" />
        <circle className="route-pin-center" cx="0" cy="-43" r="8" /></g>
      </g>)}
      <circle ref={traveler} className="route-traveler" r="7" />
    </svg>
  )
}

export function ScrollRoute({ progress }: { progress: number }) {
  return <><RouteArtwork progress={progress} /><RouteArtwork progress={progress} mobile /></>
}
