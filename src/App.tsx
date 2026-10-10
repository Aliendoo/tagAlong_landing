import { useRef } from 'react'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { HeroSection } from './components/HeroSection'
import { ScrollStory } from './components/ScrollStory'
import { FoundersSection } from './components/FoundersSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { WaitlistSection } from './components/WaitlistSection'
import { DesignGallery } from './components/DesignGallery'
import { DirectionReview } from './components/DirectionReview'
import { directions, type Direction } from './data/directions'
import { useScrollReveal } from './animations'
import './styles/App.css'
import './styles/Daydream.css'

function LandingPage({ direction, review }: { direction: Direction; review: boolean }) {
  const shell = useRef<HTMLDivElement>(null)
  useScrollReveal(shell)
  return (
    <div className={'site-shell direction-' + direction} ref={shell}>
      <SiteHeader howItWorksHref={direction === 'daydream' ? '#in-action' : '#how-it-works'} />
      <main><HeroSection referenceLayout={direction === 'daydream'} /><ScrollStory singlePhone={direction === 'daydream'} />{direction !== 'daydream' && <HowItWorksSection />}<FoundersSection /><WaitlistSection /></main>
      <SiteFooter />
      {review && <DirectionReview selected={direction} />}
    </div>
  )
}
export default function App() {
  const query = new URLSearchParams(window.location.search)
  if (query.has('compare')) return <DesignGallery />
  const direction = directions.find(option => option.id === query.get('direction'))?.id ?? 'daydream'
  return <LandingPage direction={direction} review={direction !== 'daydream' && query.has('direction') && query.get('review') !== '0'} />
}
