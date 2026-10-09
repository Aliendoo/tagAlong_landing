import { BETA_SIGNUP_URL } from '../data/links'
import { SectionHeading } from './SectionHeading'

export function WaitlistSection() {
  return (
    <section className="waitlist-section" id="waitlist">
      <div className="waitlist-content">
        <SectionHeading firstLine="GET THE GROUP CHAT" secondLine="PACKING." />
        <div data-reveal>
          <a
            className="button button-orange cta-button"
            href={BETA_SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get on the beta list <span aria-hidden="true">↗</span>
          </a>
          <p className="waitlist-caption">BETA DROPS SOON. BRING YOUR FAVORITE TRAVEL PEOPLE.</p>
        </div>
      </div>
    </section>
  )
}
