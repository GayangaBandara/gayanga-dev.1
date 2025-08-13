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
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      setIsNavbarPinned(scrollY > 100)

      const heroName = document.querySelector(".hero-name") as HTMLElement
      const heroImage = document.querySelector(".hero-image-container") as HTMLElement
      const bandaraText = document.querySelector(".bandara-text") as HTMLElement
      const aboutSection = document.getElementById("about")

      // Calculate scroll progress and about section position
      const aboutSectionTop = aboutSection ? aboutSection.offsetTop : windowHeight
      const scrollProgress = scrollY / aboutSectionTop

      if (heroName) {
        heroName.style.transform = `translate(-50%, -50%) translateY(${scrollY * 0.4}px)`

        // Smoother fade out starting earlier
        const fadeStart = aboutSectionTop * 0.6
        if (scrollY > fadeStart) {
          const fadeProgress = Math.min((scrollY - fadeStart) / (aboutSectionTop * 0.4), 1)
          heroName.style.opacity = `${1 - fadeProgress}`
        } else {
          heroName.style.opacity = "1"
        }
      }

      if (heroImage) {
        const imageOffset = scrollY * 0.1 // Even slower movement
        const scale = Math.max(0.8, 1 - scrollProgress * 0.3) // More dramatic scaling

        heroImage.style.transform = `translate(-50%, -50%) translateY(${imageOffset}px) scale(${scale})`

        if (scrollY > aboutSectionTop * 0.4) {
          const fadeStart = aboutSectionTop * 0.4
          const fadeEnd = aboutSectionTop * 1.1
          const fadeProgress = Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1)
          heroImage.style.opacity = `${Math.max(0.1, 1 - fadeProgress)}`
        } else {
          heroImage.style.opacity = "1"
        }
      }

      if (bandaraText) {
        bandaraText.style.transform = `translateY(${scrollY * -0.25}px)`

        const fadeStart = aboutSectionTop * 0.65
        if (scrollY > fadeStart) {
          const fadeProgress = Math.min((scrollY - fadeStart) / (aboutSectionTop * 0.35), 1)
          bandaraText.style.opacity = `${1 - fadeProgress}`
        } else {
          bandaraText.style.opacity = "1"
        }
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

  const scrollToBottom = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      const aboutSectionBottom = aboutSection.offsetTop + aboutSection.offsetHeight
      window.scrollTo({
        top: aboutSectionBottom + 100, // 100px beyond the about section
        behavior: "smooth",
      })
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
    <section className="hero-section">
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
