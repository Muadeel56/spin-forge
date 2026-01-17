import { useParams, Navigate } from 'react-router-dom'
import BaseLayout from '@/layouts/BaseLayout'
import PageTransition from '@/components/PageTransition'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Breadcrumb from '@/components/learn/Breadcrumb'
import TopicCard from '@/components/learn/TopicCard'
import { getSection } from '@/constants/learnContent'

function SectionPage() {
  const { section: sectionId } = useParams()
  const section = getSection(sectionId)

  const headerRef = useScrollAnimation({
    animationType: 'fadeIn',
    start: 'top 85%',
    duration: 0.6,
  })

  const topicsRef = useScrollAnimation({
    animationType: 'slideUp',
    start: 'top 80%',
    delay: 0.2,
    duration: 0.8,
  })

  if (!section) {
    return <Navigate to="/learn" replace />
  }

  const breadcrumbItems = [
    { label: 'Learn', to: '/learn' },
    { label: section.title, to: `/learn/${section.id}` },
  ]

  return (
    <BaseLayout>
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={breadcrumbItems} />

        {/* Section Header */}
        <div ref={headerRef} className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl" aria-hidden="true">
              {section.icon}
            </span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {section.title}
              </h1>
              <p className="text-lg text-secondary max-w-3xl">
                {section.description}
              </p>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div ref={topicsRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.topics.map((topic, index) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                sectionId={section.id}
                animationDelay={index * 0.1}
              />
            ))}
          </div>
        </div>
        </div>
      </PageTransition>
    </BaseLayout>
  )
}

export default SectionPage
