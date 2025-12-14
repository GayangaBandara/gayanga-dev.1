"use client"

import React, { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import {
  Terminal,
  Cpu,
  Layout,
  Smartphone,
  GitBranch,
  Container,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// --- Helper: Spotlight Card Effect ---
function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(120, 119, 198, 0.3)"
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string
}) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 text-zinc-200 shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-purple-500/10",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

// --- Helper: Infinite Marquee ---
function Marquee({ items, speed = 20 }: { items: string[], speed?: number }) {
  return (
    <div className="relative flex overflow-hidden w-full bg-zinc-950/50 border-y border-white/5 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-lg font-medium text-zinc-500 flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-900/50" fill="currentColor" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// --- Main Component ---
export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const frontendSkills = ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js"]
  const backendSkills = ["Node.js", "FastAPI", "PostgreSQL", "Supabase", "GraphQL", "Redis"]
  const aiSkills = ["TensorFlow", "PyTorch", "LangChain", "OpenAI API", "RAG Pipelines", "Hugging Face"]
  const mobileSkills = ["Flutter", "Dart", "React Native", "Firebase", "iOS/Android"]

  return (
    <section id="skills" className="skills-section section text-gray-300 relative overflow-hidden py-24">
      {/* Background Blurs and Gradients (matching About section) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl -z-10"></div>
      {/* Optional: subtle grid overlay for extra style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-400">
            Technical Arsenal
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Performance</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            A comprehensive suite of tools and technologies I use to build scalable, high-impact digital solutions.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">

          {/* 1. Frontend Dominance (Large Card) */}
          <SpotlightCard className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-zinc-900/80 to-zinc-900/30">
            <div className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                  <Layout className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Frontend Architecture</h3>
                <p className="text-zinc-400 mb-6">
                  Building pixel-perfect, responsive interfaces with modern React ecosystems. Focused on performance, accessibility, and smooth animations.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {frontendSkills.map(skill => (
                  <Badge key={skill} variant="secondary" className="bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20">
                    {skill}
                  </Badge>
                ))}
              </div>
              {/* Decorative Visual */}
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
            </div>
          </SpotlightCard>

          {/* 2. Backend (Tall Card) */}
          <SpotlightCard className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2">
             <div className="p-6 h-full flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 border border-green-500/20">
                  <Terminal className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Backend & API</h3>
                <p className="text-zinc-400 text-sm mb-auto">
                  Robust server-side logic and scalable database architectures.
                </p>
                <ul className="space-y-3 mt-6">
                  {backendSkills.slice(0, 5).map(skill => (
                    <li key={skill} className="flex items-center gap-2 text-sm text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
             </div>
          </SpotlightCard>

          {/* 3. AI & Data (Standard Card) */}
          <SpotlightCard className="col-span-1 md:col-span-3 lg:col-span-1 row-span-1 bg-zinc-900/80">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                 <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <Cpu className="w-5 h-5 text-purple-400" />
                 </div>
                 <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-400">AI Powered</Badge>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">AI Engineering</h3>
              <p className="text-zinc-500 text-xs mb-4">LLM Integration & Data Pipelines</p>
              <div className="flex flex-wrap gap-1.5">
                 {aiSkills.slice(0,4).map(s => <span key={s} className="text-[10px] px-2 py-1 rounded bg-white/5 text-zinc-300">{s}</span>)}
              </div>
            </div>
          </SpotlightCard>

          {/* 4. Mobile (Standard Card) */}
          <SpotlightCard className="col-span-1 lg:col-span-1 row-span-1">
             <div className="p-6">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 border border-orange-500/20">
                  <Smartphone className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Mobile Apps</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                   {mobileSkills.map(s => (
                     <Badge key={s} variant="outline" className="border-white/10 text-zinc-400 hover:text-orange-400 transition-colors">{s}</Badge>
                   ))}
                </div>
             </div>
          </SpotlightCard>

           {/* 5. DevOps (Wide Card) */}
           <SpotlightCard className="col-span-1 md:col-span-3 lg:col-span-4 row-span-1">
              <div className="p-6 flex flex-col md:flex-row items-center gap-6">
                 <div className="shrink-0 w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Container className="w-6 h-6 text-red-400" />
                 </div>
                 <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-white">DevOps & Deployment</h3>
                    <p className="text-zinc-400 text-sm">Streamlined CI/CD pipelines, containerization, and cloud infrastructure management.</p>
                 </div>
                 <div className="flex gap-4">
                    {["Docker", "AWS", "GitHub Actions", "Vercel", "Linux"].map((tool) => (
                       <div key={tool} className="flex flex-col items-center gap-1 group">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                            <GitBranch className="w-4 h-4 text-zinc-400 group-hover:text-red-400" />
                          </div>
                          <span className="text-[10px] text-zinc-500">{tool}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </SpotlightCard>

        </div>

        {/* Infinite Marquee for "Other Tools" */}
        <div className="mt-24">
          <p className="text-center text-sm text-zinc-500 mb-6 uppercase tracking-widest">Other Tools & Libraries</p>
          <Marquee items={["VS Code", "Figma", "Postman", "Jest", "Cypress", "Webpack", "Vite", "Prisma", "Storybook", "Sanity", "Stripe", "Auth.js", "Clerk"]} />
        </div>

      </div>
    </section>
  )
}