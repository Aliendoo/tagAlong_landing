import { directions, pageUrl } from '../data/directions'
export function DesignGallery() {
  return (
    <main className="design-gallery">
      <header className="gallery-header"><a className="wordmark" href={pageUrl('')} aria-label="TagAlong home"><img src={`${import.meta.env.BASE_URL}images/tagalong-logo.png`} alt="TagAlong" width="230" height="60" /></a><span>THREE DIRECTIONS. ONE NEXT ADVENTURE.</span></header>
      <div className="gallery-intro"><p className="eyebrow">Three directions</p><h1>Daydream it is.</h1><p>The selected design and two earlier explorations.</p><div className="brand-specs"><span><i style={{ background: '#F26748' }} />#F26748</span><span><i style={{ background: '#FF4D8D' }} />#FF4D8D</span><span>Manrope + Figtree</span></div></div>
      <div className="direction-grid">{directions.map(direction => (
        <article className="direction-card" key={direction.id}>
          <a className="direction-preview" href={pageUrl(`?direction=${direction.id}`)} aria-label={`Explore ${direction.name}`}><img src={`${import.meta.env.BASE_URL}directions/${direction.id}.webp`} width="1200" height="1650" alt={`${direction.name} landing page preview`} /></a>
          <div className="direction-card-copy"><div className="direction-card-title"><span>{direction.number}</span><h2>{direction.name}</h2>{direction.id === 'daydream' && <b>Selected</b>}</div><p>{direction.description}</p><small>{direction.detail}</small><a className="hero-cta" href={pageUrl(`?direction=${direction.id}`)}>Explore this direction</a></div>
        </article>
      ))}</div>
      <details className="design-references"><summary>Patterns explored on Mobbin</summary><p>Paired product previews from <a href="https://mobbin.com/sites/sections/601ce269-1efe-407c-9fb5-7272f7504f43" target="_blank" rel="noopener noreferrer">Riverside</a>, the gradient atmosphere of <a href="https://mobbin.com/sites/sections/8c9bd91c-6ec1-48cd-aeaa-d6a482c41e28" target="_blank" rel="noopener noreferrer">Craft</a>, spacious travel cards from <a href="https://mobbin.com/sites/sections/019d6f74-42f5-492b-9cca-31fecb99dac2" target="_blank" rel="noopener noreferrer">Lightship</a>, and the warm product stage at <a href="https://mobbin.com/sites/sections/3ffb34f4-4713-4a4d-a05e-d18961771f0b" target="_blank" rel="noopener noreferrer">Daylight</a>.</p></details>
    </main>
  )
}
