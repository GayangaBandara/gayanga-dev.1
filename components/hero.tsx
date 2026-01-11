"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const name = nameRef.current
    if (!name) return

    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 40
      const y = (e.clientY / innerHeight - 0.5) * 40

      name.style.transform = `
        translate3d(${x}px, ${y}px, 0)
        rotateX(${-y * 0.15}deg)
        rotateY(${x * 0.15}deg)
      `
      name.style.textShadow = `${-x * 1.5}px ${-y * 1.5}px 40px rgba(0,255,255,0.15)`
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <section ref={heroRef} id="home" className="h-screen relative overflow-hidden">
      <div className="fixed inset-0 w-full h-screen">
        <motion.div
          className="absolute inset-0 flex items-end justify-center"
          style={{ opacity: heroOpacity }}
        >
          {/* Cinematic background name */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
            <div
              ref={nameRef}
              className="transition-transform duration-300 ease-out will-change-transform"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <span
                className="
                  text-[28vw] md:text-[22vw] lg:text-[18vw]
                  font-black tracking-tighter uppercase whitespace-nowrap
                "
                style={{
                  color: "rgba(255,255,255,0.05)",
                }}
              >
                GAYANGA
              </span>
            </div>
          </div>

          {/* Portrait */}
          <motion.div
            className="relative z-10 flex items-end justify-center"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Glow behind face */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-accent/10 blur-[140px] rounded-full" />

            <Image
              src="/images/gayanga-portrait.png"
              alt="Gayanga Bandara"
              width={600}
              height={720}
              priority
              className="w-[320px] sm:w-[400px] md:w-[480px] lg:w-[550px] object-contain relative z-10"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
