/**
 * ExamplePair Component
 * Displays legal and illegal examples side by side
 */

function ExamplePair({ legal, illegal }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Legal Example */}
      <div className="bg-green-50/50 dark:bg-green-900/10 border-2 border-green-500 dark:border-green-700 rounded-lg p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
              ✓ LEGAL
            </h4>
            <p className="text-sm text-green-900 dark:text-green-200 font-medium mb-2">
              {legal.text}
            </p>
            {legal.details && (
              <p className="text-xs text-green-700 dark:text-green-400 leading-relaxed">
                {legal.details}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Illegal Example */}
      <div className="bg-red-50/50 dark:bg-red-900/10 border-2 border-red-500 dark:border-red-700 rounded-lg p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2">
              ✗ ILLEGAL
            </h4>
            <p className="text-sm text-red-900 dark:text-red-200 font-medium mb-2">
              {illegal.text}
            </p>
            {illegal.details && (
              <p className="text-xs text-red-700 dark:text-red-400 leading-relaxed">
                {illegal.details}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamplePair;
