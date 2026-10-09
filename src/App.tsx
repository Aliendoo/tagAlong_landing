import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { HeroSection } from './components/HeroSection'
import { FoundersSection } from './components/FoundersSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { ProofBand } from './components/ProofBand'
import { WaitlistSection } from './components/WaitlistSection'
import { useRef } from 'react'
import { useScrollReveal } from './animations'
import './styles/App.css'

function App() {
  const shell = useRef<HTMLDivElement>(null)
  useScrollReveal(shell)

  return (
    <div className="site-shell" ref={shell}>
      <div className="page-glows" aria-hidden="true">
        <span className="glow-pink" style={{ top: '-4%', left: '-14%', width: '62vw', height: '900px' }} />
        <span className="glow-peach" style={{ top: '9%', right: '-12%', width: '50vw', height: '760px' }} />
        <span className="glow-peach" style={{ top: '19%', left: '18%', width: '64vw', height: '620px' }} />
        <span className="glow-pink" style={{ top: '30%', left: '-16%', width: '52vw', height: '820px' }} />
        <span className="glow-peach" style={{ top: '45%', right: '-14%', width: '48vw', height: '760px' }} />
        <span className="glow-pink" style={{ top: '58%', left: '30%', width: '46vw', height: '700px' }} />
        <span className="glow-pink" style={{ top: '74%', left: '-12%', width: '52vw', height: '800px' }} />
        <span className="glow-peach" style={{ top: '84%', right: '-12%', width: '54vw', height: '760px' }} />
      </div>
      <SiteHeader />
      <main>
        <HeroSection />
        <ProofBand />
        <HowItWorksSection />
        <FoundersSection />
        <WaitlistSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App