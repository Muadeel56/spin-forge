import BaseLayout from '@/layouts/BaseLayout'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import SectionGrid from '@/components/learn/SectionGrid'
import { learnSections } from '@/constants/learnContent'

function LearnPage() {
  const titleRef = useScrollAnimation({
    animationType: 'fadeIn',
    start: 'top 85%',
    duration: 0.6,
  })
  
  const descriptionRef = useScrollAnimation({
    animationType: 'slideUp',
    start: 'top 80%',
    delay: 0.2,
    duration: 0.8,
  })

  const gridRef = useScrollAnimation({
    animationType: 'slideUp',
    start: 'top 75%',
    delay: 0.4,
    duration: 0.8,
  })

  return (
    <BaseLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            Learn Hub
          </h1>
          <p 
            ref={descriptionRef}
            className="text-lg text-secondary max-w-3xl leading-relaxed"
          >
            Master table tennis fundamentals, techniques, and strategies. 
            Structured learning content designed for all skill levels, from complete beginners to advanced players.
          </p>
        </div>

        {/* Sections Grid */}
        <div ref={gridRef}>
          <SectionGrid sections={learnSections} />
        </div>
      </div>
    </BaseLayout>
  )
}

export default LearnPage
