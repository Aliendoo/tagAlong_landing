import { TravelCards } from './TravelCards'
export function HeroSection({ referenceLayout = false }: { referenceLayout?: boolean }) {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        {!referenceLayout && <p className="hero-kicker"><span />Your people. Your places. Your next trip.</p>}
        <h1 className="hero-title"><span>SWIPE,</span><span>{referenceLayout ? 'VOTE, GO.' : 'VOTE. GO.'}</span></h1>
        <p className="hero-description">{referenceLayout ? 'Try this thing I found' : 'Turn saved reels into a trip your whole group can agree on.'}</p>
        <a className="hero-cta" href="#waitlist">Join Beta List</a>
      </div>
      <TravelCards museum={referenceLayout} />
    </section>
  )
}
