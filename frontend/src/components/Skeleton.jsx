function Skeleton({ className = '', variant = 'text' }) {
  const variants = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-32 w-full',
    button: 'h-10 w-24',
  }

  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${variants[variant]} ${className}`}
    />
  )
}

function SkeletonCard() {
  return (
    <div className="bg-surface border border-theme rounded-lg p-4 space-y-4">
      <div className="flex items-center space-x-3">
        <Skeleton variant="avatar" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="title" className="w-1/3" />
          <Skeleton variant="text" className="w-1/4" />
        </div>
      </div>
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-5/6" />
      <Skeleton variant="text" className="w-4/6" />
    </div>
  )
}

export { Skeleton, SkeletonCard }
export default Skeleton
