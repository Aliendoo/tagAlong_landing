export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="TagAlong home">
        TagAlong<span className="wordmark-dot">.</span>
      </a>
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#how-it-works">How it works</a>
        <a href="#founders">Founders</a>
      </nav>
    </header>
  )
}