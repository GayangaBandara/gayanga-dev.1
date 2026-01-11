import Link from "next/link"

const socialLinks = [
  { name: "GitHub", href: "https://github.com/GayangaBandara" },
  { name: "LinkedIn", href: "https://linkedin.com/in/gayanga-bandara" },
  { name: "Twitter", href: "https://twitter.com/gayangabandara" },
]

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Gayanga Bandara. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
