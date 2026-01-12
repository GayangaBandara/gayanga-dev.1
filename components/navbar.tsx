"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Link from "next/link"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Work", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Desktop: show full navbar only in Hero
  const [hideDesktopNavbar, setHideDesktopNavbar] = useState(false)

  // Keep your blur when scrolling (mobile / normal behavior)
  const [scrolled, setScrolled] = useState(false)

  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  // 1) initial navbar entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 },
    )
  }, [])

  // 2) detect scroll and switch navbar mode (DESKTOP ONLY)
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)

      // Desktop only
      if (window.innerWidth >= 1024) {
        const heroEl = document.getElementById("home")
        const aboutEl = document.getElementById("about")

        const heroBottom = heroEl
          ? heroEl.offsetTop + heroEl.offsetHeight
          : window.innerHeight

        // Switch point = when About starts (or when hero ends if about not found)
        const switchPoint = aboutEl ? aboutEl.offsetTop - 10 : heroBottom

        // After About -> hide full navbar, show floating hamburger only
        setHideDesktopNavbar(y >= switchPoint)
      } else {
        setHideDesktopNavbar(false)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  // ✅ If navbar hides on desktop while menu is open, close it (prevents weird states)
  useEffect(() => {
    if (hideDesktopNavbar && isOpen && window.innerWidth < 1024) {
      closeMenu()
    }
  }, [hideDesktopNavbar, isOpen])

  // 3) Escape close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeMenu()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  // 4) Mobile dropdown animation
  useEffect(() => {
    if (!mobileMenuRef.current) return

    if (isOpen) {
      gsap.set(mobileMenuRef.current, { display: "block" })
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" },
      )
      gsap.fromTo(
        menuItemsRef.current.filter(Boolean),
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.15, ease: "power2.out" },
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: "none" })
        },
      })
    }
  }, [isOpen])

  // ✅ Desktop floating hamburger (only after About)
  const showDesktopFloatingHamburger = hideDesktopNavbar

  return (
    <>
      {/* =======================
          TOP NAVBAR (Hero only on Desktop)
         ======================= */}
      <nav
        ref={navRef}
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || isOpen ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent",
          hideDesktopNavbar ? "lg:hidden" : "",
        ].join(" ")}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="#home"
              className="text-xl font-bold tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              <span className="text-foreground">gayanga</span>
              <span className="text-accent">.</span>
            </Link>

            {/* Desktop Navigation (normal navbar) */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm py-1"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                className="px-5 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Hire Me
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <div className="flex flex-col justify-center items-center gap-1.5">
                <span
                  className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-out ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-out ${
                    isOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-out ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="md:hidden overflow-hidden"
            style={{ display: "none", height: 0 }}
            aria-hidden={!isOpen}
          >
            <div className="flex flex-col gap-1 pb-6 pt-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  ref={(el) => {
                    menuItemsRef.current[index] = el
                  }}
                  onClick={closeMenu}
                  className="text-lg font-medium text-foreground hover:text-accent hover:bg-secondary/50 transition-colors duration-200 py-3 px-4 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
                  tabIndex={isOpen ? 0 : -1}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                ref={(el) => {
                  menuItemsRef.current[navLinks.length] = el
                }}
                onClick={closeMenu}
                className="mt-3 mx-4 px-6 py-3 bg-primary text-primary-foreground text-center font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                tabIndex={isOpen ? 0 : -1}
              >
                Hire Me
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* =======================
          DESKTOP FLOATING HAMBURGER (About -> Contact only)
         ======================= */}
      <button
        onClick={toggleMenu}
        className={[
          "hidden lg:flex",
          "fixed top-4 right-6 z-[60]",
          "w-12 h-12 rounded-full",
          "items-center justify-center",
          "bg-background/60 backdrop-blur-md border border-border",
          "shadow-lg",
          "transition-all duration-300",
          showDesktopFloatingHamburger ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        <div className="flex flex-col items-center justify-center gap-1">
          <span className={`block w-5 h-[2px] bg-foreground transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-[2px] bg-foreground transition-all ${isOpen ? "opacity-0" : "opacity-100"}`} />
          <span
            className={`block w-5 h-[2px] bg-foreground transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </div>
      </button>

      {/* =======================
          DESKTOP OVERLAY MENU (only desktop)
          ✅ Removed the panel close (X) button
         ======================= */}
      <div
        className={[
          "hidden lg:block",
          "fixed inset-0 z-[55]",
          "transition-all duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {/* Backdrop */}
        <div onClick={closeMenu} className="absolute inset-0 bg-black/60" />

        {/* Panel */}
        <div className="absolute right-0 top-0 h-full w-[520px] max-w-[90vw] bg-background/90 backdrop-blur-xl border-l border-border">
          <div className="p-10 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-xs tracking-[0.2em] text-muted-foreground">NAVIGATION</p>
              {/* ✅ Removed duplicate close button here */}
            </div>

            <div className="mt-6 h-px bg-border" />

            <div className="mt-10 flex flex-col gap-8">
              {navLinks.map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  onClick={closeMenu}
                  className="text-5xl font-light tracking-tight hover:text-accent transition-colors"
                >
                  {l.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-10 flex gap-10 text-sm text-muted-foreground">
              <Link href="https://linkedin.com/in/gayanga-bandara" target="_blank" className="hover:text-foreground">
                Linkedin
              </Link>
              <Link href="https://github.com/GayangaBandara" target="_blank" className="hover:text-foreground">
                Github
              </Link>
              <Link href="https://x.com/Gayanga20" target="_blank" className="hover:text-foreground">
                X-twitter
              </Link>
              <Link href="https://www.reddit.com/user/Consistent_City2925/" target="_blank" className="hover:text-foreground">
                Reddit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
