import { BETA_SIGNUP_URL } from '../data/links'

export function WaitlistSection() {
  return (
    <section className="waitlist-section" id="waitlist">
      <div className="waitlist-content">
        <div data-reveal>
          <div className="beta-travel-icons" aria-hidden="true">
            <span><svg viewBox="0 0 24 24"><path d="M5 4h14v13H9l-4 4V4Z" /><path d="M9 9h6M9 13h4" /></svg></span>
            <span><svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="3" /><path d="M8 3v4m8-4v4M4 10h16m-12 5 3 3 5-5" /></svg></span>
            <span><svg viewBox="0 0 24 24"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></span>
          </div>
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
