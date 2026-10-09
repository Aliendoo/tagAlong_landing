import { howItWorks } from '../data/howItWorks'
import { SectionHeading } from './SectionHeading'

export function HowItWorksSection() {
  return (
    <section className="how-section" id="how-it-works">
      <div className="content-wrap">
        <SectionHeading firstLine="TRIP PLANNING" secondLine="WITHOUT THE SPREADSHEET" />
        <div className="steps-grid">
          {howItWorks.map((step) => (
            <article className={`step step-${step.color}`} key={step.number}>
              <div className="step-topline">
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
              </div>
              <p>{step.description}</p>
              <span className="step-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}