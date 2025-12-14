"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ServicesSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true })
    
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setClearColor(0x000000, 0)

    // Create service visualization
    const services = [
      { 
        title: "AI-Driven Application Development", 
        color: 0xb9925a,
        geometry: new THREE.OctahedronGeometry(1),
        position: { x: -6, y: 0, z: 0 }
      },
      { 
        title: "Full-Stack Web Architecture", 
        color: 0x011d29,
        geometry: new THREE.BoxGeometry(1.5, 1.5, 1.5),
        position: { x: -2, y: 0, z: 0 }
      },
      { 
        title: "Cross-Platform Mobile Engineering", 
        color: 0xa57f4b,
        geometry: new THREE.SphereGeometry(1.2, 32, 32),
        position: { x: 2, y: 0, z: 0 }
      },
      { 
        title: "Interactive UI/UX Engineering", 
        color: 0x8a6b3f,
        geometry: new THREE.TetrahedronGeometry(1.1),
        position: { x: 6, y: 0, z: 0 }
      }
    ]

    const serviceObjects: THREE.Mesh[] = []

    services.forEach((service, index) => {
      const material = new THREE.MeshBasicMaterial({ 
        color: service.color, 
        transparent: true, 
        opacity: 0.7,
        wireframe: true
      })
      const mesh = new THREE.Mesh(service.geometry, material)
      
      mesh.position.set(service.position.x, service.position.y, service.position.z)
      
      serviceObjects.push(mesh)
      scene.add(mesh)
    })

    // Add connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xb9925a, transparent: true, opacity: 0.4 })
    
    for (let i = 0; i < serviceObjects.length - 1; i++) {
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        serviceObjects[i].position,
        serviceObjects[i + 1].position
      ])
      const line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)
    }

    camera.position.z = 10

    const animate = () => {
      requestAnimationFrame(animate)

      serviceObjects.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 + index * 0.002
        mesh.rotation.y += 0.01 + index * 0.001
        mesh.position.y = Math.sin(Date.now() * 0.001 + index * 2) * 0.5
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
      services.forEach(service => service.geometry.dispose())
    }
  }, [])

  const servicesData = [
    {
      title: "01. AI-Driven Application Development",
      description: "I integrate Large Language Models (LLMs) and NLP pipelines into web and mobile apps. From sentiment analysis to automated chatbots, I use tools like Groq, TensorFlow, and Python to make applications \"smart\".",
      icon: "🧠"
    },
    {
      title: "02. Full-Stack Web Architecture", 
      description: "I build end-to-end web solutions using React, Next.js, and Node.js. My focus is on reactive UIs backed by scalable PostgreSQL/Supabase databases and secure authentication.",
      icon: "🏗️"
    },
    {
      title: "03. Cross-Platform Mobile Engineering",
      description: "Using Flutter and Dart, I develop high-performance mobile applications that work seamlessly on iOS and Android, ensuring real-time data synchronization across devices.",
      icon: "📱"
    },
    {
      title: "04. Interactive UI/UX Engineering",
      description: "I go beyond standard templates by using WebGL and Custom CSS3 to create immersive, animated, and highly engaging user interfaces.",
      icon: "🎨"
    }
  ]

  return (
    <section id="service" className="services-section section">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"></div>
            <span className="text-8xl md:text-[10rem] font-extrabold bg-gradient-to-r from-white/10 via-white/5 to-white/2 bg-clip-text text-transparent select-none tracking-tighter">
              SERVICES
            </span>
            <h2 className="absolute text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-gray-300 capitalize">
              Services
            </h2>
          </div>
          <div className="flex items-center gap-4 my-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/50"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-purple-500/70"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/50"></div>
          </div>
          <p className="text-base md:text-lg tracking-wider text-gray-300 uppercase max-w-md text-center font-light mb-2">
            WHAT I OFFER
          </p>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Translate your skills into marketable business services.
          </p>
        </div>

        <div className="section-canvas relative mb-16">
          <canvas 
            ref={canvasRef}
            className="section-canvas-canvas absolute top-0 left-0 w-full h-96 pointer-events-none"
            style={{ height: '400px' }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {servicesData.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="text-2xl font-bold text-[#b9925a] mb-4">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}