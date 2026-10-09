import { BETA_SIGNUP_URL } from '../data/links'
import { TripPhoneMockup } from './TripPhoneMockup'

export function HeroSection() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <h1 className="hero-title">SWIPE, VOTE,<span>GO.</span></h1>
        <p className="hero-description">
          <span className="hero-lead">Your group chat's next big trip starts here.</span>
          Drop in the reels you've all been saving, swipe on the spots you love, and TagAlong turns the group's favorites into a trip that fits everyone's schedule.
        </p>
        <a
          className="button button-orange cta-button"
          href={BETA_SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get on the beta list <span aria-hidden="true">↗</span>
        </a>
      </div>
      <TripPhoneMockup />
    </section>
  )
}