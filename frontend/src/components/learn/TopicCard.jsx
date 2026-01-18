import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/**
 * Card component for individual topics within a section
 */
function TopicCard({ 
  topic, 
  sectionId, 
  animationDelay = 0,
  className = '' 
}) {
  const cardRef = useScrollAnimation({
    animationType: 'slideUp',
    start: 'top 85%',
    delay: animationDelay,
    duration: 0.6,
  });

  // Support both old (topic.id) and new (topic.topic_id) structures
  const topicId = topic.topic_id || topic.id;

  return (
    <Link 
      to={`/learn/${sectionId}/${topicId}`} 
      className={`block ${className}`}
    >
      <div
        ref={cardRef}
        className="bg-surface border border-theme rounded-lg p-5 transition-all duration-200 hover:shadow-md hover:border-primary-500"
      >
        <h3 className="text-lg font-semibold text-primary mb-2">
          {topic.title}
        </h3>
        {topic.description && (
          <p className="text-secondary text-sm leading-relaxed">
            {topic.description}
          </p>
        )}
      </div>
    </Link>
  );
}

export default TopicCard;
