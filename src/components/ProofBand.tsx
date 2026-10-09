export function ProofBand() {
  return (
    <section className="proof-band" id="together" aria-labelledby="proof-title">
      <div className="proof-inner">
        <div className="stat-block" data-reveal>
          <p className="eyebrow eyebrow-light">THE INSPIRATION IS ALREADY THERE</p>
          <p className="stat-number">89<span>%</span></p>
          <p className="stat-copy">
            of Gen Z travelers discover trips on social. Only <strong>2.1%</strong> turn that inspiration into a booking.
          </p>
        </div>
        <div className="proof-divider" aria-hidden="true" />
        <div className="proof-message" data-reveal>
          <h2 id="proof-title">More “we found it.<br /><span>We’re going.”</span></h2>
        </div>
        <div className="proof-scribble" aria-hidden="true">↗</div>
      </div>
    </section>
  )
}
