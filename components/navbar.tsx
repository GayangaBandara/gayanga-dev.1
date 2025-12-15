"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarPinned, setIsNavbarPinned] = useState(false);

  // Keep the CSS variable for navbar height up to date and
  // pin the navbar (desktop only) when scrolling past the hero.
  React.useEffect(() => {
    const updateNavbarHeightVar = () => {
      const navbar = document.querySelector('.navbar') as HTMLElement
      if (navbar) {
        document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`)
      }
    }

    const handleScroll = () => {
      // Apply pinned behavior only for desktop / web (>= 1024px)
      if (window.innerWidth < 1024) {
        setIsNavbarPinned(false)
        return
      }
      const scrollY = window.scrollY
      setIsNavbarPinned(scrollY > 0)
    }

    updateNavbarHeightVar()
    window.addEventListener('resize', updateNavbarHeightVar)
    window.addEventListener('scroll', handleScroll)

    // Run once to set initial state
    handleScroll()

    return () => {
      window.removeEventListener('resize', updateNavbarHeightVar)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsMobileMenuOpen(false);
        return;
      }
      const navbar = document.querySelector(".navbar") as HTMLElement;
      const navbarHeight = navbar ? navbar.offsetHeight : 64;
      const targetTop = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      // Clamp the scroll target so we don't try to scroll past the document end
      const maxTop = document.documentElement.scrollHeight - window.innerHeight;
      const finalTop = Math.max(0, Math.min(targetTop, maxTop));
      window.scrollTo({ top: finalTop, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isNavbarPinned ? 'navbar-pinned' : ''}`} role="navigation" aria-label="Main navigation">
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
          <button className="nav-link" onClick={() => scrollToSection("projects")} tabIndex={0}>
            Projects
          </button>
          <button className="nav-link" onClick={() => scrollToSection("services")} tabIndex={0}>
            Service
          </button>
          <button className="nav-link" onClick={() => scrollToSection("contact")} tabIndex={0}>
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
