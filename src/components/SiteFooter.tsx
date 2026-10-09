import { INSTAGRAM_URL } from '../data/links'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="wordmark footer-wordmark" href="#top">TagAlong<span className="wordmark-dot">.</span></a>
      <a className="footer-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
        Instagram <span aria-hidden="true">↗</span>
      </a>
      <p className="copyright">© 2026 TAGALONG</p>
    </footer>
  )
}
