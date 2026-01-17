/**
 * MythBadge Component
 * Highlights myth-busting entries
 */

function MythBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-bold mb-3">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      MYTH BUSTED
    </div>
  );
}

export default MythBadge;
