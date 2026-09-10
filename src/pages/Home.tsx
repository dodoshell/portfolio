import { AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

import { Nav } from '@/components/layout/Nav'
import { ProjectOverlay } from '@/components/project/ProjectOverlay'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Timeline } from '@/components/sections/Timeline'
import { projects } from '@/content/projects'

const PROJECT_ROUTE = /^\/projects\/([^/]+)\/?$/

export default function Home(): React.JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()

  const slug = location.pathname.match(PROJECT_ROUTE)?.[1]
  const activeProject = projects.find((project) => project.slug === slug)

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <AnimatePresence>
        {activeProject && (
          <ProjectOverlay key={activeProject.slug} project={activeProject} onClose={() => navigate('/')} />
        )}
      </AnimatePresence>
    </>
  )
}
