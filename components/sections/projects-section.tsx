"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink, Maximize2, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  tech: string[];
  demo?: string;
  github?: string;
  video?: string;
  featured?: boolean;
};

// Modern Video Card Component with Hover Autoplay
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hover behavior (desktop): play preview muted
  const handleMouseEnter = () => {
    setIsHovering(true);
    // Attempt play; some browsers block autoplay - this is best-effort
    videoRef.current
      ?.play()
      .catch((e) => console.log("Autoplay prevented:", e));
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="group relative overflow-hidden border-white/10 bg-black/40 backdrop-blur-md hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 h-full flex flex-col will-change-transform hover:scale-[1.01]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Media Container (larger for improved UX) */}
        <div className="relative w-full overflow-hidden bg-gray-900 rounded-t-lg h-56 md:h-72 lg:h-96">
          {/*
            Prioritize video preview playback (muted, loop) using the provided `project.video` MP4.
            Use `project.image` as the poster/fallback for mobile and when not hovering.
          */}
          {project.video ? (
            <>
              {mounted && (
                <video
                  ref={videoRef}
                  src={project.video}
                  muted
                  loop
                  playsInline
                  poster={project.image}
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                    isHovering ? "opacity-100" : "opacity-0"
                  }`}
                  preload="metadata"
                />
              )}

              {/* Poster / fallback when not playing */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isHovering ? "opacity-0" : "opacity-100"
                }`}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-gray-400">
                    No preview
                  </div>
                )}
              </div>

              {/* Make media clickable to open modal (no play icon overlay) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => project.video && setOpen(true)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && project.video)
                    setOpen(true);
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-transparent cursor-pointer"
                aria-label={
                  project.video ? `Open ${project.title} video` : undefined
                }
              />

              {/* Modal for full playback */}
              {open && mounted && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  role="dialog"
                  aria-modal="true"
                >
                  <div
                    className="absolute inset-0 bg-black/70"
                    onClick={() => setOpen(false)}
                  />
                  <div className="relative max-w-6xl w-full rounded-md overflow-hidden shadow-2xl bg-black z-10">
                    <div className="w-full bg-black aspect-video max-h-[80vh]">
                      <video
                        src={project.video}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-3 flex justify-end">
                      <button
                        onClick={() => setOpen(false)}
                        className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-white"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="relative w-full h-full">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />

          {/* Floating Badge for Category */}
          {project.subtitle && (
            <div className="absolute top-3 left-3">
              <Badge
                variant="secondary"
                className="bg-black/60 backdrop-blur-md text-white border-white/20 text-xs font-light tracking-wide"
              >
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
              <Badge
                variant="outline"
                className="border-white/10 text-gray-500 text-[10px] px-2 h-5"
              >
                +{project.tech.length - 4}
              </Badge>
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
            <Button
              asChild
              size="sm"
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 border-0"
            >
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
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-white/20 bg-white/5 hover:bg-white/10 text-white shrink-0"
                  >
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
  );
}

export default function ProjectsSection(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showAll, setShowAll] = useState(false);

  // Keep your existing 3D Background Logic
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.offsetWidth / canvas.offsetHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setClearColor(0x000000, 0);

    // Simplified elegant cubes
    const projectData = [
      { color: 0x8b5cf6, position: { x: -4, y: 0, z: 0 } }, // Violet
      { color: 0x3b82f6, position: { x: 0, y: 0, z: 0 } }, // Blue
      { color: 0xec4899, position: { x: 4, y: 0, z: 0 } }, // Pink
    ];

    const cubes: THREE.Mesh[] = [];

    projectData.forEach((data) => {
      const geometry = new THREE.IcosahedronGeometry(1.5, 0); // Changed to Icosahedron for more "tech" look
      const material = new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.15,
        wireframe: true,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(data.position.x, data.position.y, data.position.z);
      cubes.push(cube);
      scene.add(cube);
    });

    camera.position.z = 8;

    const animate = () => {
      requestAnimationFrame(animate);
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.002;
        cube.rotation.y += 0.003;
        // Gentle floating
        cube.position.y = Math.sin(Date.now() * 0.001 + index * 2) * 0.5;
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  const projects: Project[] = [
    {
      id: "safe-space",
      title: "SafeSpace Ecosystem",
      subtitle: "AI HealthTech",
      description:
        "Academic Research final year Project, Award-winning platform connecting patients and doctors with real-time AI-driven sentiment analysis.",
      image: "image/safespace.png",
      tech: ["Flutter", "React", "TypeScript", "Python", "FastAPI"],
      demo: "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/SafeSpace.mp4",
      github: "https://github.com/GayangaBandara/Final_Year_Project.git",
      video:
        "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/SafeSpace.mp4",
    },
    {
      id: "master-designer",
      title: "Master Designer v2",
      subtitle: "Interactive 3D web application",
      description:
        "Immersive web platform engineered with WebGL/Three.js for the All-Island Design Competition.",
      image: "image/master.png",
      tech: ["Three.js", "WebGL", "GSAP", "React"],
      demo: "https://master-designer-v2-0.vercel.app/",
      github: "https://github.com/GayangaBandara/Master-Designer-v2.0.git",
      video:
        "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/Untitled%20video%20-%20Made%20with%20Clipchamp%20(1).mp4",
    },
    {
      id: "Serandib-Games",
      title: "Serandib Games Blog",
      subtitle: "Blog Platform",
      description:
        "A cloud-based gaming blog with a user-friendly interface, Firebase authentication, and a real-time trained chatbot for interactive user engagement.",
      image: "image/serandib.png",
      tech: ["javascript", "HTML 5", "CSS", "Chatbot", "Firbase"],
      demo: "https://serendib-games-blog.vercel.app/",
      github: "https://github.com/GayangaBandara/Serendib-Games-Blog.git",
      video:
        "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/Untitled%20video%20-%20Made%20with%20Clipchamp%20(4).mp4",
    },
    {
      id: "finance-tracker",
      title: "finance tracker",
      subtitle: "Tracking Finances",
      description:
        "Track expenses, manage budgets, and gain insights into your spending habits with our comprehensive finance tracking solution.",
      image: "image/finance-tracker.png",
      tech: [
        "React",
        "React Router DOM",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "Supabase",
        "PostgreSQL",
        "Chart.js",
        "React Chartjs 2",
        "Recharts",
        "React Hook Form",
        "Yup",
        "Axios",
        "Date-fns",
        "Lucide React",
        "jsPDF",
        "html2canvas",
        "xlsx",
        "docx",
        "Groq AI",
        "ESLint",
        "Prettier",
        "Vitest",
        "TypeScript",
        "Husky",
        "lint-staged",
      ],
      demo: "https://smart-finance-tracker-nu.vercel.app/",
      github: "https://github.com/GayangaBandara/smart-finance-tracker",
      video:
        "https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/finance%20tracker.mp4",
    },

    {
      id: "serendib-games",
      title: "Serendib Games",
      subtitle: "Content Platform",
      description:
        "Cloud-based gaming hub featuring a fully responsive UI and intelligent chatbot automation.",
      image: "/projects/serendib.png",
      tech: ["React", "Node.js", "AWS", "MongoDB"],
      demo: "#",
      github: "#",
      video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    {
      id: "ecommerce-platform",
      title: "Nexus Commerce",
      subtitle: "Full-Stack",
      description:
        "Scalable architecture with microservices, handling thousands of products with AI recommendations.",
      image: "/projects/ecommerce.png",
      tech: ["NestJS", "PostgreSQL", "Docker", "Redis"],
      demo: "#",
      github: "#",
      video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
  ];

  return (
    <section
      id="projects"
      className="projects-section section text-gray-300 relative overflow-hidden"
    >
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
            <Badge
              variant="outline"
              className="border-purple-500/30 text-purple-400 mb-4 px-4 py-1.5 rounded-full text-sm"
            >
              Projects
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white"
          >
            Selected{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Works
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A curated collection of projects pushing the boundaries of Web
            Development, AI, and User Experience.
          </motion.p>
        </div>

        {/* Projects Grid: show 2x2 on larger screens (first 4 projects) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {projects.slice(0, 4).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Optional: quick link to view more projects */}
        <div className="mt-8 text-center">
          <Button
            asChild
            size="sm"
            className="bg-white/5 hover:bg-white/10 text-white"
          >
            <Link href="#">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
