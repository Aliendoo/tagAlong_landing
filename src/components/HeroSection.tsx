import { BETA_SIGNUP_URL } from '../data/links'
import { TravelCards } from './TravelCards'
export function HeroSection({ referenceLayout = false }: { referenceLayout?: boolean }) {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        {!referenceLayout && <p className="hero-kicker"><span />Your people. Your places. Your next trip.</p>}
        <h1 className="hero-title"><span>SWIPE,</span><span>{referenceLayout ? 'VOTE, GO.' : 'VOTE. GO.'}</span></h1>
        <p className="hero-description">{referenceLayout ? 'Drop in the reels you’ve all been saving, swipe on the spots you love, and TagAlong turns the group’s favorites into a trip that fits everyone’s schedule.' : 'Turn saved reels into a trip your whole group can agree on.'}</p>
        <a className="hero-cta" href={BETA_SIGNUP_URL} target="_blank" rel="noopener noreferrer">Join Beta List</a>
      </div>
      <TravelCards museum={referenceLayout} />
    </section>
  )
}
