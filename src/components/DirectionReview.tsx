import { directions, pageUrl, type Direction } from '../data/directions'
export function DirectionReview({ selected }: { selected: Direction }) {
  return <nav className="direction-review" aria-label="Compare design directions"><a className="back-to-directions" href={pageUrl('?compare')} aria-label="Back to all design directions"><span>Directions</span></a>{directions.map(direction => <a key={direction.id} href={pageUrl(`?direction=${direction.id}`)} aria-current={selected === direction.id ? 'page' : undefined}><span>{direction.number}</span> {direction.name}</a>)}</nav>
}
