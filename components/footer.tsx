import Link from "next/link"

const socialLinks = [
  { name: "GitHub", href: "https://github.com/GayangaBandara", icon: "fa-brands fa-github" },
  { name: "LinkedIn", href: "https://linkedin.com/in/gayanga-bandara", icon: "fa-brands fa-linkedin-in" },
  { name: "X", href: "https://x.com/Gayanga20", icon: "fa-brands fa-x-twitter" },
  { name: "Reddit", href: "https://www.reddit.com/user/Consistent_City2925/", icon: "fa-brands fa-reddit" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-wrap border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="footer-grid">
          {/* Left */}
          <div className="space-y-3">
            <p className="footer-brand">Gayanga Bandara</p>
            <p className="footer-desc">
              Building clean, scalable products with modern web & mobile technologies.
            </p>
            <p className="footer-copy">© {year} Gayanga Bandara. All rights reserved.</p>
          </div>

          {/* Right */}
          <div className="footer-right">
            <div className="footer-actions">
              <div className="social-media" aria-label="Social links">
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                    aria-label={link.name}
                    title={link.name}
                  >
                    <i className={link.icon} />
                  </Link>
                ))}
              </div>

              <Link href="#home" className="footer-top" aria-label="Back to top" title="Back to top">
                Back to top
                <span aria-hidden="true">↑</span>
              </Link>
            </div>

            <div className="footer-mini">
              <span className="footer-mini-item">Open to internships</span>
              <span className="footer-dot" aria-hidden="true" />
              <span className="footer-mini-item">Full-Stack • Flutter • Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
