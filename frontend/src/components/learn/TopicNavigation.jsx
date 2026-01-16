import { Link } from 'react-router-dom';
import Button from '@/components/Button';

/**
 * Next/Previous topic navigation component
 */
function TopicNavigation({ prevTopic, nextTopic, sectionId }) {
  if (!prevTopic && !nextTopic) return null;

  return (
    <div className="mt-12 pt-8 border-t border-theme">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {prevTopic ? (
          <Link 
            to={`/learn/${sectionId}/${prevTopic.id}`}
            className="flex-1"
          >
            <Button variant="secondary" className="w-full justify-start">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-tertiary">Previous</div>
                <div className="font-medium">{prevTopic.title}</div>
              </div>
            </Button>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextTopic ? (
          <Link 
            to={`/learn/${sectionId}/${nextTopic.id}`}
            className="flex-1"
          >
            <Button variant="secondary" className="w-full justify-end">
              <div className="text-right">
                <div className="text-xs text-tertiary">Next</div>
                <div className="font-medium">{nextTopic.title}</div>
              </div>
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
}

export default TopicNavigation;
