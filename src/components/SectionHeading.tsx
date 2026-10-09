type SectionHeadingProps = {
  eyebrow?: string
  firstLine: string
  secondLine: string
  description?: string
}

export function SectionHeading({ eyebrow, firstLine, secondLine, description }: SectionHeadingProps) {
  return (
    <div className="section-heading" data-reveal>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="outline-heading">
        <span className="outline-orange">{firstLine}</span>
        <span className="outline-pink">{secondLine}</span>
      </h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}