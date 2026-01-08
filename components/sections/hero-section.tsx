"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Set the CSS variable for navbar height so CSS can use it for scroll-margin-top
    const updateNavbarHeightVar = () => {
      const navbar = document.querySelector('.navbar') as HTMLElement
      if (navbar) {
        document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`)
      }
    }

    updateNavbarHeightVar();
    window.addEventListener("resize", updateNavbarHeightVar)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", updateNavbarHeightVar)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      const navbar = document.querySelector('.navbar') as HTMLElement
      const navbarHeight = navbar ? navbar.offsetHeight : 64
      const targetTop = element.getBoundingClientRect().top + window.scrollY - navbarHeight
      window.scrollTo({ top: targetTop, behavior: 'smooth' })
    }
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
      <div className="hero-content">
        <div className="hero-text-content">
          <span className="hero-badge">Available for freelance & collaborations</span>
          <p className="tagline">Full-stack Developer • UI Engineer</p>
          <h2 className="hero-headline">
            Designing fast, elegant web experiences that feel effortless to use.
          </h2>
          <p className="micro-bio">
            I build responsive, high-performing products with Next.js, React, and scalable design systems.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="hero-button primary"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </button>
            <button
              type="button"
              className="hero-button ghost"
              onClick={() => scrollToSection("contact")}
            >
              Let&apos;s Talk
            </button>
          </div>
          <div className="hero-highlights">
            <span>Product Strategy</span>
            <span>Performance-first Builds</span>
            <span>Accessible UI</span>
          </div>
        </div>
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
