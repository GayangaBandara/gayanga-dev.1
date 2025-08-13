"use client"

import { useEffect, useState } from "react"
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

      // Parallax effects
      const heroName = document.querySelector(".hero-name") as HTMLElement
      const heroImage = document.querySelector(".hero-image-container") as HTMLElement
      const bandaraText = document.querySelector(".bandara-text") as HTMLElement

      if (heroName) {
        heroName.style.transform = `translate(-50%, -50%) translateY(${scrollY * 0.3}px)`
      }
      if (heroImage) {
        heroImage.style.transform = `translate(-50%, -50%) translateY(${scrollY * 0.1}px)`
      }
      if (bandaraText) {
        bandaraText.style.transform = `translateY(${scrollY * -0.2}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <section className="hero-section">
      <nav className={`navbar ${isNavbarPinned ? "navbar-pinned" : ""}`}>
        <div className="nav-container">
          <div className="nav-logo" tabIndex={0} role="button" aria-label="Home">
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

      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  )
}
