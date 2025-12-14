"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, ExternalLink, PlayCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Project = {
  id: string
  title: string
  subtitle?: string
  description: string
  image?: string
  tech: string[]
  demo?: string
  github?: string
  video?: string
  featured?: boolean
}

// Modern Video Card Component with Hover Autoplay
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleMouseEnter = () => {
    setIsPlaying(true)
    videoRef.current?.play().catch((e) => console.log("Autoplay prevented:", e))
  }

  const handleMouseLeave = () => {
    setIsPlaying(false)
    videoRef.current?.pause()
    if (videoRef.current) videoRef.current.currentTime = 0
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className="group relative overflow-hidden border-white/10 bg-black/40 backdrop-blur-md hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 h-full flex flex-col"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Media Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-900 rounded-t-lg">
          {project.video ? (
            <>
              <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isPlaying ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isPlaying ? "opacity-0" : "opacity-100"
                }`}
              >
                 {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                    <PlayCircle className="w-12 h-12 text-white/20" />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="relative w-full h-full">
               {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
               )}
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
          
          {/* Floating Badge for Category */}
          {project.subtitle && (
             <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-black/60 backdrop-blur-md text-white border-white/20 text-xs font-light tracking-wide">
                  {project.subtitle}
                </Badge>
             </div>
          )}
        </div>

        <CardHeader className="space-y-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
              {project.title}
            </CardTitle>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tech.slice(0, 4).map((tech) => (
              <Badge 
                key={tech} 
                variant="outline" 
                className="border-white/10 text-gray-400 text-[10px] px-2 py-0 h-5"
              >
                {tech}
              </Badge>
            ))}
            {project.tech.length > 4 && (
               <Badge variant="outline" className="border-white/10 text-gray-500 text-[10px] px-2 h-5">+{project.tech.length - 4}</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-gray-400 line-clamp-3 leading-relaxed">
            {project.description}
          </CardDescription>
        </CardContent>

        <CardFooter className="mt-auto pt-4 flex gap-3">
          {project.demo && (
            <Button asChild size="sm" className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 border-0">
              <Link href={project.demo} target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Link>
            </Button>
          )}
          {project.github && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="outline" size="icon" className="border-white/20 bg-white/5 hover:bg-white/10 text-white shrink-0">
                    <Link href={project.github} target="_blank">
                      <Github className="w-4 h-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Source Code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function ProjectsSection(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Keep your existing 3D Background Logic
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true })
    
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setClearColor(0x000000, 0)

    // Simplified elegant cubes
    const projectData = [
      { color: 0x8b5cf6, position: { x: -4, y: 0, z: 0 } }, // Violet
      { color: 0x3b82f6, position: { x: 0, y: 0, z: 0 } },  // Blue
      { color: 0xec4899, position: { x: 4, y: 0, z: 0 } },  // Pink
    ]

    const cubes: THREE.Mesh[] = []

    projectData.forEach((data) => {
      const geometry = new THREE.IcosahedronGeometry(1.5, 0) // Changed to Icosahedron for more "tech" look
      const material = new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.15,
        wireframe: true
      })
      const cube = new THREE.Mesh(geometry, material)
      cube.position.set(data.position.x, data.position.y, data.position.z)
      cubes.push(cube)
      scene.add(cube)
    })

    camera.position.z = 8

    const animate = () => {
      requestAnimationFrame(animate)
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.002
        cube.rotation.y += 0.003
        // Gentle floating
        cube.position.y = Math.sin(Date.now() * 0.001 + index * 2) * 0.5
      })
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  const projects: Project[] = [
    {
      id: 'safe-space',
      title: 'SafeSpace Ecosystem',
      subtitle: 'AI HealthTech',
      description: 'Award-winning platform connecting patients and doctors with real-time AI-driven sentiment analysis.',
      image: '/projects/safespace.png',
      tech: ['Flutter', 'React', 'TypeScript', 'Python', 'FastAPI'],
      demo: '#',
      github: '#',
      video: '/videos/safespace-demo.mp4', // Ensure this file exists for autoplay
    },
    {
      id: 'freshmart',
      title: 'Freshmart Store',
      subtitle: 'E-commerce',
      description: 'A lightning-fast grocery store featuring state management, cart logic, and stripe payments.',
      image: '/projects/freshmart.png',
      tech: ['Next.js', 'Redux', 'Tailwind', 'Stripe'],
      demo: '#',
      github: '#',
      video: '/videos/freshmart-demo.mp4',
    },
    {
      id: 'researchx',
      title: 'ResearchX AI',
      subtitle: 'SaaS Platform',
      description: 'AI-powered document researcher that scrapes, synthesizes, and generates comprehensive whitepapers.',
      image: '/projects/researchx.png',
      tech: ['Next.js', 'OpenAI API', 'LangChain', 'Vercel'],
      demo: '#',
      github: '#',
    },
    {
      id: 'master-designer',
      title: 'Master Designer v2',
      subtitle: 'Interactive 3D',
      description: 'Immersive web platform engineered with WebGL/Three.js for the All-Island Design Competition.',
      image: '/projects/master-designer.png',
      tech: ['Three.js', 'WebGL', 'GSAP', 'React'],
      demo: '#',
      github: '#',
      video: '/videos/master-designer-demo.mp4',
    },
    {
      id: 'serendib-games',
      title: 'Serendib Games',
      subtitle: 'Content Platform',
      description: 'Cloud-based gaming hub featuring a fully responsive UI and intelligent chatbot automation.',
      image: '/projects/serendib.png',
      tech: ['React', 'Node.js', 'AWS', 'MongoDB'],
      demo: '#',
      github: '#',
      video: '/videos/serendib-demo.mp4',
    },
    {
      id: 'ecommerce-platform',
      title: 'Nexus Commerce',
      subtitle: 'Full-Stack',
      description: 'Scalable architecture with microservices, handling thousands of products with AI recommendations.',
      image: '/projects/ecommerce.png',
      tech: ['NestJS', 'PostgreSQL', 'Docker', 'Redis'],
      demo: '#',
      github: '#',
      video: '/videos/ecommerce-demo.mp4',
    },
  ]

  return (
    <section id="projects" className="projects-section section text-gray-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl -z-10"></div>
      {/* Background Canvas */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl -z-10"></div>

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4 px-4 py-1.5 rounded-full text-sm">
              Portfolio
            </Badge>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white"
          >
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Works</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A curated collection of projects pushing the boundaries of Web Development, AI, and User Experience.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}