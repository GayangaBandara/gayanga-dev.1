"use client"

import React, { useEffect, useMemo, useState } from "react"
import {
  Layout,
  Terminal,
  Smartphone,
  Cpu,
  Container,
  Database,
  ShieldCheck,
} from "lucide-react"

type Row = 1 | 2 | 3

interface TechItem {
  id: string
  title: string
  color: string
  Icon: React.ElementType
  row: Row
  description: string
  skills: string[]
}

const techData: TechItem[] = [
  {
    id: "frontend",
    title: "FRONTEND ARCHITECTURE",
    color: "#22d3ee",
    Icon: Layout,
    row: 1,
    description:
      "Pixel-perfect, modern, and scalable interfaces with advanced tools. Expertise in HTML5, CSS3, JavaScript (ES6+), TypeScript and modern frameworks.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "Svelte",
      "Redux",
      "Zustand",
      "Recoil",
      "Apollo Client",
      "React Query",
      "SWR",
      "Tailwind CSS",
      "Sass",
      "Radix UI",
      "Headless UI",
      "Framer Motion",
      "Three.js",
      "GSAP",
      "Storybook",
    ],
  },
  {
    id: "backend",
    title: "BACKEND & API",
    color: "#34d399",
    Icon: Terminal,
    row: 1,
    description:
      "Scalable server logic, databases, and APIs for robust solutions. Node.js, Python, Java ecosystems with API design and communication protocols.",
    skills: [
      "Node.js",
      "NestJS",
      "Python",
      "FastAPI",
      "Flask",
      "Java",
      "Spring Boot",
      "GraphQL",
      "Swagger (OpenAPI)",
      "Postman",
    ],
  },
  {
    id: "mobile",
    title: "MOBILE APPS",
    color: "#fb923c",
    Icon: Smartphone,
    row: 2,
    description:
      "Cross-platform and native mobile development. Flutter for cross-platform excellence, React Native for JavaScript-based apps, and native development with Kotlin and Swift.",
    skills: [
      "Flutter",
      "Dart",
      "React Native",
      "Kotlin",
      "Swift",
      "Firebase",
      "iOS",
      "Android",
    ],
  },
  {
    id: "ai",
    title: "AI ENGINEERING",
    color: "#a78bfa",
    Icon: Cpu,
    row: 2,
    description:
      "Smart solutions with machine learning pipelines and AI automation. Deep learning frameworks, LLM agents, and intelligent automation tools.",
    skills: [
      "Python",
      "Jupyter",
      "Colab",
      "TensorFlow",
      "PyTorch",
      "LangChain",
      "Ollama",
      "CrewAI",
    ],
  },
  {
    id: "devops",
    title: "DEVOPS & CLOUD",
    color: "#f87171",
    Icon: Container,
    row: 2,
    description:
      "CI/CD pipelines, containerization, and cloud deployment. Docker and Kubernetes orchestration, AWS cloud services, and modern deployment platforms.",
    skills: ["Docker", "Kubernetes", "AWS", "Vercel", "Render", "GitHub Actions", "Linux"],
  },
  {
    id: "database",
    title: "DATA STORAGE",
    color: "#facc15",
    Icon: Database,
    row: 3,
    description:
      "Optimized data structures and persistent storage. SQL, NoSQL, in-memory caching, and real-time database solutions.",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase (Firestore/Realtime DB)"],
  },
  {
    id: "testing",
    title: "QUALITY & TESTING",
    color: "#f472b6",
    Icon: ShieldCheck,
    row: 3,
    description:
      "Ensuring reliability through testing standards. Unit testing, component testing, E2E testing, and regression testing.",
    skills: ["Jest", "React Testing Library", "Cypress"],
  },
]

function HexagonItem({
  item,
  isActive,
  onEnter,
  onLeave,
}: {
  item: TechItem
  isActive: boolean
  onEnter: (item: TechItem) => void
  onLeave: () => void
}) {
  const Icon = item.Icon

  return (
    <div
      className="ta-hex"
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={item.title}
      style={{ color: item.color, zIndex: isActive ? 30 : 10 }}
      onMouseEnter={() => onEnter(item)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(item)}
      onBlur={onLeave}
      onClick={() => onEnter(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onEnter(item)
        }
      }}
    >
      <div className="ta-hex-borders">
        <div className="ta-hex-border ta-b1" />
        <div className="ta-hex-border ta-b2" />
        <div className="ta-hex-border ta-b3" />
      </div>

      <div className="ta-hex-label">
        <Icon size={isActive ? 48 : 42} strokeWidth={1.5} />
      </div>
    </div>
  )
}

export default function Skills() {
  const [activeItem, setActiveItem] = useState<TechItem | null>(null)
  const [hintVisible, setHintVisible] = useState(true)

  const rows = useMemo(() => {
    return {
      1: techData.filter((i) => i.row === 1),
      2: techData.filter((i) => i.row === 2),
      3: techData.filter((i) => i.row === 3),
    } as const
  }, [])

  const handleEnter = (item: TechItem) => {
    setHintVisible(false)
    setActiveItem(item)
  }

  const handleLeave = () => {
    // keep last selected for better UX
  }

  const badgeStyle = (color: string) => ({
    backgroundColor: "transparent",
    color,
    border: `1px solid ${color}60`,
    boxShadow: `0 0 5px ${color}10`,
  })

  useEffect(() => {
    const link = document.createElement("link")
    link.href =
      "https://fonts.googleapis.com/css?family=Oswald:400,700,300|Inter:400,500,600"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    return () => {
      link.remove()
    }
  }, [])

  return (
    <section id="skills" className="section skills-section">
      <div className="ta-wrap">
        <div className="ta-glow ta-g1" />
        <div className="ta-glow ta-g2" />

        <div className="ta-container">
          <div className="ta-gridWrap">
            <div className="ta-hexWrap">
              <div className={`ta-hint ${!hintVisible ? "is-hidden" : ""}`}>
                Init System...
              </div>

              <div className="ta-row">
                {rows[1].map((item) => (
                  <HexagonItem
                    key={item.id}
                    item={item}
                    isActive={activeItem?.id === item.id}
                    onEnter={handleEnter}
                    onLeave={handleLeave}
                  />
                ))}
              </div>

              <div className="ta-row ta-rowMid">
                {rows[2].map((item) => (
                  <HexagonItem
                    key={item.id}
                    item={item}
                    isActive={activeItem?.id === item.id}
                    onEnter={handleEnter}
                    onLeave={handleLeave}
                  />
                ))}
              </div>

              <div className="ta-row ta-rowLast">
                {rows[3].map((item) => (
                  <HexagonItem
                    key={item.id}
                    item={item}
                    isActive={activeItem?.id === item.id}
                    onEnter={handleEnter}
                    onLeave={handleLeave}
                  />
                ))}
              </div>
            </div>

            <div className="ta-panel">
              <div className="ta-label">Technical Arsenal</div>

              {activeItem ? (
                <div key={activeItem.id} className="ta-slideIn">
                  <div
                    className="ta-title"
                    style={{
                      color: activeItem.color,
                      textShadow: `0 0 20px ${activeItem.color}50`,
                    }}
                  >
                    {activeItem.title}
                  </div>

                  <p className="ta-desc">{activeItem.description}</p>

                  <div className="ta-badges">
                    {activeItem.skills.map((s) => (
                      <span
                        key={s}
                        className="ta-badge"
                        style={badgeStyle(activeItem.color)}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="ta-placeholder">
                  &gt; AWAITING INPUT...
                  <br />
                  &gt; HOVER MODULE TO SCAN<span className="ta-cursor" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
