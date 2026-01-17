import { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ExamplePair from './ExamplePair';
import WhyThisRule from './WhyThisRule';
import MythBadge from './MythBadge';

/**
 * RuleCard Component
 * Accordion-style expandable card for individual rules
 */
function RuleCard({ rule, animationDelay = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  const cardRef = useScrollAnimation({
    animationType: 'slideUp',
    start: 'top 85%',
    delay: animationDelay,
    duration: 0.6,
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand();
    }
  };

  return (
    <div
      ref={cardRef}
      className="bg-surface border border-theme rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
    >
      {/* Card Header - Always Visible */}
      <button
        onClick={toggleExpand}
        onKeyDown={handleKeyDown}
        className="w-full text-left p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
        aria-expanded={isExpanded}
        aria-controls={`rule-content-${rule.id}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {rule.mythBusting && <MythBadge />}
            <h3 className="text-lg font-semibold text-primary mb-2">
              {rule.title}
            </h3>
            <p className="text-sm text-secondary leading-relaxed">
              {rule.description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <svg
              className={`w-6 h-6 text-secondary transition-transform duration-200 ${
                isExpanded ? 'transform rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Card Content - Expandable */}
      <div
        id={`rule-content-${rule.id}`}
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : '0px',
        }}
      >
        <div className="px-5 pb-5 pt-2 border-t border-theme-light">
          {/* Legal/Illegal Examples */}
          <ExamplePair legal={rule.legal} illegal={rule.illegal} />

          {/* Why This Rule */}
          <WhyThisRule explanation={rule.whyThisRule} />

          {/* Related Rules */}
          {rule.relatedRules && rule.relatedRules.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-primary mb-2">Related Rules</h4>
              <div className="flex flex-wrap gap-2">
                {rule.relatedRules.map((relatedId) => (
                  <span
                    key={relatedId}
                    className="inline-block px-3 py-1 bg-tertiary rounded-full text-xs text-secondary"
                  >
                    {relatedId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RuleCard;
