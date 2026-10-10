import { useEffect, useRef } from 'react'
import { frameAtProgress, sourceFrame, type PhoneSequence } from '../data/phoneSequences'
type FrameEngine = { seek: (index: number) => void }

export function ScrollPhone({ sequence, progress }: { sequence: PhoneSequence; progress: number }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const figure = useRef<HTMLElement>(null)
  const engine = useRef<FrameEngine | null>(null)
  const target = useRef(0)
  const frame = frameAtProgress(sequence, progress)
  const base = `${import.meta.env.BASE_URL}media/phones/`
  const poster = sourceFrame(sequence, 0)
  const still = sourceFrame(sequence, sequence.stillFrame)
  const imageUrl = ({ source, index }: ReturnType<typeof sourceFrame>) => `${base}${source}/${String(index).padStart(3, '0')}.webp`

  useEffect(() => {
    const surface = canvas.current
    const container = figure.current
    const context = surface?.getContext('2d', { alpha: true })
    if (!surface || !context || !container) return
    let disposed = false
    let visible = false
    let desired = target.current
    let drawn = -1
    const cache = new Map<number, HTMLImageElement>()
    const pending = new Map<number, HTMLImageElement>()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const neighbors = [0, 1, -1, 2, -2, 4, -4]
    const draw = (index: number) => {
      const image = cache.get(index)
      if (!image || disposed || index === drawn) return
      context.clearRect(0, 0, surface.width, surface.height)
      context.drawImage(image, 0, 0, surface.width, surface.height)
      drawn = index
      surface.dataset.frame = String(index)
      const asset = sourceFrame(sequence, index)
      surface.dataset.source = asset.source
      surface.dataset.sourceFrame = String(asset.index)
      container.dataset.ready = 'true'
    }
    const load = (index: number) => {
      if (index < 0 || index >= sequence.count || cache.has(index) || pending.has(index)) return
      const image = new Image()
      image.decoding = 'async'
      pending.set(index, image)
      image.onload = () => {
        if (disposed) return
        pending.delete(index)
        cache.set(index, image)
        if (index === desired) draw(index)
        // Bound decoded memory; compressed WebP files stay in the browser cache.
        if (cache.size > 28) {
          const distant = [...cache.keys()].sort((a, b) => Math.abs(b - desired) - Math.abs(a - desired))
          distant.slice(0, cache.size - 28).forEach(key => cache.delete(key))
        }
      }
      image.onerror = () => pending.delete(index)
      const asset = sourceFrame(sequence, index)
      image.src = `${base}${asset.source}/${String(asset.index).padStart(3, '0')}.webp`
    }
    const seek = (index: number) => {
      desired = reduced.matches && index === 0 ? sequence.stillFrame : index
      surface.dataset.targetFrame = String(desired)
      if (!visible) return
      draw(desired)
      neighbors.forEach(offset => load(desired + offset))
    }
    engine.current = { seek }
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting
      if (visible) seek(target.current)
    }, { rootMargin: '320px' })
    observer.observe(container)
    const preferenceChanged = () => seek(target.current)
    reduced.addEventListener('change', preferenceChanged)
    return () => {
      disposed = true
      observer.disconnect()
      reduced.removeEventListener('change', preferenceChanged)
      pending.forEach(image => { image.onload = null; image.onerror = null; image.src = '' })
      pending.clear()
      cache.clear()
      engine.current = null
    }
  }, [base, sequence])
  useEffect(() => { target.current = frame; engine.current?.seek(frame) }, [frame])

  return (
    <figure className={`scroll-phone phone-${sequence.id}`} ref={figure}>
      <div className="phone-media" role="img" aria-label={sequence.label}>
        <picture className="sequence-poster">
          <source media="(prefers-reduced-motion: reduce)" srcSet={imageUrl(still)} />
          <img src={imageUrl(poster)} alt="" width="420" height="840" fetchPriority="high" />
        </picture>
        <canvas ref={canvas} width="420" height="840" aria-hidden="true" />
      </div>
      {sequence.id !== 'journey' && <figcaption><span>{sequence.id === 'calendar' ? '01' : '02'}</span>{sequence.id === 'calendar' ? 'Find your dates' : 'Vote on the spots'}</figcaption>}
    </figure>
  )
}
