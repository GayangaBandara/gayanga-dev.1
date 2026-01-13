"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

// ✅ Cal.com
import Cal, { getCalApi } from "@calcom/embed-react"

gsap.registerPlugin(ScrollTrigger)

function CalScheduler() {
  useEffect(() => {
    ;(async function () {
      // namespace is optional, but good when you have multiple embeds
      const cal = await getCalApi({ namespace: "15min" })

      cal("ui", {
        theme: "dark",
        styles: {
          branding: { brandColor: "#22d3ee" }, // match your accent vibe
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      })
    })()
  }, [])

  return (
    <div className="cal-embed">
      <Cal
        namespace="15min"
        calLink="gayanga-bandara-qh7zcj/15min"
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
        config={{
          layout: "month_view",
          theme: "dark",
        }}
      />
    </div>
  )
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

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
              Have an idea, project, or internship opportunity? Book a quick call
              or reach me directly via email/phone.
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
                    gr.gayangabandara@gmail.com
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

          {/* RIGHT SIDE (CAL.COM) */}
          <div className="contact-anim">
            <div className="contact-formShell p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Scheduling</p>
                  <h3 className="text-2xl font-semibold leading-tight">
                    Book a 15-minute call
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Pick a time that works for you — it takes less than a minute.
                  </p>
                </div>

                <span className="contact-pill">
                  Fast • Free
                </span>
              </div>

              {/* Embed */}
              <div className="mt-6 cal-shell">
                <CalScheduler />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
