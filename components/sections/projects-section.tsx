"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ProjectsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
      { title: "Serendib Games Blog", color: 0xa57f4b, position: { x: 4, y: 0, z: 0 } }
    ]

    const cubes: THREE.Mesh[] = []

    projectData.forEach((project, index) => {
      const geometry = new THREE.BoxGeometry(2, 2.5, 0.2)
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

  return (
    <section id="projects" className="projects-section py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-[#b9925a] mb-6">Featured Projects</h2>
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
          {/* Project 1: SafeSpace Ecosystem */}
          <div className="project-card">
            <div className="project-number">01</div>
            <h3 className="text-2xl font-bold text-[#b9925a] mb-4">SafeSpace Ecosystem (AI-Powered HealthTech)</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">The Challenge:</h4>
                <p className="text-gray-300 text-sm">
                  Mental health resources are often inaccessible or slow to respond.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">The Solution:</h4>
                <p className="text-gray-300 text-sm">
                  A comprehensive platform connecting patients and doctors via a Flutter mobile app and a React.js Admin Dashboard.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">The "Wow" Factor:</h4>
                <p className="text-gray-300 text-sm">
                  Integrated Groq LLM via a Python FastAPI backend to deliver real-time AI sentiment analysis and automated crisis intervention.
                </p>
              </div>
            </div>
            
            <div className="tech-stack">
              <h5 className="text-sm font-semibold text-[#b9925a] mb-2">Tech Stack:</h5>
              <p className="text-gray-400 text-sm">
                Flutter, React.js, TypeScript, Python FastAPI, Supabase (PostgreSQL), Groq LLM.
              </p>
            </div>
          </div>

          {/* Project 2: Master Designer v2.0 */}
          <div className="project-card">
            <div className="project-number">02</div>
            <h3 className="text-2xl font-bold text-[#b9925a] mb-4">Master Designer v2.0 (Immersive Event Tech)</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">The Challenge:</h4>
                <p className="text-gray-300 text-sm">
                  The All-Island Design Competition required a digital presence that matched the creativity of its participants.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">The Solution:</h4>
                <p className="text-gray-300 text-sm">
                  An immersive web platform engineered with interactive 3D elements and high-performance animations.
                </p>
              </div>
            </div>
            
            <div className="tech-stack">
              <h5 className="text-sm font-semibold text-[#b9925a] mb-2">Tech Stack:</h5>
              <p className="text-gray-400 text-sm">
                WebGL, Custom CSS3, HTML5.
              </p>
            </div>
          </div>

          {/* Project 3: Serendib Games Blog */}
          <div className="project-card">
            <div className="project-number">03</div>
            <h3 className="text-2xl font-bold text-[#b9925a] mb-4">Serendib Games Blog (Content Platform)</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">The Challenge:</h4>
                <p className="text-gray-300 text-sm">
                  Static blogs often fail to engage users or answer specific queries instantly.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">The Solution:</h4>
                <p className="text-gray-300 text-sm">
                  A cloud-based gaming content platform featuring a fully responsive UI and intelligent automation.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">The "Wow" Factor:</h4>
                <p className="text-gray-300 text-sm">
                  Integrated a trained, real-time AI chatbot to handle user queries instantly, boosting visitor engagement.
                </p>
              </div>
            </div>
            
            <div className="tech-stack">
              <h5 className="text-sm font-semibold text-[#b9925a] mb-2">Tech Stack:</h5>
              <p className="text-gray-400 text-sm">
                React, Node.js, Trained AI Model, Cloud Hosting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}