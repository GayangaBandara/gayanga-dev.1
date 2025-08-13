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
                I'm a passionate creative developer and digital artist with over 5 years of experience crafting
                immersive digital experiences. My work spans across web development, 3D animation, and interactive
                design.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I believe in pushing the boundaries of what's possible on the web, combining cutting-edge technology
                with artistic vision to create memorable user experiences.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#b9925a]">Frontend</h3>
                <p className="text-gray-400">React, Next.js, TypeScript</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#b9925a]">Animation</h3>
                <p className="text-gray-400">GSAP, Three.js, Framer Motion</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#b9925a]">Design</h3>
                <p className="text-gray-400">Figma, Adobe Creative Suite</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#b9925a]">3D</h3>
                <p className="text-gray-400">Blender, Cinema 4D</p>
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