"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(true)
  const [isNavbarPinned, setIsNavbarPinned] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsNavbarPinned(scrollY > 100)
    }

    // Set the CSS variable for navbar height so CSS can use it for scroll-margin-top
    const updateNavbarHeightVar = () => {
      const navbar = document.querySelector('.navbar') as HTMLElement
      if (navbar) {
        document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`)
      }
    }

    updateNavbarHeightVar();
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", updateNavbarHeightVar)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateNavbarHeightVar)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setIsMobileMenuOpen(false)
        return
      }
      const navbar = document.querySelector('.navbar') as HTMLElement
      const navbarHeight = navbar ? navbar.offsetHeight : 64
      const targetTop = element.getBoundingClientRect().top + window.scrollY - navbarHeight
      window.scrollTo({ top: targetTop, behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const scrollToBottom = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      const navbar = document.querySelector('.navbar') as HTMLElement
      const navbarHeight = navbar ? navbar.offsetHeight : 64
      const aboutSectionBottom = aboutSection.offsetTop + aboutSection.offsetHeight
      const targetTop = aboutSectionBottom + 100 - navbarHeight
      window.scrollTo({ top: targetTop, behavior: "smooth" })
    }
  }

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <section id="home" className="hero-section">
      <nav className={`navbar ${isNavbarPinned ? "navbar-pinned" : ""}`}>
        <div className="nav-container">
          <div className="nav-logo" tabIndex={0} role="button" aria-label="Home">
            <Image src="/logo.png" alt="Gayanga Bandara Logo" width={48} height={48} />
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}></div>
            <div className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}></div>
            <div className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}></div>
          </button>

          <div className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            <button className="nav-link" onClick={() => scrollToSection("home")} tabIndex={0}>
              Home
            </button>
            <button className="nav-link" onClick={() => scrollToSection("about")} tabIndex={0}>
              About
            </button>
            <button className="nav-link" onClick={() => scrollToSection("service")} tabIndex={0}>
              Service
            </button>
            <button className="nav-link" onClick={() => scrollToSection("projects")} tabIndex={0}>
              Projects
            </button>
            <button className="nav-link" onClick={() => scrollToSection("contact")} tabIndex={0}>
              Contact
            </button>
          </div>
        </div>
      </nav>

      <div className="hero-content">
        <h1 className="hero-name">GAYANGA</h1>

        <div className="hero-image-container">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-photo-wFchO1UbSAqQtGJ0x00EDzQh4jCMek.png"
            alt="Gayanga Bandara Portrait"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </section>
  )
}