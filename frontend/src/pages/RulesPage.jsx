import BaseLayout from '@/layouts/BaseLayout'
import EmptyState from '@/components/EmptyState'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

function RulesPage() {
  const titleRef = useScrollAnimation({
    animationType: 'fadeIn',
    start: 'top 85%',
    duration: 0.6,
  })
  const cardRef = useScrollAnimation({
    animationType: 'slideLeft',
    start: 'top 80%',
    delay: 0.2,
    duration: 0.8,
    x: 80,
  })

  return (
    <BaseLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 
          ref={titleRef}
          className="text-3xl font-bold text-primary mb-8"
        >
          Rules
        </h1>
        <div ref={cardRef}>
          <EmptyState
            icon={
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            title="Rules documentation coming soon"
            description="Official rules, regulations, and guidelines will be available here."
          />
        </div>
      </div>
    </BaseLayout>
  )
}

export default RulesPage
