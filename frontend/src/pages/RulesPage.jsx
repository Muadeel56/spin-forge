import BaseLayout from '@/layouts/BaseLayout'
import EmptyState from '@/components/EmptyState'

function RulesPage() {
  return (
    <BaseLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Rules</h1>
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
    </BaseLayout>
  )
}

export default RulesPage
