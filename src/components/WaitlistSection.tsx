import { BETA_SIGNUP_URL } from '../data/links'

export function WaitlistSection() {
  return (
    <section className="waitlist-section" id="waitlist">
      <div className="waitlist-content">
        <div data-reveal>
          <p className="beta-invitation">Your next trip starts here.</p>
          <p className="beta-description">Be one of the first to try TagAlong with your friends.</p>
          <a
            className="button button-orange cta-button"
            href={BETA_SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Beta List
          </a>
        </div>
      </div>
    </section>
  )
}
