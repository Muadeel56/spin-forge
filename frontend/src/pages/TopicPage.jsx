import { useParams, Navigate } from 'react-router-dom'
import BaseLayout from '@/layouts/BaseLayout'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Breadcrumb from '@/components/learn/Breadcrumb'
import TopicContent from '@/components/learn/TopicContent'
import TopicNavigation from '@/components/learn/TopicNavigation'
import { 
  getSection, 
  getTopic, 
  getAdjacentTopics,
  getRelatedTopics 
} from '@/constants/learnContent'

function TopicPage() {
  const { section: sectionId, topic: topicId } = useParams()
  const section = getSection(sectionId)
  const topic = getTopic(sectionId, topicId)
  const { prev, next } = getAdjacentTopics(sectionId, topicId)
  const relatedTopics = getRelatedTopics(sectionId, topicId)

  const headerRef = useScrollAnimation({
    animationType: 'fadeIn',
    start: 'top 85%',
    duration: 0.6,
  })

  const contentRef = useScrollAnimation({
    animationType: 'slideUp',
    start: 'top 80%',
    delay: 0.2,
    duration: 0.8,
  })

  if (!section || !topic) {
    return <Navigate to="/learn" replace />
  }

  const breadcrumbItems = [
    { label: 'Learn', to: '/learn' },
    { label: section.title, to: `/learn/${section.id}` },
    { label: topic.title, to: `/learn/${section.id}/${topic.id}` },
  ]

  // Enhance topic with related topic details
  const enhancedTopic = {
    ...topic,
    relatedTopics: relatedTopics.map(rt => ({
      id: rt.id,
      title: rt.title,
      sectionId: rt.sectionId,
      sectionTitle: rt.sectionTitle,
    })),
  }

  return (
    <BaseLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={breadcrumbItems} />

        {/* Topic Header */}
        <div ref={headerRef} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {topic.title}
          </h1>
          {topic.description && (
            <p className="text-lg text-secondary leading-relaxed">
              {topic.description}
            </p>
          )}
        </div>

        {/* Topic Content */}
        <div ref={contentRef}>
          <TopicContent topic={enhancedTopic} sectionId={sectionId} />
        </div>

        {/* Navigation */}
        <TopicNavigation 
          prevTopic={prev} 
          nextTopic={next} 
          sectionId={sectionId} 
        />
      </div>
    </BaseLayout>
  )
}

export default TopicPage
