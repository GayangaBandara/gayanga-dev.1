"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import Image from "next/image"

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
}

function PlayOverlay({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Play project demo video"
      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-200"
    >
      <span className="inline-flex items-center justify-center rounded-full bg-white/90 text-black p-3 shadow-lg">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
          <path d="M5 3v18l15-9L5 3z" />
        </svg>
      </span>
    </button>
  )
}

function ProjectCard({ project, onOpenVideo }: { project: Project; onOpenVideo: (video?: string) => void }) {
  return (
    <article className="bg-gradient-to-b from-white/2 to-transparent border border-white/6 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-200">
      <div className="relative w-full h-44 md:h-56 bg-gray-900">
        {project.image ? (
          <Image src={project.image} alt={`${project.title} preview`} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No preview</div>
        )}
        {project.video && <PlayOverlay onClick={() => onOpenVideo(project.video)} />}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            {project.subtitle && <p className="text-sm text-gray-300">{project.subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/6 text-xs text-gray-200 border border-white/8" title={t} aria-hidden>
                {t.split(/[^A-Za-z0-9]/).map((s) => s[0]).slice(0,2).join('').toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-300 mt-3 mb-4">{project.description}</p>

        <div className="flex items-center gap-3">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open live demo for ${project.title}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-violet-600 to-orange-500 text-white text-sm shadow-sm hover:scale-[0.99] transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M10 14l6-4-6-4v8z"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>
              Live Demo
            </a>
          )}

          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Open GitHub repository for ${project.title}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 text-gray-200 text-sm border border-white/8 hover:bg-white/6">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" width="16" height="16"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"></path></svg>
              GitHub
            </a>
          )}

        </div>
      </div>
    </article>
  )
}

export default function ProjectsSection(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [openVideo, setOpenVideo] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true })
    
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setClearColor(0x000000, 0)

    // Create floating cubes for project cards
    const projectData = [
      { title: "SafeSpace Ecosystem", color: 0xb9925a, position: { x: -4, y: 0, z: 0 } },
      { title: "Master Designer v2.0", color: 0x011d29, position: { x: 0, y: 0, z: 0 } },
      { title: "Serendib Games Blog", color: 0xa57f4b, position: { x: 4, y: 0, z: 0 } },
      { title: "E-Commerce Platform", color: 0x4a90e2, position: { x: -4, y: 2, z: 0 } },
      { title: "Mobile App Development", color: 0x50c878, position: { x: 0, y: 2, z: 0 } },
      { title: "Data Analytics Dashboard", color: 0xff6347, position: { x: 4, y: 2, z: 0 } }
    ]

    const cubes: THREE.Mesh[] = []

    projectData.forEach((project, index) => {
      const geometry = new THREE.BoxGeometry(2, 2, 2)
      const material = new THREE.MeshBasicMaterial({
        color: project.color,
        transparent: true,
        opacity: 0.8,
        wireframe: true
      })
      const cube = new THREE.Mesh(geometry, material)

      cube.position.set(project.position.x, project.position.y, project.position.z)
      cube.rotation.x = Math.PI * 0.1
      cube.rotation.y = Math.PI * 0.05

      cubes.push(cube)
      scene.add(cube)
    })

    // Add connecting lines between projects
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xb9925a, transparent: true, opacity: 0.3 })
    
    const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-4, 0, 0),
      new THREE.Vector3(0, 0, 0)
    ])
    const line1 = new THREE.Line(lineGeometry1, lineMaterial)
    scene.add(line1)

    const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(4, 0, 0)
    ])
    const line2 = new THREE.Line(lineGeometry2, lineMaterial)
    scene.add(line2)

    const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-4, 2, 0),
      new THREE.Vector3(0, 2, 0)
    ])
    const line3 = new THREE.Line(lineGeometry3, lineMaterial)
    scene.add(line3)

    const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 2, 0),
      new THREE.Vector3(4, 2, 0)
    ])
    const line4 = new THREE.Line(lineGeometry4, lineMaterial)
    scene.add(line4)

    camera.position.z = 8

    const animate = () => {
      requestAnimationFrame(animate)

      cubes.forEach((cube, index) => {
        cube.rotation.y += 0.01
        cube.position.y = Math.sin(Date.now() * 0.001 + index) * 0.3
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

  // close modal on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenVideo(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openVideo])

  return (
    <section id="projects" className="projects-section py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"></div>
            <span className="text-8xl md:text-[10rem] font-extrabold bg-gradient-to-r from-white/10 via-white/5 to-white/2 bg-clip-text text-transparent select-none tracking-tighter">
              PROJECTS
            </span>
            <h2 className="absolute text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-gray-300 capitalize">
              Projects
            </h2>
          </div>
          <div className="flex items-center gap-4 my-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/50"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-purple-500/70"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/50"></div>
          </div>
          <p className="text-base md:text-lg tracking-wider text-gray-300 uppercase max-w-md text-center font-light mb-2">
            SHOWCASE OF WORK
          </p>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Top-tier portfolios treat projects as "Case Studies." This format highlights the challenge and the solution.
          </p>
        </div>

        <div className="section-canvas relative mb-16">
          <canvas 
            ref={canvasRef}
            className="section-canvas-canvas absolute top-0 left-0 w-full h-96 pointer-events-none"
            style={{ height: '400px' }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {(
            [
              {
                id: 'safe-space',
                title: 'SafeSpace Ecosystem',
                subtitle: 'AI-Powered HealthTech',
                description: 'A platform connecting patients and doctors with real-time AI-driven sentiment analysis and intervention flows.',
                image: '/projects/safespace.png',
                tech: ['Flutter', 'React', 'TypeScript', 'FastAPI'],
                demo: '#',
                github: '#',
                video: '/videos/safespace-demo.mp4',
              },
              {
                id: 'freshmart',
                title: 'Freshmart Store',
                subtitle: 'Modern Grocery E-commerce',
                description: 'A fast, responsive grocery store with efficient state management and a delightful checkout experience.',
                image: '/projects/freshmart.png',
                tech: ['React', 'Redux', 'Tailwind'],
                demo: '#',
                github: '#',
                video: '/videos/freshmart-demo.mp4',
              },
              {
                id: 'researchx',
                title: 'ResearchX',
                subtitle: 'AI Document Research',
                description: 'AI-powered research document generator that creates comprehensive papers and summarizations.',
                image: '/projects/researchx.png',
                tech: ['Next.js', 'TypeScript', 'Vercel'],
                demo: '#',
                github: '#',
                video: undefined,
              },
              {
                id: 'master-designer',
                title: 'Master Designer v2.0',
                subtitle: 'Immersive Event Tech',
                description: 'An immersive web platform engineered with interactive 3D elements and high-performance animations for the All-Island Design Competition.',
                image: '/projects/master-designer.png',
                tech: ['WebGL', 'Custom CSS3', 'HTML5'],
                demo: '#',
                github: '#',
                video: '/videos/master-designer-demo.mp4',
              },
              {
                id: 'serendib-games',
                title: 'Serendib Games Blog',
                subtitle: 'Content Platform',
                description: 'A cloud-based gaming content platform featuring a fully responsive UI and intelligent automation with a trained AI chatbot.',
                image: '/projects/serendib.png',
                tech: ['React', 'Node.js', 'AI Model', 'Cloud Hosting'],
                demo: '#',
                github: '#',
                video: '/videos/serendib-demo.mp4',
              },
              {
                id: 'ecommerce-platform',
                title: 'E-Commerce Platform',
                subtitle: 'Full-Stack Web App',
                description: 'A scalable e-commerce platform with AI-powered product recommendations and automated order processing.',
                image: '/projects/ecommerce.png',
                tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
                demo: '#',
                github: '#',
                video: '/videos/ecommerce-demo.mp4',
              },
            ] as Project[]
          ).map((proj) => (
            <ProjectCard key={proj.id} project={proj} onOpenVideo={(v) => setOpenVideo(v ?? null)} />
          ))}
        </div>

        {/* Video modal */}
        {openVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
            <div className="relative max-w-4xl w-full bg-transparent">
              <button aria-label="Close video" onClick={() => setOpenVideo(null)} className="absolute -top-8 right-0 text-white bg-white/6 rounded-full p-2 hover:bg-white/10">
                ✕
              </button>
              <div className="w-full bg-black rounded-lg overflow-hidden">
                <video className="w-full h-auto" controls src={openVideo} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}