"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type Skill = {
  category: string;
  items: string[];
  codeLines: string[];
};

const skills: Skill[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "GSAP", "Three.js"],
    codeLines: ["const UI = () => <Hero />", "useGSAP(() => animate())", "export default UI"],
  },
  {
    category: "Backend",
    items: ["Node.js", "FastAPI", "Flask", "PostgreSQL", "Supabase"],
    codeLines: ["app.get('/api', handler)", "return res.json({ ok: true })", "db.query('SELECT * FROM users')"],
  },
  {
    category: "Mobile",
    items: ["Flutter", "Dart", "Firebase"],
    codeLines: ["Widget build(BuildContext ctx) {", "  return const Scaffold()", "}"],
  },
  {
    category: "AI / ML",
    items: ["Python", "NLP", "TensorFlow"],
    codeLines: ["import tensorflow as tf", "model.fit(x_train, y_train)", "pred = model(x)"],
  },
];

type SkillCardHandle = {
  play: () => void;
};

const SkillCard = React.forwardRef<SkillCardHandle, { skill: Skill }>(({ skill }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  // For autoplay / mobile behavior
  const playedOnceRef = useRef(false);

  // typing control
  const timersRef = useRef<number[]>([]);
  const isDesktopRef = useRef(false);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    // ✅ desktop detection (runs client-side only)
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => (isDesktopRef.current = mq.matches);
    apply();

    // safari support
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  const typeFromStart = () => {
    if (!codeRef.current) return;

    clearTimers();

    const el = codeRef.current;
    el.innerHTML = "";

    let line = 0;
    let char = 0;

    const type = () => {
      if (!codeRef.current) return;
      if (line >= skill.codeLines.length) return;

      const current = skill.codeLines[line];
      const shown = current.slice(0, char + 1);

      el.innerHTML =
        skill.codeLines
          .slice(0, line)
          .map((l) => `<div>${l}</div>`)
          .join("") + `<div class="type-cursor">${shown}</div>`;

      char++;

      if (char <= current.length) {
        timersRef.current.push(window.setTimeout(type, 22));
      } else {
        line++;
        char = 0;
        timersRef.current.push(window.setTimeout(type, 140));
      }
    };

    type();
  };

  const play = () => {
    // ✅ autoplay should be once (all devices)
    if (playedOnceRef.current) return;
    playedOnceRef.current = true;
    typeFromStart();
  };

  const onHoverStart = () => {
    // ✅ DESKTOP: always restart from beginning on hover
    if (isDesktopRef.current) {
      typeFromStart();
      return;
    }

    // ✅ MOBILE/TABLET: only first time
    if (playedOnceRef.current) return;
    playedOnceRef.current = true;
    typeFromStart();
  };

  const onHoverEnd = () => {
    // ✅ stop typing when leaving (important for desktop)
    clearTimers();
  };

  React.useImperativeHandle(ref, () => ({ play }));

  useEffect(() => {
    return () => clearTimers();
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="skill-card group p-6 bg-card/50 border border-border rounded-xl transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold">{skill.category}</h3>
          <span className="text-[10px] tracking-[0.25em] text-muted-foreground opacity-60 group-hover:opacity-100 transition">
            CODE
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {skill.items.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-secondary/50 text-sm text-muted-foreground rounded-full border border-border/40 group-hover:text-foreground transition"
            >
              {item}
            </span>
          ))}
        </div>

        <div ref={codeRef} className="mt-5 font-mono text-xs text-muted-foreground min-h-[64px]" />
      </div>
    </div>
  );
});
SkillCard.displayName = "SkillCard";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showCVModal, setShowCVModal] = useState(false);

  const cardsHandlesRef = useRef<Array<SkillCardHandle | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // ✅ autoplay when section comes into view (once)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          cardsHandlesRef.current.forEach((handle, i) => {
            if (!handle) return;
            window.setTimeout(() => handle.play(), i * 250);
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="text-accent font-mono text-sm mb-4 tracking-wider">ABOUT ME</p>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Crafting digital experiences with code & creativity
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              I am a Full-Stack Developer, AI enthusiast, and Mobile App creator with a passion for building scalable,
              high-quality digital products.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Currently focused on blending thoughtful design with robust engineering to build high-performance,
              immersive experiences.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="social-media">
                <Link href="https://github.com/GayangaBandara" target="_blank" className="social-btn" aria-label="GitHub">
                  <i className="fab fa-github" />
                </Link>

                <Link
                  href="https://linkedin.com/in/gayanga-bandara"
                  target="_blank"
                  className="social-btn"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in" />
                </Link>

                <Link href="https://x.com/Gayanga20" target="_blank" className="social-btn" aria-label="X">
                  <i className="fa-brands fa-x-twitter" />
                </Link>

                <Link
                  href="https://www.reddit.com/user/Consistent_City2925/"
                  target="_blank"
                  className="social-btn"
                  aria-label="Reddit"
                >
                  <i className="fab fa-reddit" />
                </Link>
              </div>

              <div className="cv-actions">
                <button onClick={() => setShowCVModal(true)} className="cv-btn" aria-label="Preview CV">
                  <i className="fas fa-eye" />
                  <span>Preview CV</span>
                </button>

                <a href="/pdf/Gayanga_Bandara_CV.pdf" download className="cv-btn" aria-label="Download CV">
                  <i className="fas fa-download" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="text-accent font-mono text-sm mb-6 tracking-wider">WHAT I DO</p>

            <div className="grid sm:grid-cols-2 gap-6">
              {skills.map((skill, idx) => (
                <SkillCard
                  key={skill.category}
                  skill={skill}
                  ref={(h) => {
                    cardsHandlesRef.current[idx] = h;
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {showCVModal && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowCVModal(false)}
        >
          <div
            className="relative bg-background rounded-xl border border-border shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border bg-card/50">
              <h3 className="text-xl font-semibold">CV Preview</h3>
              <button
                onClick={() => setShowCVModal(false)}
                className="w-10 h-10 rounded-full bg-secondary/50 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Close CV"
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>

            <div className="overflow-auto h-[calc(90vh-80px)]">
              <iframe src="/pdf/Gayanga_Bandara_CV.pdf" className="w-full h-full min-h-[600px]" title="CV Preview" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
