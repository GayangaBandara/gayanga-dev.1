"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".contact-anim") || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section bg-card overflow-hidden lg:min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT SIDE */}
          <div className="contact-anim">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              <span className="contact-highlight">Contact</span> me
            </h2>

            <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
              Have an idea, project, or internship opportunity? Send a message and
              I’ll get back to you as soon as possible.
            </p>

            {/* Contact Card */}
            <div className="mt-10 contact-infoCard">
              <div className="flex items-center gap-4">
                <span className="contact-iconBox" aria-hidden="true">
                  {/* Mail icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>

                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <Link
                    href="mailto:gayangabandara@gmail.com"
                    className="font-medium text-foreground hover:text-accent transition-colors break-all"
                  >
                    gayangabandara@gmail.com
                  </Link>
                </div>
              </div>

              <div className="h-px bg-border my-6 opacity-80" />

              <div className="flex items-center gap-4">
                <span className="contact-iconBox" aria-hidden="true">
                  {/* Phone icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.11a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92Z" />
                  </svg>
                </span>

                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">+94 75 257 8200</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (FORM) */}
          <div className="contact-anim">
            {submitted ? (
              <div className="contact-formShell p-10 flex items-center justify-center">
                <div className="text-center max-w-sm">
                  <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold">Message Sent!</h3>
                  <p className="mt-2 text-muted-foreground">
                    Thanks for reaching out — I’ll reply soon.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 contact-btn"
                    type="button"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-formShell p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="contact-label" htmlFor="name">
                      Name
                    </label>
                    <div className="contact-inputWrap">
                      <span className="contact-inputIcon" aria-hidden="true">
                        {/* user icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21a7 7 0 0 0-14 0" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input
                        id="name"
                        name="name"
                        required
                        className="contact-input"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="contact-label" htmlFor="email">
                      Email
                    </label>
                    <div className="contact-inputWrap">
                      <span className="contact-inputIcon" aria-hidden="true">
                        {/* mail icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 4h16v16H4z" opacity="0" />
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="contact-input"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="contact-label" htmlFor="phone">
                      Phone
                    </label>
                    <div className="contact-inputWrap">
                      <span className="contact-inputIcon" aria-hidden="true">
                        {/* phone icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.11a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92Z" />
                        </svg>
                      </span>
                      <input
                        id="phone"
                        name="phone"
                        className="contact-input"
                        placeholder="+94 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="contact-label" htmlFor="subject">
                      Subject
                    </label>
                    <div className="contact-inputWrap">
                      <span className="contact-inputIcon" aria-hidden="true">
                        {/* tag icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3H4a1 1 0 0 0-1 1v5.59A2 2 0 0 0 3.83 11l9.58 9.59a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.83Z" />
                          <circle cx="7.5" cy="7.5" r="1.5" />
                        </svg>
                      </span>

                      <select id="subject" name="subject" required className="contact-input">
                        <option value="">Select</option>
                        <option value="internship">Internship / Opportunity</option>
                        <option value="freelance">Freelance / Contract</option>
                        <option value="project">Project Collaboration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="contact-label" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="contact-textarea"
                    placeholder="Please write your message..."
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="mt-7 contact-btn w-full">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
