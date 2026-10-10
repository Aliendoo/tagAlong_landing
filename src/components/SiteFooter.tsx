import { INSTAGRAM_URL } from '../data/links'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="wordmark footer-wordmark" href="#top" aria-label="TagAlong home"><img src={`${import.meta.env.BASE_URL}images/tagalong-logo.png`} alt="TagAlong" width="230" height="60" /></a>
      <a className="footer-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
      <p className="copyright">© 2026 TAGALONG · <a href={`${import.meta.env.BASE_URL}photo-credits.html`}>Photo credits</a></p>
    </footer>
  )
}
