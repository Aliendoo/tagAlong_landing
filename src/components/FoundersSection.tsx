import { founders } from '../data/founders'
import { SectionHeading } from './SectionHeading'

export function FoundersSection() {
  return (
    <section className="founders-section" id="founders">
      <div className="content-wrap">
        <SectionHeading
          firstLine="MEET THE"
          secondLine="FOUNDERS"
        />
        <div className="founders-stage">
          <img
            className="founders-photo"
            data-reveal
            src="/founders.png"
            width={795}
            height={520}
            alt="Aileen Du, Lilymoon Whalen and Emily Hsu looking up at the camera"
          />
          {founders.map((founder) => (
            <article className={`founder-note founder-${founder.position}`} key={founder.name} data-reveal>
              <h3>{founder.name} <span>— {founder.role}</span></h3>
              <ul>
                {founder.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
