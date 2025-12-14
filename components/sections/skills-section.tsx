"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export default function SkillsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true })
    
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setClearColor(0x000000, 0)

    // Create skill visualization with different geometric shapes
    const skills = [
      { name: "React", color: 0x61dafb, position: { x: -8, y: 3, z: 0 }, shape: "cube" },
      { name: "Next.js", color: 0x000000, position: { x: -4, y: 3, z: 0 }, shape: "sphere" },
      { name: "TypeScript", color: 0x3178c6, position: { x: 0, y: 3, z: 0 }, shape: "octahedron" },
      { name: "Flutter", color: 0x02569b, position: { x: 4, y: 3, z: 0 }, shape: "tetrahedron" },
      { name: "Node.js", color: 0x339933, position: { x: 8, y: 3, z: 0 }, shape: "icosahedron" },
      
      { name: "Python", color: 0x3776ab, position: { x: -8, y: -1, z: 0 }, shape: "sphere" },
      { name: "FastAPI", color: 0x009688, position: { x: -4, y: -1, z: 0 }, shape: "cube" },
      { name: "TensorFlow", color: 0xff6f00, position: { x: 0, y: -1, z: 0 }, shape: "octahedron" },
      { name: "Groq LLM", color: 0xb9925a, position: { x: 4, y: -1, z: 0 }, shape: "tetrahedron" },
      { name: "PostgreSQL", position: { x: 8, y: -1, z: 0 }, shape: "icosahedron" },
      
      { name: "Supabase", color: 0x3ecf8e, position: { x: -6, y: -5, z: 0 }, shape: "sphere" },
      { name: "Docker", color: 0x2496ed, position: { x: -2, y: -5, z: 0 }, shape: "cube" },
      { name: "GSAP", color: 0x88ce02, position: { x: 2, y: -5, z: 0 }, shape: "octahedron" },
      { name: "Three.js", position: { x: 6, y: -5, z: 0 }, shape: "tetrahedron" }
    ]

    const skillObjects: THREE.Mesh[] = []

    skills.forEach((skill, index) => {
      let geometry: THREE.BufferGeometry
      
      switch (skill.shape) {
        case "cube":
          geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8)
          break
        case "sphere":
          geometry = new THREE.SphereGeometry(0.6, 32, 32)
          break
        case "octahedron":
          geometry = new THREE.OctahedronGeometry(0.7)
          break
        case "tetrahedron":
          geometry = new THREE.TetrahedronGeometry(0.6)
          break
        case "icosahedron":
          geometry = new THREE.IcosahedronGeometry(0.5)
          break
        default:
          geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8)
      }

      const material = new THREE.MeshBasicMaterial({ 
        color: skill.color || 0xb9925a, 
        transparent: true, 
        opacity: 0.7,
        wireframe: true
      })
      
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(skill.position.x, skill.position.y, skill.position.z)
      mesh.userData = { skill: skill.name, index }
      
      skillObjects.push(mesh)
      scene.add(mesh)
    })

    // Add connecting lines between related technologies
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xb9925a, transparent: true, opacity: 0.2 })
    
    const connections = [
      { from: 0, to: 1 }, // React to Next.js
      { from: 1, to: 2 }, // Next.js to TypeScript
      { from: 5, to: 6 }, // Python to FastAPI
      { from: 6, to: 7 }, // FastAPI to TensorFlow
      { from: 7, to: 8 }, // TensorFlow to Groq
      { from: 10, to: 11 }, // Supabase to Docker
      { from: 11, to: 12 }, // Docker to GSAP
    ]

    connections.forEach(connection => {
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        skillObjects[connection.from].position,
        skillObjects[connection.to].position
      ])
      const line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)
    })

    camera.position.z = 12

    const animate = () => {
      requestAnimationFrame(animate)

      skillObjects.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 + index * 0.0005
        mesh.rotation.y += 0.01 + index * 0.0003
        // Get the original position from the skills array
        const originalSkill = skills[index]
        mesh.position.y = originalSkill.position.y + Math.sin(Date.now() * 0.001 + index) * 0.2
      })

      renderer.render(scene, camera)
    }

    animate()

    // Mouse interaction for skill highlighting
    const handleMouseMove = (event: MouseEvent) => {
      const mouse = new THREE.Vector2(
        (event.clientX / canvas.offsetWidth) * 2 - 1,
        -(event.clientY / canvas.offsetHeight) * 2 + 1
      )

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)

      const intersects = raycaster.intersectObjects(skillObjects)
      
      skillObjects.forEach(mesh => {
        if (intersects.find(intersect => intersect.object === mesh)) {
          setHoveredSkill(mesh.userData.skill)
          if (mesh.material && typeof mesh.material === 'object' && 'opacity' in mesh.material) {
            (mesh.material as any).opacity = 1
          }
          mesh.scale.setScalar(1.2)
        } else {
          if (mesh.material && typeof mesh.material === 'object' && 'opacity' in mesh.material) {
            (mesh.material as any).opacity = 0.7
          }
          mesh.scale.setScalar(1)
        }
      })
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind", "Bootstrap", "Flutter"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "Python (FastAPI, Flask)", "SpringBoot"]
    },
    {
      title: "AI & Data",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "LLMs (Groq)"]
    },
    {
      title: "Database",
      skills: ["PostgreSQL", "MongoDB", "Supabase", "Firebase", "MySQL"]
    },
    {
      title: "DevOps & Tools",
      skills: ["Docker", "Git/GitHub Actions (CI/CD)", "Linux", "Vercel"]
    }
  ]

  return (
    <section id="skills" className="skills-section py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-[#b9925a] mb-6">Technical Arsenal</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Visualizing your stack makes it easier for recruiters to scan.
          </p>
          {hoveredSkill && (
            <div className="mt-4 p-3 bg-[#b9925a] text-black rounded-lg inline-block">
              <strong>Hovering:</strong> {hoveredSkill}
            </div>
          )}
        </div>

        <div className="section-canvas relative mb-16">
          <canvas 
            ref={canvasRef}
            className="section-canvas-canvas absolute top-0 left-0 w-full h-96 pointer-events-auto"
            style={{ height: '400px' }}
          />
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="text-2xl font-bold text-[#b9925a] mb-4">{category.title}</h3>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="skill-item"
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <span className="skill-name">{skill}</span>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ 
                          width: `${85 + Math.random() * 15}%`,
                          backgroundColor: hoveredSkill === skill ? '#b9925a' : '#011d29'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}