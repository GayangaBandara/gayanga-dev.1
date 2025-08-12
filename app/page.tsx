import HeroSection from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <HeroSection />
      <AboutSection />
    </main>
  )
}
