import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Timeline } from '@/components/Timeline'
import { Projects } from '@/components/Projects'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { SectionDivider } from '@/components/SectionDivider'

export function MainPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Timeline />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
