'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Terminal, 
  Smartphone, 
  Cpu, 
  Container, 
  Database, 
  ShieldCheck
} from "lucide-react";

// --- Types ---
interface TechItem {
  id: string;
  title: string;
  color: string;
  Icon: React.ElementType;
  row: 1 | 2 | 3;
  description: string;
  skills: string[];
  category: string;
}

// --- Data ---
const techData: TechItem[] = [
  // --- Row 1 ---
  {
    id: 'frontend',
    title: 'FRONTEND ARCHITECTURE',
    color: '#22d3ee', // Cyan-400
    Icon: Layout,
    row: 1,
    category: 'core',
    description: "Pixel-perfect, modern, and scalable interfaces with advanced tools. Expertise in HTML5, CSS3, JavaScript (ES6+), TypeScript and modern frameworks.",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Vue.js", "Svelte", "Redux", "Zustand", "Recoil", "Apollo Client", "React Query", "SWR", "Tailwind CSS", "Sass", "Radix UI", "Headless UI", "Radium", "Framer Motion", "Three.js", "GSAP", "Storybook"]
  },
  {
    id: 'backend',
    title: 'BACKEND & API',
    color: '#34d399', // Emerald-400
    Icon: Terminal,
    row: 1,
    category: 'code',
    description: "Scalable server logic, databases, and APIs for robust solutions. Node.js, Python, Java ecosystems with API design and communication protocols.",
    skills: ["Node.js", "NestJS", "Python", "FastAPI", "Flask", "Java", "Spring Boot", "GraphQL", "Swagger (OpenAPI)", "cURL", "Postman", "Apache Camel", "Jitsi Meet"]
  },

  // --- Row 2 ---
  {
    id: 'mobile',
    title: 'MOBILE APPS',
    color: '#fb923c', // Orange-400
    Icon: Smartphone,
    row: 2,
    category: 'mobile',
    description: "Cross-platform and native mobile development. Flutter for cross-platform excellence, React Native for JavaScript-based apps, and native development with Kotlin and Swift.",
    skills: ["Flutter", "Dart", "React Native", "Kotlin", "Swift", "iOS", "Android", "Firebase", "Cross-Platform Development"]
  },
  {
    id: 'ai',
    title: 'AI ENGINEERING',
    color: '#a78bfa', // Violet-400
    Icon: Cpu,
    row: 2,
    category: 'ai',
    description: "Smart solutions with machine learning pipelines and AI automation. Deep learning frameworks, LLM agents, and intelligent automation tools.",
    skills: ["Python", "Jupyter Notebook", "Colab", "TensorFlow", "PyTorch", "LangChain", "Ollama", "CrewAI"]
  },
  {
    id: 'devops',
    title: 'DEVOPS & CLOUD',
    color: '#f87171', // Red-400
    Icon: Container,
    row: 2,
    category: 'ops',
    description: "CI/CD pipelines, containerization, and cloud deployment. Docker and Kubernetes orchestration, AWS cloud services, and modern deployment platforms.",
    skills: ["Docker", "Kubernetes", "Minikube", "AWS", "Render", "Vercel", "GitHub Actions", "Linux"]
  },

  // --- Row 3 ---
  {
    id: 'database',
    title: 'DATA STORAGE',
    color: '#facc15', // Yellow-400
    Icon: Database,
    row: 3,
    category: 'data',
    description: "Optimized data structures and persistent storage. SQL, NoSQL, in-memory caching, and real-time database solutions.",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase (Realtime DB/Firestore)"]
  },
  {
    id: 'testing',
    title: 'QUALITY & TESTING',
    color: '#f472b6', // Pink-400
    Icon: ShieldCheck,
    row: 3,
    category: 'test',
    description: "Ensuring reliability through rigorous testing standards. Unit testing, component testing, E2E testing, and visual regression testing.",
    skills: ["Jest", "React Testing Library", "Cypress"]
  },
];

const HexagonIntro: React.FC = () => {
  const [activeItem, setActiveItem] = useState<TechItem | null>(null);
  const [hoverNotifyVisible, setHoverNotifyVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Oswald:400,700,300|Inter:400,500,600';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleMouseEnter = (item: TechItem) => {
    setHoverNotifyVisible(false);
    setActiveItem(item);
  };

  const handleMouseLeave = () => {
    // Optional: Reset active item logic here if needed
  };

  const rows = {
    1: techData.filter(i => i.row === 1),
    2: techData.filter(i => i.row === 2),
    3: techData.filter(i => i.row === 3),
  };

  const getBadgeStyle = (color: string) => ({
    backgroundColor: 'transparent',
    color: color,
    border: `1px solid ${color}60`,
    boxShadow: `0 0 5px ${color}10`
  });

  return (
    <section className="skills-section section">
      <div className="hex-app-container">
        <div className="ambient-glow glow-1"></div>
        <div className="ambient-glow glow-2"></div>
        
        {mounted && (
        <style>{`
          /* --- Base & Reset --- */
          .hex-app-container {
            font-family: 'Inter', sans-serif;
            background: transparent;
            color: #e4e4e7;
            width: 100%;
            min-height: 100vh;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }

          /* --- Ambient Glow Orbs --- */
          .ambient-glow {
            position: absolute;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.15;
            pointer-events: none;
            z-index: 0;
          }
          .glow-1 {
            top: -20%;
            right: -10%;
            background: radial-gradient(circle, #8b5cf6, transparent 70%);
          }
          .glow-2 {
            bottom: -20%;
            left: -10%;
            background: radial-gradient(circle, #f97316, transparent 70%);
          }

          /* --- Hexagon Grid Layout --- */
          .intro-block {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 1400px;
            height: 100%;
            padding: 20px;
            z-index: 1;
          }

          .centerfold-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 60px;
            width: 100%;
          }

          .hex-master-wrap {
            position: relative;
            width: 500px;
            min-width: 500px;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px 0; 
          }

          .grid-row {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 75%;
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }
          
          .grid-row.middle-row {
            width: 100%;
            margin-top: -55px;
            z-index: 2;
          }

          .grid-row.last-row {
            width: 75%;
            margin-top: -55px;
            z-index: 1;
          }

          /* --- Hexagon Shape Construction --- */
          .hex-wrap {
            position: relative;
            width: 150px;
            height: 190px;
            margin: 0 4px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 10;
            -webkit-tap-highlight-color: transparent;
          }

          .hex-wrap:hover {
            transform: scale(1.15);
            z-index: 30 !important;
          }

          /* The Borders */
          .hex-borders > div {
            position: absolute;
            width: 100%;
            height: 88px;
            top: 46px;
            left: 0;
            border-left: 2px solid #3f3f46; 
            border-right: 2px solid #3f3f46;
            border-radius: 8px;
            z-index: 2;
            pointer-events: none;
            transition: all 0.3s ease;
            background: transparent; 
          }
          
          .hex-wrap:hover .hex-borders > div {
             border-width: 2px;
             border-color: currentColor; 
             box-shadow: 0 0 15px currentColor; 
             background: #09090b; 
          }

          .hex-border-1 { transform: rotate(0deg); }
          .hex-border-2 { transform: rotate(60deg); }
          .hex-border-3 { transform: rotate(120deg); }

          /* The Icon/Label */
          .label {
            position: absolute;
            top: 0; bottom: 0; left: 0; right: 0;
            margin: auto;
            width: 100px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 3;
            pointer-events: none;
            color: #52525b; 
            transition: color 0.3s, transform 0.3s;
          }
          
          .hex-wrap:hover .label {
            color: #fff;
            transform: scale(1.1);
            text-shadow: 0 0 10px currentColor;
          }

          /* --- Animations & Interactions --- */
          .hover-notify {
            position: absolute;
            top: -60px;
            width: 100%;
            text-align: center;
            font-family: 'Oswald', sans-serif;
            font-size: 20px;
            font-weight: 300;
            color: #52525b;
            animation: float 3s ease-in-out infinite;
            opacity: 1;
            transition: opacity 0.5s;
            pointer-events: none;
            letter-spacing: 4px;
            text-transform: uppercase;
          }
          .hover-notify.hidden {
            opacity: 0;
            animation: none;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          /* --- Description Panel --- */
          .code-display {
            width: 500px;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            position: relative;
            background: transparent;
            border-left: 1px solid rgba(255,255,255,0.1);
            padding: 40px;
            margin-left: 20px;
            overflow: hidden;
          }
          
          .expertise-label {
            font-family: 'Oswald', sans-serif;
            font-size: 1.2rem;
            color: #52525b;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 30px;
          }

          .code-description {
            width: 100%;
            min-height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }

          .code-title {
            font-family: 'Oswald', sans-serif;
            font-size: 2.8rem;
            line-height: 1.1;
            margin-bottom: 20px;
            font-weight: 700;
            transition: color 0.3s;
            text-transform: uppercase;
            letter-spacing: -1px;
            width: 100%;
            max-width: 450px;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }

          .desc-text p {
            font-size: 1.1rem;
            margin: 0 0 25px 0;
            color: #d4d4d8;
            line-height: 1.6;
            font-weight: 300;
          }
          
          .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            max-width: 450px;
            overflow: hidden;
          }
          
          .skill-badge {
            font-size: 0.8rem;
            padding: 6px 14px;
            border-radius: 4px;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: all 0.2s;
            text-transform: uppercase;
          }

          .slide-in-text {
            animation: slideRight 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
          }
          
          @keyframes slideRight {
            0% { transform: translateX(-20px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          .placeholder-text {
            color: #3f3f46;
            font-family: 'Courier New', monospace;
            font-size: 1.1rem;
            line-height: 1.6;
          }
          
          .placeholder-cursor {
             display: inline-block;
             width: 8px;
             height: 18px;
             background: #3f3f46;
             animation: blink 1s infinite;
          }
          
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

          /* --- Responsiveness --- */
          @media (max-width: 1100px) {
            .centerfold-wrap {
              flex-direction: column;
              gap: 40px;
            }
            .code-display {
              width: 90%;
              height: auto;
              align-items: center;
              text-align: center;
              padding: 30px;
              background: transparent;
              border: none;
              margin-left: 0;
              border-top: 1px solid rgba(255,255,255,0.1);
            }
            .expertise-label {
               margin-top: 20px;
            }
            .code-description {
              align-items: center;
            }
            .skills-grid {
              justify-content: center;
            }
            .hex-master-wrap {
               transform: scale(0.9);
            }
          }
          
          @media (max-width: 550px) {
            .hex-master-wrap {
               transform: scale(0.65);
               margin: -40px 0;
            }
            .code-title {
              font-size: 2.5rem;
            }
          }
        `}</style>
        )}

        {mounted && (
        <section className="intro">
          <div className="intro-block">
            <div className="centerfold-wrap">
              
              {/* --- The Hexagon Grid --- */}
              <div className="hex-master-wrap">
                <div className={`hover-notify ${!hoverNotifyVisible ? 'hidden' : ''}`}>
                  Init System...
                </div>

                {/* Row 1: Top 2 Hexes */}
                <div className="grid-row">
                  {rows[1].map((item) => (
                    <HexagonItem 
                      key={item.id} 
                      item={item} 
                      isActive={activeItem?.id === item.id}
                      onEnter={handleMouseEnter}
                      onLeave={handleMouseLeave}
                    />
                  ))}
                </div>

                {/* Row 2: Middle 3 Hexes */}
                <div className="grid-row middle-row">
                  {rows[2].map((item) => (
                    <HexagonItem 
                      key={item.id} 
                      item={item} 
                      isActive={activeItem?.id === item.id}
                      onEnter={handleMouseEnter}
                      onLeave={handleMouseLeave}
                    />
                  ))}
                </div>

                {/* Row 3: Bottom 2 Hexes */}
                <div className="grid-row last-row">
                  {rows[3].map((item) => (
                    <HexagonItem 
                      key={item.id} 
                      item={item} 
                      isActive={activeItem?.id === item.id}
                      onEnter={handleMouseEnter}
                      onLeave={handleMouseLeave}
                    />
                  ))}
                </div>
              </div>

              {/* --- The Info Panel --- */}
              <div className="code-display">
                <h3 className="expertise-label">System Modules</h3>
                <div className="code-description">
                  {activeItem ? (
                    <div key={activeItem.id} className="slide-in-text">
                      <div className="code-title" style={{ color: activeItem.color, textShadow: `0 0 20px ${activeItem.color}50` }}>
                        {activeItem.title}
                      </div>
                      <div className="desc-text">
                        <p>{activeItem.description}</p>
                        <div className="skills-grid">
                          {activeItem.skills.map(skill => (
                            <span 
                              key={skill} 
                              className="skill-badge"
                              style={getBadgeStyle(activeItem.color)}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="placeholder-text">
                      &gt; AWAITING INPUT...<br/>
                      &gt; HOVER MODULE TO SCAN<span className="placeholder-cursor"></span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
        )}
      </div>
    </section>
  );
};

// Sub-component for individual Hexagon
interface HexProps {
  item: TechItem;
  isActive: boolean;
  onEnter: (item: TechItem) => void;
  onLeave: () => void;
}

const HexagonItem: React.FC<HexProps> = ({ item, isActive, onEnter, onLeave }) => {
  const Icon = item.Icon;
  
  return (
    <div 
      className="hex-wrap"
      onMouseEnter={() => onEnter(item)}
      onMouseLeave={onLeave}
      style={{ 
        zIndex: isActive ? 30 : 10,
        color: item.color 
      } as React.CSSProperties}
    >
      <div className="hex-borders">
        <div className="hex-border-1"></div>
        <div className="hex-border-2"></div>
        <div className="hex-border-3"></div>
      </div>
      
      <div className="label">
        <Icon size={42} strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default HexagonIntro;
