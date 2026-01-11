"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "SafeSpace Ecosystem",
    category: "AI HealthTech",
    description:
      "Academic Research final year Project, Award-winning platform connecting patients and doctors with real-time AI-driven sentiment analysis.",
    tech: ["Flutter", "React", "TypeScript", "Python", "FastAPI"],
    demo: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/SafeSpace.mp4",
    github: "https://github.com/GayangaBandara/Final_Year_Project.git",
    image: "images/project/safespace.png",
    video: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/SafeSpace.mp4",
  },
  {
    title: "Master Designer v2",
    category: "Interactive 3D Web",
    description:
      "Immersive web platform engineered with WebGL/Three.js for the All-Island Design Competition.",
    tech: ["Three.js", "WebGL", "GSAP", "React"],
    demo: "https://master-designer-v2-0.vercel.app/",
    github: "https://github.com/GayangaBandara/Master-Designer-v2.0.git",
    image: "images/project/master.png",
    video:
      "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/Untitled%20video%20-%20Made%20with%20Clipchamp%20(1).mp4",
  },
  {
    title: "Finance Tracker",
    category: "Finance Management",
    description: "Track expenses, manage budgets, and gain insights with AI-powered comprehensive solution.",
    tech: ["React", "Vite", "Tailwind", "Supabase", "Groq AI"],
    demo: "https://smart-finance-tracker-nu.vercel.app/",
    github: "https://github.com/GayangaBandara/smart-finance-tracker",
    image: "images/project/finance.png",
    video:
      "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/finance%20tracker.mp4",
  },
  {
    title: "Serandib Games Blog",
    category: "Blog Platform",
    description:
      "A cloud-based gaming blog with a user-friendly interface, Firebase authentication, and a real-time trained chatbot for interactive user engagement.",
    tech: ["JavaScript", "HTML5", "CSS", "Firebase", "Chatbot"],
    demo: "https://serendib-games-blog.vercel.app/",
    github: "https://github.com/GayangaBandara/Serendib-Games-Blog.git",
    image: "images/project/serandib.png",
    video:
      "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/Untitled%20video%20-%20Made%20with%20Clipchamp%20(4).mp4",
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  // Mobile/Tablet unchanged
  const cardsRef = useRef<HTMLDivElement[]>([])

  // Desktop refs
  const desktopWrapRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const progressLineRef = useRef<HTMLDivElement | null>(null)
  const lastCardRef = useRef<HTMLElement | null>(null)

  // ✅ Controls hover video without replay
  const [activeId, setActiveId] = useState<string | null>(null)

  // ---------------------------
  // Mobile/Tablet animations (UNCHANGED)
  // ---------------------------
  useEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add("(max-width: 1023px)", () => {
        cardsRef.current.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.1,
            },
          )
        })
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      mm.revert()
    }
  }, [])

  // ---------------------------
  // Desktop Horizontal Slider (ONLY lg+)
  // ✅ End distance based on last card position (fixes early stop)
  // ---------------------------
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      mm.add("(min-width: 1024px)", () => {
        if (
          !sectionRef.current ||
          !desktopWrapRef.current ||
          !trackRef.current ||
          !progressLineRef.current ||
          !lastCardRef.current
        )
          return

        const section = sectionRef.current
        const wrap = desktopWrapRef.current
        const track = trackRef.current
        const progressLine = progressLineRef.current
        const lastCard = lastCardRef.current

        const getPad = () => {
          const s = window.getComputedStyle(wrap)
          return {
            pl: parseFloat(s.paddingLeft || "0") || 0,
            pr: parseFloat(s.paddingRight || "0") || 0,
          }
        }

        const getDistance = () => {
          const { pr } = getPad()
          const lastRight = lastCard.offsetLeft + lastCard.offsetWidth
          const visible = wrap.clientWidth
          const target = lastRight - (visible - pr)
          return Math.max(0, target)
        }

        gsap.set(track, { x: 0 })
        gsap.set(progressLine, { scaleX: 0, transformOrigin: "left center" })

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
        })

        const st = ScrollTrigger.create({
          trigger: section,
          pin: section,
          start: "top top",
          end: () => `+=${getDistance() + 80}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: tween,
          onUpdate: (self) => {
            gsap.to(progressLine, { scaleX: self.progress, duration: 0.05, ease: "none" })
          },
        })

        const refreshAll = () => ScrollTrigger.refresh()
        window.addEventListener("resize", refreshAll)
        window.addEventListener("load", refreshAll)
        requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
          window.removeEventListener("resize", refreshAll)
          window.removeEventListener("load", refreshAll)
          st.kill()
          tween.kill()
        }
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      mm.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-6 bg-card overflow-hidden lg:min-h-screen">
      {/* Title */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-sm mb-4 tracking-wider">SELECTED WORKS</p>
          <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
        </div>
      </div>

      {/* Mobile + Tablet */}
      <div className="max-w-6xl mx-auto lg:hidden">
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              // ✅ Hover anywhere on card plays video (no replay on mouse move)
              onMouseEnter={() => setActiveId(project.title)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(project.title)}
              onBlur={() => setActiveId(null)}
              onTouchStart={() => setActiveId(project.title)}
              onTouchEnd={() => setActiveId(null)}
              className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-muted-foreground/30 transition-all duration-300"
            >
              <ProjectMedia
                title={project.title}
                image={project.image}
                video={project.video}
                active={activeId === project.title}
              />

              <div className="p-6">
                <span className="text-accent text-sm font-mono">{project.category}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-secondary text-xs text-muted-foreground rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link
                    href={project.demo}
                    target="_blank"
                    className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
                  >
                    <ExternalIcon />
                    Live Demo
                  </Link>
                  <Link
                    href={project.github}
                    target="_blank"
                    className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
                  >
                    <GithubIcon />
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop ONLY */}
      <div
        ref={desktopWrapRef}
        className="
          hidden lg:block
          relative left-1/2 -translate-x-1/2 w-screen
          px-[max(24px,calc((100vw-72rem)/2))]
        "
      >
        {/* Progress */}
        <div className="mx-auto mb-10 h-[2px] w-[900px] max-w-full bg-border relative">
          <div ref={progressLineRef} className="absolute left-0 top-0 h-full w-full bg-foreground origin-left scale-x-0" />
        </div>

        {/* Track */}
        <div ref={trackRef} className="flex gap-10 w-max will-change-transform">
          {projects.map((project, i) => {
            const isLast = i === projects.length - 1

            return (
              <article
                key={project.title}
                ref={(el) => {
                  if (isLast && el) lastCardRef.current = el
                }}
                // ✅ Hover anywhere on card plays video (no replay on mouse move)
                onMouseEnter={() => setActiveId(project.title)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(project.title)}
                onBlur={() => setActiveId(null)}
                className="group w-[560px] shrink-0 bg-background border border-border rounded-2xl overflow-hidden hover:border-muted-foreground/30 transition-all duration-300"
                tabIndex={0}
              >
                <ProjectMedia
                  title={project.title}
                  image={project.image}
                  video={project.video}
                  active={activeId === project.title}
                />

                <div className="p-6">
                  <span className="text-accent text-sm font-mono">{project.category}</span>
                  <h3 className="text-xl font-semibold mt-2 mb-3">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-secondary text-xs text-muted-foreground rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Link
                      href={project.demo}
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
                    >
                      <ExternalIcon />
                      Live Demo
                    </Link>
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
                    >
                      <GithubIcon />
                      GitHub
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** ✅ Controlled media: hover anywhere on card triggers active=true.
 *  - If mouse moves inside card: DOES NOT restart
 *  - Leave card: pause + reset
 */
function ProjectMedia({
  image,
  video,
  title,
  active,
}: {
  image: string
  video: string
  title: string
  active: boolean
}) {
  const vidRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const v = vidRef.current
    if (!v) return

    if (active) {
      // ✅ Do NOT set currentTime here (prevents replay)
      // ✅ If already playing, play() won't restart
      v.play().catch(() => {})
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [active])

  return (
    <div className="aspect-video overflow-hidden relative">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
          active ? "opacity-0" : "opacity-100"
        }`}
      />

      <video
        ref={vidRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        src={video}
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  )
}

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}
