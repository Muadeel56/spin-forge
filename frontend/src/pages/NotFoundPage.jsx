import { Link } from 'react-router-dom'
import BaseLayout from '@/layouts/BaseLayout'
import PageTransition from '@/components/PageTransition'
import Button from '@/components/Button'

function NotFoundPage() {
  return (
    <BaseLayout>
      <PageTransition>
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-primary mb-2">Page Not Found</h2>
        <p className="text-secondary mb-8 text-center max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
        </div>
      </PageTransition>
    </BaseLayout>
  )
}

export default NotFoundPage
