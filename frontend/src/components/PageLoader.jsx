import LoadingSpinner from './LoadingSpinner'

function PageLoader({ message = 'Loading...' }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <LoadingSpinner size="xl" />
      <p className="mt-4 text-secondary">{message}</p>
    </div>
  )
}

export default PageLoader
