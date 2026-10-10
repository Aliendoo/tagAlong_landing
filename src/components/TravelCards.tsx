import { useRef, type PointerEvent } from 'react'

const places = [
  { name: 'Trevi Fountain', detail: 'Art & culture · Rome', photo: 'rome', saved: false },
  { name: 'Daikanyama', detail: 'Quiet streets · Tokyo', photo: 'daikanyama', saved: false },
  { name: 'An evening on the Danube', detail: 'City lights · Budapest', photo: 'budapest', saved: true },
]
const destinations = [
  { name: 'Osaka, Japan', detail: 'City walks', photo: 'daikanyama' },
  { name: 'Seoul, South Korea', detail: 'Palaces & gardens', photo: 'seoul' },
  { name: 'Rome, Italy', detail: 'Trevi Fountain', photo: 'rome' },
]
function DestinationCard({ place, index }: { place: typeof destinations[number]; index: number }) {
  const gesture = useRef<{ id: number; x: number } | null>(null)
  const release = (event: PointerEvent<HTMLElement>) => {
    if (gesture.current?.id !== event.pointerId) return
    gesture.current = null
    event.currentTarget.removeAttribute('data-dragging')
    event.currentTarget.style.removeProperty('--swipe-x')
    event.currentTarget.style.removeProperty('--swipe-tilt')
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  return (
    <div className={`museum-card museum-card-${index + 1}`}>
      <article className="destination-card" aria-label={`${place.name}, draggable travel card`}
        onPointerDown={event => {
          if (!event.isPrimary || event.button !== 0) return
          gesture.current = { id: event.pointerId, x: event.clientX }
          event.currentTarget.setPointerCapture(event.pointerId)
          event.currentTarget.dataset.dragging = 'true'
        }}
        onPointerMove={event => {
          if (gesture.current?.id !== event.pointerId) return
          const distance = event.clientX - gesture.current.x
          const offset = 145 * Math.tanh(distance / 145)
          event.currentTarget.style.setProperty('--swipe-x', `${offset}px`)
          event.currentTarget.style.setProperty('--swipe-tilt', `${offset / 15}deg`)
        }}
        onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release}>
        <img src={`${import.meta.env.BASE_URL}images/${place.photo}.webp`} alt="" width="400" height="240" draggable={false} />
        <div className="destination-card-copy"><h3>{place.name}</h3><p>{place.detail}</p></div>
      </article>
    </div>
  )
}
export function TravelCards({ museum = false }: { museum?: boolean }) {
  if (museum) return (
    <div className="museum-card-stack">
      {destinations.map((place, index) => <DestinationCard key={place.photo} place={place} index={index} />)}
    </div>
  )
  return (
    <div className="travel-card-stack" aria-hidden="true">
      {places.map((place, index) => (
        <article className={`travel-card travel-card-${index + 1}`} key={place.photo}>
          <div className="travel-card-photo"><img src={`${import.meta.env.BASE_URL}images/${place.photo}.webp`} alt="" width="400" height="240" />{place.saved && <span className="saved-badge"><span>✓</span> Saved to your ideas</span>}</div>
          <div className="travel-card-copy"><h3>{place.name}</h3><p>{place.detail}</p></div>
        </article>
      ))}
    </div>
  )
}
