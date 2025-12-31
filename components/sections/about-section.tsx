"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import gsap from "gsap";

const About: React.FC = () => {
  const downloadButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = downloadButtonRef.current;
    if (!button) return;

    // Path generation functions
    const getPoint = (point: any, i: number, a: any[], smoothing: number) => {
      const cp = (current: any, previous: any, next: any, reverse: boolean) => {
        let p = previous || current,
          n = next || current,
          o = {
            length: Math.sqrt(
              Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)
            ),
            angle: Math.atan2(n[1] - p[1], n[0] - p[0]),
          },
          angle = o.angle + (reverse ? Math.PI : 0),
          length = o.length * smoothing;
        return [
          current[0] + Math.cos(angle) * length,
          current[1] + Math.sin(angle) * length,
        ];
      };
      const cps = cp(a[i - 1], a[i - 2], point, false);
      const cpe = cp(point, a[i - 1], a[i + 1], true);
      return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
    };

    const getPath = (update: number, smoothing: number, pointsNew?: any[]) => {
      let points = pointsNew
        ? pointsNew
        : [
            [4, 12],
            [12, update],
            [20, 12],
          ];
      let d = points.reduce(
        (acc: string, point: any, i: number, a: any[]) =>
          i === 0
            ? `M ${point[0]},${point[1]}`
            : `${acc} ${getPoint(point, i, a, smoothing)}`,
        ""
      );
      return `<path d="${d}" />`;
    };

    const svg = button.querySelector("svg") as SVGSVGElement | null;
    let duration = 3000;
    const svgPath: any = {
      y: 20,
      smoothing: 0,
    };

    // CSS custom properties must be strings
    button.style.setProperty("--duration", String(duration));

    // if svg is not present, abort setup
    if (!svg) return;

    // initialize svg so the arrow icon is visible before any interaction
    svg.innerHTML = getPath(svgPath.y, svgPath.smoothing, undefined);

    const handleDownloadClick = (e: Event) => {
      e.preventDefault();

      if (!button.classList.contains("loading")) {
        button.classList.add("loading");

        // GSAP animations
        gsap.to(svgPath, {
          smoothing: 0.3,
          duration: (duration * 0.065) / 1000,
          onUpdate: () => {
            svg.innerHTML = getPath(svgPath.y, svgPath.smoothing, undefined);
          },
        });

        gsap.to(svgPath, {
          y: 12,
          duration: (duration * 0.265) / 1000,
          delay: (duration * 0.065) / 1000,
          ease: "elastic.out(1, 0.4)",
          onUpdate: () => {
            svg.innerHTML = getPath(svgPath.y, svgPath.smoothing, undefined);
          },
        });

        setTimeout(() => {
          svg.innerHTML = getPath(0, 0, [
            [3, 14],
            [8, 19],
            [21, 6],
          ]);
        }, duration / 2);

        // Trigger download after animation
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = button.getAttribute("data-file") || "";
          link.download = "Gayanga_Bandara_Curriculum_Vitae.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Reset button after completion
          setTimeout(() => {
            button.classList.remove("loading");
            svgPath.y = 20;
            svgPath.smoothing = 0;
            svg.innerHTML = getPath(svgPath.y, svgPath.smoothing, undefined);
          }, 500);
        }, duration);
      }
    };

    button.addEventListener("click", handleDownloadClick);

    return () => {
      button.removeEventListener("click", handleDownloadClick);
    };
  }, []);
  return (
    <section
      id="about"
      className="about-section section text-gray-300 relative overflow-hidden"
    >
      <style>{`
        /* Enhanced responsive design for all common screen resolutions */
        .about-section .blob-container {
          width: 320px;
          height: 320px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 9999px;
          box-shadow: 0 18px 40px rgba(2,6,23,0.45);
          transition: transform 240ms ease, width 240ms ease, height 240ms ease;
        }

        .about-section .blob-container:focus { outline: 2px dashed rgba(255,255,255,0.06); }

        /* Headline scaling for all screen sizes */
        .about-section span.text-8xl {
          font-size: clamp(3.2rem, 8.8vw, 6rem);
          line-height: 0.9;
        }
        .about-section h2 {
          font-size: clamp(1.8rem, 4.6vw, 3.5rem);
        }

        /* Large Desktop (2560px+) */
        @media (min-width: 2560px) {
          .about-section .blob-container { width: 520px; height: 520px; }
          .about-section .absolute.-top-6.-right-6 { top: -28px; right: -28px; padding: 0.5rem 1rem; font-size: 0.9rem; }
          .about-section .absolute.-bottom-4.-left-6 { bottom: -24px; left: -24px; padding: 0.5rem 1rem; font-size: 0.9rem; }
        }

        /* Desktop Large (1920px - 2559px) */
        @media (min-width: 1920px) and (max-width: 2559px) {
          .about-section .blob-container { width: 480px; height: 480px; }
          .about-section .max-w-4xl { max-width: 1400px; }
        }

        /* Desktop Standard (1536px - 1919px) */
        @media (min-width: 1536px) and (max-width: 1919px) {
          .about-section .blob-container { width: 420px; height: 420px; }
          .about-section .max-w-4xl { max-width: 1200px; }
        }

        /* Desktop Small (1440px - 1535px) */
        @media (min-width: 1440px) and (max-width: 1535px) {
          .about-section .blob-container { width: 380px; height: 380px; }
          .about-section .absolute.-top-6.-right-6 { top: -20px; right: -20px; }
          .about-section .absolute.-bottom-4.-left-6 { bottom: -16px; left: -16px; }
        }

        /* Laptop (1280px - 1439px) */
        @media (min-width: 1280px) and (max-width: 1439px) {
          .about-section .blob-container { width: 360px; height: 360px; }
          .about-section .flex.flex-col.lg\:flex-row { gap: 3rem; }
        }

        /* Small Desktop (1024px - 1279px) */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .about-section .blob-container { width: 320px; height: 320px; }
          .about-section .absolute.-top-6.-right-6 { top: -16px; right: -16px; padding: 0.4rem 0.7rem; font-size: 0.8rem; }
          .about-section .absolute.-bottom-4.-left-6 { bottom: -12px; left: -16px; padding: 0.4rem 0.7rem; font-size: 0.8rem; }
          .about-section .max-w-6xl { max-width: 1000px; }
        }

        /* Tablet Landscape (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .about-section .blob-container { width: 300px; height: 300px; }
          .about-section .absolute.-top-6.-right-6 { top: -12px; right: -12px; padding: 0.35rem 0.6rem; font-size: 0.75rem; }
          .about-section .absolute.-bottom-4.-left-6 { bottom: -10px; left: -12px; padding: 0.35rem 0.6rem; font-size: 0.75rem; }
          .about-section .flex.flex-col.lg\:flex-row { flex-direction: column; gap: 2.5rem; align-items: center; }
          .about-section .max-w-6xl { max-width: 800px; }
          .about-section .text-3xl { font-size: 2.2rem; }
        }

        /* Tablet Portrait (601px - 767px) */
        @media (min-width: 601px) and (max-width: 767px) {
          .about-section .blob-container { width: 280px; height: 280px; }
          .about-section .flex.flex-col.items-center { padding: 20px 16px; }
          .about-section .text-lg { font-size: 1rem; }
          .about-section .max-w-6xl { max-width: 700px; padding: 0 1.5rem; }
        }

        /* Large Mobile (480px - 600px) */
        @media (min-width: 480px) and (max-width: 600px) {
          .about-section .blob-container { width: 260px; height: 260px; }
          .about-section .absolute.-top-6.-right-6 { top: -8px; right: -8px; font-size: 0.7rem; }
          .about-section .absolute.-bottom-4.-left-6 { bottom: -8px; left: -8px; font-size: 0.7rem; }
          .about-section .max-w-4xl { padding-left: 12px; padding-right: 12px; }
          .about-section .mt-8 { margin-top: 1.5rem; }
          .about-section .text-3xl { font-size: 1.9rem; }
          .about-section .max-w-xl { max-width: 500px; }
        }

        /* Small Mobile (320px - 479px) */
        @media (max-width: 479px) {
          .about-section .blob-container { width: 220px; height: 220px; }
          .about-section .absolute.-top-6.-right-6 { top: -6px; right: -6px; font-size: 0.65rem; padding: 0.25rem 0.5rem; }
          .about-section .absolute.-bottom-4.-left-6 { bottom: -6px; left: -6px; font-size: 0.65rem; padding: 0.25rem 0.5rem; }
          .about-section .max-w-4xl { padding-left: 8px; padding-right: 8px; }
          .about-section .mt-8 { margin-top: 1.25rem; }
          .about-section .text-3xl { font-size: 1.6rem; }
          .about-section .text-lg { font-size: 0.95rem; }
          .about-section .flex-wrap.gap-4 { gap: 8px; }
          .about-section .max-w-xl { max-width: 400px; }
          .about-section .gap-12 { gap: 1.5rem; }
        }

        /* Landscape Mobile Optimization */
        @media (max-height: 500px) and (orientation: landscape) {
          .about-section .blob-container { width: 200px; height: 200px; }
          .about-section .flex.flex-col.lg\:flex-row { flex-direction: row; gap: 2rem; }
          .about-section .max-w-6xl { max-width: 1200px; }
        }

        /* iframe modal sizing improvements */
        .about-section iframe {
          min-height: 50vh;
          max-height: 90vh;
          border-radius: 6px;
        }

        /* social icons spacing and hit area for touch */
        .about-section .social-icons a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: rgba(255,255,255,0.02);
        }

        /* Ensure buttons / labels do not reflow badly */
        .about-section .flex-wrap.gap-4 { gap: clamp(8px, 2.2vw, 16px); }

        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .about-section .blob-container {
            box-shadow: 0 20px 50px rgba(2,6,23,0.5);
          }
        }
      `}</style>
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl -z-10"></div>
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"></div>
          <span className="text-8xl md:text-[10rem] font-extrabold bg-gradient-to-r from-white/10 via-white/5 to-white/2 bg-clip-text text-transparent select-none tracking-tighter">
            ABOUT ME
          </span>
          <h2 className="absolute text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-gray-300 capitalize">
            About Me
          </h2>
        </div>
        <div className="flex items-center gap-4 my-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/50"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-purple-500/70"></div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/50"></div>
        </div>
        <p className="text-base md:text-lg tracking-wider text-gray-300 uppercase max-w-md text-center font-light mb-2">
          MORE ABOUT ME
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-between max-w-6xl mx-auto p-6 gap-12 lg:gap-20">
        <div className="relative order-2 lg:order-1 flex-shrink-0">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-violet-500/20 to-orange-500/20 blur-lg -z-10"></div>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500/30 to-orange-500/30 -z-10"></div>
            <div
              className="blob-container"
              style={{ backgroundImage: "url('image/about.png')" }}
            ></div>
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-violet-600 to-violet-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              Software Engineer
            </div>
            <div className="absolute -bottom-4 -left-6 bg-golden-gradient text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              B.Sc. Student
            </div>
          </div>
        </div>
        <div className="lg:text-left text-center order-1 lg:order-2 max-w-xl flex-1">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Hey! I'm{" "}
            <span className="relative">
              <span className="text-golden-gradient font-bold">
                Gayanga Bandara
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 rounded-full bg-golden-gradient"></span>
            </span>
          </h3>
          <p className="text-lg leading-7 mb-5 text-gray-200">
            Final-year B.Sc. Software Engineering undergraduate passionate about
            creating intuitive and impactful digital experiences. I specialize
            in Full-Stack Development and enjoy exploring modern technologies
            that make applications smarter, faster, and more user-friendly.
          </p>
          <p className="text-lg leading-7 mb-8 text-gray-200">
            My approach combines clean, scalable engineering with practical
            problem-solving — from building dynamic frontend interfaces to
            developing reliable backend systems. I focus on delivering solutions
            that are efficient, user-centered, and ready for real-world use.
          </p>
          {/* Mobile-only shorter version */}
          <p className="mobile-about-text block md:hidden">
            Final-year Software Engineering undergraduate specializing in Full-Stack Development. I combine clean engineering with practical problem-solving to build intuitive frontends and reliable backends, delivering efficient, user-centered solutions.
          </p>
          <div className="mb-8 what-i-do-section">
            <h4 className="text-xl font-semibold mb-4 text-white">What I Do</h4>
            <div className="flex flex-wrap gap-4 justify-start">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 640 512"
                  className="text-violet-400"
                  height="1em"
                  width="1em"
                >
                  <path d="M255.03 261.65c6.25 6.25 16.38 6.25 22.63 0l11.31-11.31c6.25-6.25 6.25-16.38 0-22.63L253.25 192l35.71-35.72c6.25-6.25 6.25-16.38 0-22.63l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0l-58.34 58.34c-6.25 6.25-6.25 16.38 0 22.63l58.35 58.34zm96.01-11.3l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l58.34-58.34c6.25-6.25 6.25-16.38 0-22.63l-58.34-58.34c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63L386.75 192l-35.71 35.72c-6.25 6.25-6.25 16.38 0 22.63zM624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z"></path>
                </svg>
                <span>Frontend Development</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 640 512"
                  className="text-orange-400"
                  height="1em"
                  width="1em"
                >
                  <path d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"></path>
                </svg>
                <span>Backend Development</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 640 512"
                  className="text-green-400"
                  height="1em"
                  width="1em"
                >
                  <path d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"></path>
                </svg>
                <span>AI & Machine Learning</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 640 512"
                  className="text-blue-400"
                  height="1em"
                  width="1em"
                >
                  <path d="M592 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h512v288z"></path>
                </svg>
                <span>Database & Storage</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">
              Connect With Me
            </h4>
            <div className="flex justify-start gap-4 mt-4">
              <div className="social-icons">
                <a
                  href="https://github.com/gayangabandara"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/gayanga-bandara/"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#contact" aria-label="Email">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 justify-start">
            <a
              ref={downloadButtonRef}
              href="/pdf/Gayanga_Bandara_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="button min-h-[48px] touch-manipulation"
              data-file="/pdf/Gayanga_Bandara_CV.pdf"
            >
              <ul>
                <li>Resume</li>
                <li>Downloading</li>
                <li>Open File</li>
              </ul>
              <div>
                <svg viewBox="0 0 24 24"></svg>
              </div>
            </a>

            <Dialog>
              <DialogTrigger asChild>
                <button className="download-button-small flex items-center gap-2">
                  <Eye size={18} />
                  Preview
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full overflow-hidden">
                <DialogHeader>
                  <DialogTitle>Gayanga Bandara — Curriculum Vitae</DialogTitle>
                  <DialogDescription>
                    Preview of resume. Use the download button below to save a
                    copy.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                  <iframe
                    src="/pdf/Gayanga Bandara curriculum vitae.pdf"
                    className="w-full h-[70vh] sm:h-[80vh] border rounded-md"
                    title="Resume Preview"
                  />
                </div>

                <DialogFooter>
                  <a
                    href="/pdf/Gayanga Bandara curriculum vitae.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="download-button-small"
                  >
                    Download
                  </a>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
