import { Skeleton } from '@/components/Skeleton';

function FeedSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-surface border border-theme rounded-lg p-6 space-y-4"
        >
          {/* Header with avatar, name, and badges */}
          <div className="flex items-center gap-3">
            <Skeleton variant="avatar" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton variant="title" className="w-32" />
                <Skeleton variant="text" className="w-20" />
              </div>
              <Skeleton variant="text" className="w-24" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-5/6" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2 border-t border-theme">
            <Skeleton variant="button" className="w-20" />
            <Skeleton variant="button" className="w-24" />
            <Skeleton variant="button" className="w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedSkeleton;
