"use client"

import { useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  useEffect(() => {
    // GSAP 3D scroll animation for the creative image and stats
    const creativeImage = document.querySelector(".creative-image-container")
    const statsItems = gsap.utils.toArray(".stats-item") as HTMLElement[]

    if (creativeImage) {
      gsap.to(creativeImage, {
        scrollTrigger: {
          trigger: creativeImage,
          start: "top center",
          scrub: 1,
        },
        rotationX: 10,
        rotationY: -10,
        y: 50,
        scale: 0.95,
        ease: "power1.inOut",
      })
    }

    if (statsItems.length > 0) {
      gsap.from(statsItems, {
        scrollTrigger: {
          trigger: statsItems,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
      })
    }
  }, [])

  return (
    <section id="about" className="about-section py-20">
      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>
      <div className="floating-element floating-element-3"></div>

      <div className="container mx-auto px-6 max-w-7xl leading-[2.85rem]">
        <div className="grid lg:grid-cols-2 gap-16 items-center leading-[4.6rem] my-[45px]">
          <div className="space-y-8 my-[26px]">
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold text-[#b9925a] mb-6">About Me</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I am a final-year B.Sc. Software Engineering undergraduate driven by a single goal: bridging the gap between complex data and intuitive user experiences.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                My journey has taken me from mastering the fundamentals of Full-Stack Development to exploring the bleeding edge of Artificial Intelligence. Unlike traditional developers, I don't just build apps; I engineer intelligent ecosystems. Whether it's integrating Groq LLM for real-time sentiment analysis or using WebGL for immersive 3D web experiences, I focus on writing clean, scalable code that adapts to emerging industry standards.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Currently, I am leveraging technologies like Next.js, Flutter, and FastAPI to build solutions that are not just functional, but future-proof.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#b9925a]">Frontend</h3>
                <p className="text-gray-400">React, Next.js, TypeScript, Tailwind, Bootstrap, Flutter</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#b9925a]">Backend</h3>
                <p className="text-gray-400">Node.js, Express.js, Python (FastAPI, Flask), SpringBoot</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#b9925a]">AI & Data</h3>
                <p className="text-gray-400">TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy, LLMs (Groq)</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#b9925a]">Database</h3>
                <p className="text-gray-400">PostgreSQL, MongoDB, Supabase, Firebase, MySQL</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="creative-image-container relative">
              <div className="decorative-border"></div>
              <Image
                src="/modern-developer-workspace.png"
                alt="Modern Developer Workspace"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="stats-item">
                <div className="text-3xl font-bold text-[#b9925a]">50+</div>
                <div className="text-gray-400">Projects</div>
              </div>
              <div className="stats-item">
                <div className="text-3xl font-bold text-[#b9925a]">5+</div>
                <div className="text-gray-400">Years</div>
              </div>
              <div className="stats-item">
                <div className="text-3xl font-bold text-[#b9925a]">100%</div>
                <div className="text-gray-400">Passion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}