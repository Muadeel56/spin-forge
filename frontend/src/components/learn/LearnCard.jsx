import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CardMotion from '@/motion/CardMotion';

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
      <CardMotion
        ref={cardRef}
        className={`bg-surface border-2 rounded-lg p-6 ${borderColor}`}
        intensity="medium"
        enableShadow={true}
      >
        <div className="flex items-start gap-4">
          {icon && (
            <div 
              className="text-3xl shrink-0 transition-transform duration-200 group-hover:scale-110" 
              aria-hidden="true"
            >
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
      </CardMotion>
    </Link>
  );
}

export default LearnCard;
