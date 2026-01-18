import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import BaseLayout from '@/layouts/BaseLayout'
import PageTransition from '@/components/PageTransition'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Breadcrumb from '@/components/learn/Breadcrumb'
import TopicContent from '@/components/learn/TopicContent'
import TopicNavigation from '@/components/learn/TopicNavigation'
import FeedSkeleton from '@/components/feed/FeedSkeleton'
import EmptyState from '@/components/EmptyState'
import learningService from '@/services/learningService'

function TopicPage() {
  const { section: sectionId, topic: topicId } = useParams()
  const [section, setSection] = useState(null)
  const [topic, setTopic] = useState(null)
  const [adjacentTopics, setAdjacentTopics] = useState({ prev: null, next: null })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        setLoading(true)
        
        // Fetch topic details and section details in parallel
        const [topicData, sectionData] = await Promise.all([
          learningService.getTopicDetail(topicId),
          learningService.getSectionDetail(sectionId)
        ])
        
        setTopic(topicData)
        setSection(sectionData)
        
        // Calculate adjacent topics (prev/next)
        if (sectionData && sectionData.topics) {
          const currentIndex = sectionData.topics.findIndex(t => t.topic_id === topicId)
          if (currentIndex !== -1) {
            setAdjacentTopics({
              prev: currentIndex > 0 ? sectionData.topics[currentIndex - 1] : null,
              next: currentIndex < sectionData.topics.length - 1 ? sectionData.topics[currentIndex + 1] : null
            })
          }
        }
        
        setError(null)
      } catch (err) {
        console.error('Error fetching topic:', err)
        setError('Failed to load topic. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchTopicData()
  }, [sectionId, topicId])

  if (loading) {
    return (
      <BaseLayout>
        <PageTransition>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <FeedSkeleton />
          </div>
        </PageTransition>
      </BaseLayout>
    )
  }

  if (error || !topic || !section) {
    return (
      <BaseLayout>
        <PageTransition>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <EmptyState
              title="Topic Not Found"
              message={error || 'The requested topic could not be found.'}
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
    { label: topic.title, to: `/learn/${section.section_id}/${topic.topic_id}` },
  ]

  // Enhance topic with related topic details from API
  const enhancedTopic = {
    ...topic,
    relatedTopics: topic.related_topics || [],
  }

  return (
    <BaseLayout>
      <PageTransition>
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
          prevTopic={adjacentTopics.prev} 
          nextTopic={adjacentTopics.next} 
          sectionId={section.section_id} 
        />
        </div>
      </PageTransition>
    </BaseLayout>
  )
}

export default TopicPage
