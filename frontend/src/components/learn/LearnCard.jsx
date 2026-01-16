import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/**
 * Card component for displaying learning sections or topics
 */
function LearnCard({ 
  title, 
  description, 
  icon, 
  to, 
  color = 'primary',
  animationDelay = 0,
  className = '' 
}) {
  const cardRef = useScrollAnimation({
    animationType: 'slideUp',
    start: 'top 85%',
    delay: animationDelay,
    duration: 0.6,
  });

  const colorClasses = {
    primary: 'border-primary-500 hover:border-primary-600 bg-primary-50/50 dark:bg-primary-900/10',
    accent: 'border-accent-500 hover:border-accent-600 bg-accent-50/50 dark:bg-accent-900/10',
  };

  const borderColor = colorClasses[color] || colorClasses.primary;

  return (
    <Link to={to} className={`block ${className}`}>
      <div
        ref={cardRef}
        className={`bg-surface border-2 rounded-lg p-6 transition-all duration-200 hover:shadow-lg ${borderColor}`}
      >
        <div className="flex items-start gap-4">
          {icon && (
            <div className="text-3xl flex-shrink-0" aria-hidden="true">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-primary mb-2">
              {title}
            </h3>
            {description && (
              <p className="text-secondary text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default LearnCard;
