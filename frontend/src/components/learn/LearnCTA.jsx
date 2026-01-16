import { Link } from 'react-router-dom';
import Button from '@/components/Button';

/**
 * CTA component for Learn Hub pages
 */
function LearnCTA({ type, to, className = '' }) {
  const variants = {
    practice: {
      label: 'Practice this skill',
      variant: 'primary',
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    community: {
      label: 'Ask the community',
      variant: 'secondary',
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    struggles: {
      label: 'View related struggles',
      variant: 'ghost',
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  };

  const config = variants[type];
  if (!config) return null;

  const buttonContent = (
    <>
      {config.icon}
      {config.label}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className}>
        <Button variant={config.variant} className="w-full">
          {buttonContent}
        </Button>
      </Link>
    );
  }

  return (
    <Button variant={config.variant} className={`w-full ${className}`}>
      {buttonContent}
    </Button>
  );
}

export default LearnCTA;
