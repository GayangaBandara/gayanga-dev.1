"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export default function ContactSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let renderer: THREE.WebGLRenderer
    let animationFrameId: number
    let particlesMesh: THREE.Points
    let nodeObjects: THREE.Mesh[] = []
    let lineObjects: THREE.Line[] = []

    try {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000)
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true })
      
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
      renderer.setClearColor(0x000000, 0)

      // Generate flowing particle field
      const particlesGeometry = new THREE.BufferGeometry()
      const particlesCount = 500
      const posArray = new Float32Array(particlesCount * 3)

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 30
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xb9925a,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
      })

      particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
      scene.add(particlesMesh)

      // Add contact nodes (representing contact methods)
      const contactNodes = [
        { 
          position: new THREE.Vector3(-6, 2, 0), 
          type: 'email', 
          data: 'gr.gayangabandara@gmail.com',
          color: 0xb9925a
        },
        { 
          position: new THREE.Vector3(0, 2, 0), 
          type: 'phone', 
          data: '+94 75 257 8200',
          color: 0x011d29
        },
        { 
          position: new THREE.Vector3(6, 2, 0), 
          type: 'location', 
          data: 'Kandy, Sri Lanka',
          color: 0xa57f4b
        }
      ]

      contactNodes.forEach((node) => {
        const geometry = new THREE.SphereGeometry(0.5, 16, 16)
        const material = new THREE.MeshBasicMaterial({ 
          color: node.color, 
          transparent: true, 
          opacity: 0.8,
          wireframe: true
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.copy(node.position)
        mesh.userData = node
        nodeObjects.push(mesh)
        scene.add(mesh)
      })

      // Add connecting lines between contact nodes
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xb9925a, transparent: true, opacity: 0.3 })
      
      for (let i = 0; i < nodeObjects.length - 1; i++) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          nodeObjects[i].position,
          nodeObjects[i + 1].position
        ])
        const line = new THREE.Line(lineGeometry, lineMaterial)
        lineObjects.push(line)
        scene.add(line)
      }

      camera.position.z = 10

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate)

        // Rotate particles in flowing motion
        if (particlesMesh) {
          particlesMesh.rotation.x += 0.001
          particlesMesh.rotation.y += 0.002
        }

        // Pulse and rotate contact nodes
        nodeObjects.forEach((node, index) => {
          node.rotation.x += 0.01
          node.rotation.y += 0.01
          node.scale.setScalar(1 + Math.sin(Date.now() * 0.001 + index) * 0.2)
        })

        if (renderer && scene && camera) {
          renderer.render(scene, camera)
        }
      }

      animate()

      const handleResize = () => {
        if (canvas && camera && renderer) {
          camera.aspect = canvas.offsetWidth / canvas.offsetHeight
          camera.updateProjectionMatrix()
          renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
        }
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        
        // Cancel animation frame
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }

        // Dispose of Three.js objects to prevent memory leaks
        if (renderer) {
          renderer.dispose()
        }
        
        if (particlesMesh) {
          particlesMesh.geometry.dispose()
          if (Array.isArray(particlesMesh.material)) {
            particlesMesh.material.forEach(material => material.dispose())
          } else {
            particlesMesh.material.dispose()
          }
        }

        // Dispose node objects
        nodeObjects.forEach(node => {
          node.geometry.dispose()
          if (Array.isArray(node.material)) {
            node.material.forEach(material => material.dispose())
          } else {
            node.material.dispose()
          }
        })

        // Dispose line objects
        lineObjects.forEach(line => {
          line.geometry.dispose()
          if (Array.isArray(line.material)) {
            line.material.forEach(material => material.dispose())
          } else {
            line.material.dispose()
          }
        })
      }
    } catch (error) {
      console.error('Error initializing Three.js scene:', error)
      return () => {
        // Cleanup on error
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // You can integrate with email service like EmailJS, Formspree, etc.
  }

  const contactInfo = [
    {
      type: 'Email',
      value: 'gr.gayangabandara@gmail.com',
      icon: '📧',
      action: 'mailto:gr.gayangabandara@gmail.com'
    },
    {
      type: 'Phone',
      value: '+94 75 257 8200',
      icon: '📱',
      action: 'tel:+94752578200'
    },
    {
      type: 'Location',
      value: 'Kandy, Sri Lanka (Open to Remote)',
      icon: '📍',
      action: '#'
    },
    {
      type: 'LinkedIn',
      value: 'Connect on LinkedIn',
      icon: '💼',
      action: 'https://linkedin.com/in/gayangabandara'
    },
    {
      type: 'GitHub',
      value: 'View GitHub Profile',
      icon: '🐙',
      action: 'https://github.com/gayangabandara'
    }
  ]

  return (
    <section id="contact" className="contact-section py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-[#b9925a] mb-6">Contact</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Make it effortless to hire you.
          </p>
        </div>

        <div className="relative mb-16">
          <canvas 
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-96 pointer-events-none"
            style={{ height: '400px' }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="contact-info">
            <h3 className="text-3xl font-bold text-[#b9925a] mb-8">Get In Touch</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.action}
                  className="contact-item flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-[#b9925a] transition-all duration-300 hover:transform hover:scale-105"
                  target={info.action.startsWith('http') ? '_blank' : '_self'}
                  rel={info.action.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <div className="text-2xl">{info.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{info.type}</h4>
                    <p className="text-gray-300">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h3 className="text-3xl font-bold text-[#b9925a] mb-8">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#b9925a] focus:ring-2 focus:ring-[#b9925a]/20 transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#b9925a] focus:ring-2 focus:ring-[#b9925a]/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#b9925a] focus:ring-2 focus:ring-[#b9925a]/20 transition-all duration-300 resize-none"
                  placeholder="Your message..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#b9925a] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#a57f4b] transform hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}