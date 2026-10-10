export function SiteHeader({ howItWorksHref = '#how-it-works' }: { howItWorksHref?: string }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="TagAlong home">
        <img src={`${import.meta.env.BASE_URL}images/tagalong-logo.png`} alt="TagAlong" width="230" height="60" />
      </a>
      <nav className="site-nav" aria-label="Main navigation">
        <a href={howItWorksHref}>How it works</a>
        <a href="#founders">Founders</a>
        <a className="nav-beta" href="#waitlist">Join Beta List</a>
      </nav>
    </header>
  )
}
