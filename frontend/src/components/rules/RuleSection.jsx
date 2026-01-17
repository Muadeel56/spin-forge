import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import RuleCard from './RuleCard';

/**
 * RuleSection Component
 * Groups related rules together with a section header
 */
function RuleSection({ section }) {
  const headerRef = useScrollAnimation({
    animationType: 'fadeIn',
    start: 'top 85%',
    duration: 0.6,
  });

  const colorClasses = {
    primary: 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10',
    accent: 'border-accent-500 bg-accent-50/50 dark:bg-accent-900/10',
  };

  const borderColor = colorClasses[section.color] || colorClasses.primary;

  return (
    <section id={section.id} className="scroll-mt-24 mb-12">
      {/* Section Header */}
      <div
        ref={headerRef}
        className={`border-l-4 pl-6 py-4 mb-6 ${borderColor}`}
      >
        <div className="flex items-center gap-3 mb-2">
          {section.icon && (
            <span className="text-3xl" aria-hidden="true">
              {section.icon}
            </span>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            {section.title}
          </h2>
        </div>
        <p className="text-secondary leading-relaxed">
          {section.description}
        </p>
      </div>

      {/* Rules Grid */}
      <div className="space-y-4">
        {section.rules.map((rule, index) => (
          <RuleCard
            key={rule.id}
            rule={rule}
            animationDelay={0.1 * (index + 1)}
          />
        ))}
      </div>
    </section>
  );
}

export default RuleSection;
