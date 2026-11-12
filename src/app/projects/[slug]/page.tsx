import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProjectDetail from '@/components/project/ProjectDetail'
import { projects, getProjectBySlug } from '@/data/projects'

const detailed = projects.filter((p) => p.details)

// Only the known project slugs are valid; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return detailed.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project?.details) return {}

  const title = `${project.title} — Case Study | Sonam Jaiswal`
  const description = `${project.details.tagline} ${project.details.inSimpleWords ?? project.description}`.slice(0, 300)
  return {
    title,
    description,
    keywords: [project.title, project.details.category, ...project.tech],
    openGraph: { title, description, type: 'article', ...(project.image ? { images: [project.image] } : {}) },
  }
}

export default async function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params
  const index = detailed.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()

  // Wrap around so every case study links to both a previous and a next project.
  const count = detailed.length
  const prev = count > 1 ? detailed[(index - 1 + count) % count] : undefined
  const next = count > 2 || (count === 2 && index === 0) ? detailed[(index + 1) % count] : undefined

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-30 min-h-screen overflow-hidden">
        <ProjectDetail project={detailed[index]} prev={prev} next={next} />
      </main>
      <Footer />
    </>
  )
}
