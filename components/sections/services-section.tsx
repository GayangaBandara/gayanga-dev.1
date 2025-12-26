"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Layout, Smartphone, Palette } from "lucide-react"; // Importing Lucide icons
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Service Data with specialized icons
const servicesData = [
  {
    id: "01",
    title: "Full-Stack Development",
    description:
      "Develop and maintain scalable, high-quality web applications with a strong focus on reliability and user experience. Skilled in building modern React and Next.js interfaces, implementing backend services with Node.js, and designing structured PostgreSQL databases. Committed to clean code practices, performance optimization, and secure authentication mechanisms.",
    icon: Layout,
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
    color: "text-blue-400",
  },
  {
    id: "02",
    title: "AI-Driven Development",
    description:
      "Build intelligent application features by applying machine learning and natural language processing techniques. Experienced in developing chatbot systems, sentiment analysis workflows, and data-driven automation using Python-based frameworks, with a focus on accuracy, performance, and responsible AI integration.",
    icon: Brain,
    tags: ["Python", "NLP", "TensorFlow", "Flask", "FastAPI"],
    color: "text-purple-400",
  },
  {
    id: "03",
    title: "Mobile Apps Development",
    description:
      "Design and develop cross-platform mobile applications with Flutter, focusing on performance, usability, and maintainable architecture. Experienced in implementing real-time data synchronization, authentication, and cloud-backed features to deliver native-like experiences on both Android and iOS.",
    icon: Smartphone,
    tags: ["Flutter", "Dart", "Firebase | Supabase", "REST APIs"],
    color: "text-green-400",
  },
  {
    id: "04",
    title: "Interactive UI/UX",
    description:
      "Craft visually engaging and interactive user interfaces with a strong focus on motion, responsiveness, and user experience. Experienced in building custom animations and immersive visual effects using modern web technologies, moving beyond static layouts to create dynamic, intuitive interfaces.",
    icon: Palette,
    tags: ["Tailwind CSS", "CSS3", "GSAP", "Three.js", "WebGL", "Framer Motion"],
    color: "text-orange-400",
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = React.useState(false);

  // Framer Motion Scroll Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax Transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]); // Background text moves opposite
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3D Background Effect (optimized)
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.offsetWidth / canvas.offsetHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    // Set initial size and cap pixel ratio to avoid excessive GPU work
    const setRendererSize = () => {
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    setRendererSize();

    // Adapt particle count to device capability (avoid overloading low-end devices)
    const cpuCores = typeof navigator !== "undefined" && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4;
    const particlesCount = Math.max(6, Math.min(20, Math.floor(cpuCores * 2)));

    // Abstract Geometry Particles
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0xFFD700,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });

    const particles = new THREE.InstancedMesh(geometry, material, particlesCount);

    const dummy = new THREE.Object3D();
    const positions: { x: number; y: number; z: number; speed: number }[] = [];

    for (let i = 0; i < particlesCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10 - 5;
      positions.push({ x, y, z, speed: Math.random() * 0.02 });
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      particles.setMatrixAt(i, dummy.matrix);
    }

    scene.add(particles);
    camera.position.z = 10;

    // Animation control flags and ids
    let animationId: number | null = null;
    let running = false;

    // Animation function (minimised per-frame work)
    const animateFrame = () => {
      // schedule next frame first so we can exit early in cleanup
      animationId = requestAnimationFrame(animateFrame);

      const time = performance.now() * 0.001; // single time read per frame

      // slow global rotation
      particles.rotation.y += 0.002;

      // Update instanced matrices
      for (let i = 0; i < particlesCount; i++) {
        const { x, y, z, speed } = positions[i];
        dummy.position.set(
          x + Math.sin(time * speed) * 1,
          y + Math.cos(time * speed) * 1,
          z
        );
        dummy.rotation.x = time * speed;
        dummy.updateMatrix();
        particles.setMatrixAt(i, dummy.matrix);
      }
      particles.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const startAnimation = () => {
      if (running) return;
      running = true;
      if (animationId == null) animationId = requestAnimationFrame(animateFrame);
    };

    const stopAnimation = () => {
      running = false;
      if (animationId != null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    // Visibility handling: pause animation when not visible to save CPU
    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) startAnimation();
      else stopAnimation();
    }, { root: null, threshold: 0 });

    if (canvasRef.current) {
      io.observe(canvasRef.current);
    }

    const onVisibilityChange = () => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") startAnimation();
      else stopAnimation();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Resize handling with ResizeObserver to keep sizes accurate and avoid expensive window resize events
    const ro = new ResizeObserver(() => {
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
      setRendererSize();
    });
    ro.observe(canvas);

    // Scroll handler for light parallax effect (keeps work minimal)
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollPercent = 1 - rect.bottom / (window.innerHeight + rect.height);
        // small, cheap updates only
        particles.rotation.z = scrollPercent * 0.5;
        particles.rotation.x = scrollPercent * 0.2;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Start animation if visible initially
    if (typeof document !== "undefined" && document.visibilityState === "visible") startAnimation();

    // Cleanup
    return () => {
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", handleScroll);
      stopAnimation();

      // Proper disposal of three.js objects to avoid memory leaks
      scene.remove(particles);
      try {
        particles.geometry.dispose();
        // material may be reused elsewhere; defend with try/catch
        (particles.material as THREE.Material).dispose();
      } catch (e) {
        // ignore disposal errors in some environments
      }

      renderer.dispose();
    };
  }, [mounted]);

  return (
    <section
      ref={containerRef}
      id="services"
      className="services-section relative min-h-screen py-24 overflow-hidden"
    >
      {/* 3D Background Layer */}
      {mounted && (
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      )}

      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sticky Header Section */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit space-y-8">
            <motion.div style={{ y: y1, opacity }}>
              <Badge
                variant="outline"
                className="mb-4 text-purple-400 border-purple-500/30"
              >
                What I Do
              </Badge>
              <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 leading-tight">
                My <br /> Services
              </h2>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-md">
                I help brands and startups design and develop digital products that are visually refined, technically sound, and built for real-world use.
              </p>

              <div className="mt-12 hidden lg:block">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="w-12 h-px bg-gray-800"></span>
                  SCROLL TO EXPLORE
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scrolling Cards Section */}
          <div className="lg:w-2/3 grid gap-6 items-start">
              {servicesData.map((service, index) => {
              const Icon = service.icon;
              const accentBg = service.color.replace("text-", "bg-") + "/10";
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full"
                >
                  <Card className="group relative overflow-hidden bg-white/5 border-2 border-accent/20 backdrop-blur-sm hover:bg-white/10 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-purple-500/15 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="p-8 flex flex-col md:flex-row gap-6 md:items-start">
                      {/* Icon Box */}
                      <div className="shrink-0 relative">
                        <div className={`absolute left-0 top-6 bottom-6 w-[2px] rounded-r ${accentBg} opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none`} aria-hidden="true" />
                        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border-2 border-accent/20 group-hover:scale-105 group-hover:bg-accent/20 transition-all duration-300 p-1">
                          <Icon className={`w-6 h-6 ${service.color} transition-transform duration-300`} />
                        </span>
                      </div>

                      {/* Content */}
                      <div className="space-y-4 flex-1 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 group-hover:translate-x-1 transition-all duration-300">
                            {service.title}
                          </h3>
                          <span className="text-4xl font-bold text-white/5 select-none group-hover:text-white/10 transition-colors duration-300">
                            {service.id}
                          </span>
                        </div>

                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                          {service.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {service.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-black/40 text-zinc-300 text-[11px] px-2 py-0.5 rounded-full border border-white/5 group-hover:bg-purple-500/10 group-hover:text-white transition-all duration-300"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

