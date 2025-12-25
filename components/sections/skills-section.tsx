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

// --- Spotlight Card Component ---
function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(120, 119, 198, 0.3)"
}: {
  children: React.ReactNode
  className?: string
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
        "relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 text-zinc-200 shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-purple-500/10 transform hover:-translate-y-1",
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

// --- Infinite Marquee Component ---
function Marquee({ items, speed = 20, withLogos = false }: { items: (string | { name: string; logo: string })[], speed?: number, withLogos?: boolean }) {
  return (
    <div className="relative flex overflow-hidden w-full bg-zinc-950/50 border-y border-white/5 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        {[...items, ...items, ...items].map((item, i) => {
          const isObject = typeof item === 'object';
          const displayText = isObject ? item.name : item;
          return (
            <div key={i} className="flex items-center gap-2">
              {withLogos && isObject ? (
                <>
                  <img src={item.logo} alt={item.name} className="w-5 h-5 object-contain" />
                  <span className="text-sm font-medium text-zinc-400">{displayText}</span>
                </>
              ) : (
                <span className="text-lg font-medium text-zinc-500 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-900/50" fill="currentColor" />
                  {displayText}
                </span>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  )
}

// --- Main Skills Section ---
export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // --- Frontend skills with categories and colors ---
  const frontendSkills = [
    { name: "HTML5", category: "core" }, { name: "CSS3", category: "core" }, { name: "JavaScript (ES6+)", category: "core" }, { name: "TypeScript", category: "core" },
    { name: "React", category: "framework" }, { name: "Next.js", category: "framework" }, { name: "Vue.js", category: "framework" }, { name: "Svelte", category: "framework" },
    { name: "Redux", category: "state" }, { name: "Zustand", category: "state" }, { name: "Recoil", category: "state" },
    { name: "Tailwind CSS", category: "style" }, { name: "Sass", category: "style" }, { name: "Framer Motion", category: "style" }, { name: "Three.js", category: "style" }, { name: "GSAP", category: "style" },
    { name: "Storybook", category: "ui" }, { name: "Radix UI", category: "ui" }, { name: "Headless UI", category: "ui" }, { name: "Radium", category: "ui" },
    { name: "Apollo Client", category: "data" }, { name: "React Query", category: "data" }, { name: "SWR", category: "data" },
    { name: "Jest", category: "test" }, { name: "React Testing Library", category: "test" }, { name: "Cypress", category: "test" }
  ]

  const backendSkills = [
    "Node.js", "NestJS", "FastAPI", "Flask", "Spring Boot",
    "PostgreSQL", "MongoDB", "MySQL", "Redis", "GraphQL",
    "Swagger (OpenAPI)", "cURL", "Postman", "Apache Camel", "Jitsi Meet"
  ]

  const aiSkills = [
    "Python", "TensorFlow", "PyTorch", "LangChain",
    "Ollama", "CrewAI", "Colab", "Jupyter Notebook"
  ]

  const mobileSkills = [
    "Flutter", "Dart", "React Native", "Firebase",
    "Kotlin", "Swift", "iOS/Android"
  ]

  const devopsSkills = [
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
    { name: "Minikube", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
    { name: "Render", logo: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/renderco_logo-removebg-preview.png" },
    { name: "AWS", logo: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/aws-color.png" },
    { name: "GitHub Actions", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
    { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
    { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" }
  ]

  const designSkills = [
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
    { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
    { name: "Storybook", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/storybook/storybook-original.svg" },
    { name: "Sanity", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sanity/sanity-original.svg" },
    { name: "Stripe", logo: "https://logo.svgcdn.com/logos/stripe.svg" },
    { name: "Auth.js", logo: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/logo-sm.webp" },
    { name: "Clerk", logo: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/images.jfif" }
  ]

  // --- Map badge colors by category ---
  const getBadgeColor = (category: string) => {
    switch(category) {
      case "core": return "bg-blue-500/6 text-blue-300 border border-blue-500/10 text-[11px] px-2 py-0.5 rounded-full"
      case "framework": return "bg-indigo-500/6 text-indigo-300 border border-indigo-500/10 text-[11px] px-2 py-0.5 rounded-full"
      case "state": return "bg-purple-500/6 text-purple-300 border border-purple-500/10 text-[11px] px-2 py-0.5 rounded-full"
      case "style": return "bg-pink-500/6 text-pink-300 border border-pink-500/10 text-[11px] px-2 py-0.5 rounded-full"
      case "ui": return "bg-cyan-500/6 text-cyan-300 border border-cyan-500/10 text-[11px] px-2 py-0.5 rounded-full"
      case "data": return "bg-green-500/6 text-green-300 border border-green-500/10 text-[11px] px-2 py-0.5 rounded-full"
      case "test": return "bg-yellow-500/6 text-yellow-300 border border-yellow-500/10 text-[11px] px-2 py-0.5 rounded-full"
      default: return "bg-gray-500/6 text-gray-300 border border-gray-500/10 text-[11px] px-2 py-0.5 rounded-full"
    }
  }

  return (
    <section id="skills" className="skills-section section text-gray-300 relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4 border-amber-500/30 text-golden-gradient">Technical Arsenal</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Engineered for <span className="text-golden-gradient">Performance</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Modern technologies I use to build scalable, high-performance digital products with clean code and smooth UX.
          </p>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">

          {/* Frontend */}
          <SpotlightCard className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-zinc-900/80 to-zinc-900/30">
            <div className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-md bg-blue-500/8 flex items-center justify-center mb-5 border border-blue-500/10">
                  <Layout className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Frontend Architecture</h3>
                <p className="text-zinc-400 mb-6">
                  Pixel-perfect, modern, and scalable interfaces with advanced tools.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {frontendSkills.map(skill => (
                  <Badge key={skill.name} variant="secondary" className={`${getBadgeColor(skill.category)} hover:opacity-80`}>
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* Backend */}
          <SpotlightCard className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2">
            <div className="p-6 h-full flex flex-col">
              <div className="w-9 h-9 rounded-md bg-green-500/8 flex items-center justify-center mb-3 border border-green-500/12">
                <Terminal className="w-4 h-4 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Backend & API</h3>
              <p className="text-zinc-400 text-sm mb-auto">
                Scalable server logic, databases, and APIs for robust solutions.
              </p>
              <ul className="space-y-3 mt-6">
                {backendSkills.map(skill => (
                  <li key={skill} className="flex items-center gap-2 text-sm text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />{skill}
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>

          {/* AI */}
          <SpotlightCard className="col-span-1 md:col-span-3 lg:col-span-1 row-span-1 bg-zinc-900/80">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-9 h-9 rounded-md bg-purple-500/8 flex items-center justify-center border border-purple-500/12">
                  <Cpu className="w-4 h-4 text-purple-400" />
                </div>
                <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-400">AI & ML</Badge>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">AI Engineering</h3>
              <p className="text-zinc-500 text-xs mb-4">
                Smart solutions with ML pipelines, NLP, and automation for web and mobile apps.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {aiSkills.map(s => <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-300">{s}</span>)}
              </div>
            </div>
          </SpotlightCard>

          {/* Mobile */}
          <SpotlightCard className="col-span-1 lg:col-span-1 row-span-1">
            <div className="p-6">
              <div className="w-9 h-9 rounded-md bg-orange-500/8 flex items-center justify-center mb-3 border border-orange-500/12">
                <Smartphone className="w-4 h-4 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Mobile Apps</h3>
              <p className="text-zinc-400 text-sm mb-2">Cross-platform apps with Flutter, Dart, and native technologies.</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {mobileSkills.map(s => (
                  <Badge key={s} variant="outline" className="text-[11px] border-white/10 text-zinc-400 hover:text-orange-400 transition-colors px-2 py-0.5 rounded-full">{s}</Badge>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* DevOps */}
          <SpotlightCard className="col-span-1 md:col-span-3 lg:col-span-4 row-span-1">
            <div className="p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="shrink-0 w-10 h-10 rounded-md bg-red-500/8 flex items-center justify-center border border-red-500/12">
                <Container className="w-4 h-4 text-red-400" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-white">DevOps & Deployment</h3>
                <p className="text-zinc-400 text-sm">CI/CD pipelines, containerization, cloud deployment, and essential developer tools.</p>
              </div>
              <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                {devopsSkills.map(tool => (
                  <div key={tool.name} className="flex flex-col items-center gap-1 group">
                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                      <img src={tool.logo} alt={tool.name} className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-zinc-500">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>

        </div>

        {/* Marquee */}
        <div className="mt-24">
          <p className="text-center text-sm text-zinc-500 mb-6 uppercase tracking-widest">Design & Other Tools</p>
          <Marquee items={designSkills} withLogos={true} />
        </div>

      </div>
    </section>
  )
}
