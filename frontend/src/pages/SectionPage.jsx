import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import BaseLayout from '@/layouts/BaseLayout'
import PageTransition from '@/components/PageTransition'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Breadcrumb from '@/components/learn/Breadcrumb'
import TopicCard from '@/components/learn/TopicCard'
import FeedSkeleton from '@/components/feed/FeedSkeleton'
import EmptyState from '@/components/EmptyState'
import learningService from '@/services/learningService'

function SectionPage() {
  const { section: sectionId } = useParams()
  const [section, setSection] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  useEffect(() => {
    const fetchSection = async () => {
      try {
        setLoading(true)
        const data = await learningService.getSectionDetail(sectionId)
        setSection(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching section:', err)
        setError('Failed to load section. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchSection()
  }, [sectionId])

  if (loading) {
    return (
      <BaseLayout>
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <FeedSkeleton />
          </div>
        </PageTransition>
      </BaseLayout>
    )
  }

  if (error || !section) {
    return (
      <BaseLayout>
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <EmptyState
              title="Section Not Found"
              message={error || 'The requested section could not be found.'}
              actionLabel="Back to Learn Hub"
              onAction={() => window.location.href = '/learn'}
            />
          </div>
        </PageTransition>
      </BaseLayout>
    )
  }

  const breadcrumbItems = [
    { label: 'Learn', to: '/learn' },
    { label: section.title, to: `/learn/${section.section_id}` },
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
          {section.topics && section.topics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.topics.map((topic, index) => (
                <TopicCard
                  key={topic.topic_id}
                  topic={topic}
                  sectionId={section.section_id}
                  animationDelay={index * 0.1}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Topics Available"
              message="Topics for this section are being updated. Please check back soon."
            />
          )}
        </div>
        </div>
      </PageTransition>
    </BaseLayout>
  )
}

export default SectionPage
