"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: "01",
    title: "Full-Stack Development",
    description:
      "Modern React/Next.js interfaces, backend services, database design, authentication, and performance optimization.",
    tech: ["React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    number: "02",
    title: "AI-Driven Development",
    description:
      "Chatbots, sentiment analysis, automation systems, and intelligent features using Python-based frameworks.",
    tech: ["Python", "NLP", "TensorFlow", "FastAPI"],
  },
  {
    number: "03",
    title: "Mobile Apps Development",
    description: "Cross-platform applications with real-time sync, authentication, and cloud features using Flutter.",
    tech: ["Flutter", "Dart", "Firebase", "Supabase"],
  },
  {
    number: "04",
    title: "Interactive UI/UX",
    description: "Custom animations, motion design, 3D experiences, and immersive effects that captivate users.",
    tech: ["GSAP", "Three.js", "WebGL", "Framer Motion"],
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        gsap.fromTo(
          card,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-accent font-mono text-sm mb-4 tracking-wider">MY SERVICES</p>
          <h2 className="text-3xl md:text-4xl font-bold">What I Can Do For You</h2>
        </div>

        <div className="space-y-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="group p-8 bg-card border border-border rounded-2xl hover:border-muted-foreground/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <span className="text-5xl font-bold text-muted-foreground/20 group-hover:text-accent/30 transition-colors">
                  {service.number}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-secondary text-sm text-muted-foreground rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
