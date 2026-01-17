/**
 * WhyThisRule Component
 * Explains the reasoning behind a rule
 */

function WhyThisRule({ explanation }) {
  if (!explanation) return null;

  return (
    <div className="bg-accent-50/50 dark:bg-accent-900/10 border border-accent-300 dark:border-accent-800 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-accent-600 dark:text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-accent-800 dark:text-accent-300 mb-1">
            Why this rule exists
          </h4>
          <p className="text-sm text-accent-900 dark:text-accent-200 leading-relaxed">
            {explanation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyThisRule;
