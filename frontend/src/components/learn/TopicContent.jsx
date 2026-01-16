import { Link } from 'react-router-dom';
import LearnCTA from './LearnCTA';

/**
 * Component for displaying topic content with tips, mistakes, and related topics
 */
function TopicContent({ topic, sectionId }) {
  // Convert markdown-style content to display
  const formatContent = (content) => {
    if (!content) return null;
    
    const parts = [];
    const lines = content.split('\n');
    let currentParagraph = [];
    let inList = false;
    
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      // Heading with **
      if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length > 4) {
        // Close previous paragraph/list
        if (currentParagraph.length > 0) {
          if (inList) {
            parts.push(
              <ul key={`list-${parts.length}`} className="list-disc list-inside space-y-2 text-secondary mb-4 ml-4">
                {currentParagraph.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          } else {
            parts.push(
              <p key={`p-${parts.length}`} className="mb-4 text-secondary leading-relaxed">
                {currentParagraph}
              </p>
            );
          }
          currentParagraph = [];
          inList = false;
        }
        
        // Add heading
        const headingText = trimmed.replace(/\*\*/g, '');
        parts.push(
          <h4 key={`h-${parts.length}`} className="text-lg font-semibold text-primary mb-3 mt-6 first:mt-0">
            {headingText}
          </h4>
        );
      }
      // List item
      else if (trimmed.startsWith('-')) {
        if (!inList && currentParagraph.length > 0) {
          // Close previous paragraph
          parts.push(
            <p key={`p-${parts.length}`} className="mb-4 text-secondary leading-relaxed">
              {currentParagraph}
            </p>
          );
          currentParagraph = [];
        }
        inList = true;
        currentParagraph.push(trimmed.replace(/^-\s*/, ''));
      }
      // Regular text line
      else if (trimmed.length > 0) {
        if (inList) {
          // Close list
          parts.push(
            <ul key={`list-${parts.length}`} className="list-disc list-inside space-y-2 text-secondary mb-4 ml-4">
              {currentParagraph.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
          currentParagraph = [];
          inList = false;
        }
        currentParagraph.push(trimmed);
      }
      // Empty line
      else {
        if (currentParagraph.length > 0) {
          if (inList) {
            parts.push(
              <ul key={`list-${parts.length}`} className="list-disc list-inside space-y-2 text-secondary mb-4 ml-4">
                {currentParagraph.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          } else {
            parts.push(
              <p key={`p-${parts.length}`} className="mb-4 text-secondary leading-relaxed">
                {currentParagraph.join(' ')}
              </p>
            );
          }
          currentParagraph = [];
          inList = false;
        }
      }
    });
    
    // Handle remaining content
    if (currentParagraph.length > 0) {
      if (inList) {
        parts.push(
          <ul key={`list-${parts.length}`} className="list-disc list-inside space-y-2 text-secondary mb-4 ml-4">
            {currentParagraph.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      } else {
        parts.push(
          <p key={`p-${parts.length}`} className="mb-4 text-secondary leading-relaxed">
            {currentParagraph.join(' ')}
          </p>
        );
      }
    }
    
    return parts;
  };

  return (
    <div className="space-y-8">
      {/* Main Content */}
      <div className="prose prose-sm max-w-none">
        <div className="text-secondary whitespace-pre-wrap leading-relaxed">
          {formatContent(topic.content)}
        </div>
      </div>

      {/* Key Tips */}
      {topic.keyTips && topic.keyTips.length > 0 && (
        <div className="bg-accent-50/50 dark:bg-accent-900/10 border border-accent-200 dark:border-accent-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Key Tips
          </h3>
          <ul className="space-y-2">
            {topic.keyTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-secondary">
                <span className="text-accent-600 mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Common Mistakes */}
      {topic.commonMistakes && topic.commonMistakes.length > 0 && (
        <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Common Mistakes
          </h3>
          <ul className="space-y-2">
            {topic.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start gap-2 text-secondary">
                <span className="text-red-600 mt-1">•</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Topics */}
      {topic.relatedTopics && topic.relatedTopics.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">Related Topics</h3>
          <div className="flex flex-wrap gap-2">
            {topic.relatedTopics.map((related) => {
              const relatedId = typeof related === 'string' ? related : related.id;
              const relatedTitle = typeof related === 'string' ? related : related.title;
              const relatedSectionId = typeof related === 'object' ? related.sectionId : null;
              
              if (relatedSectionId) {
                return (
                  <Link
                    key={relatedId}
                    to={`/learn/${relatedSectionId}/${relatedId}`}
                    className="inline-block px-4 py-2 bg-tertiary hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg text-sm text-secondary hover:text-primary transition-colors"
                  >
                    {relatedTitle}
                  </Link>
                );
              }
              
              return (
                <span
                  key={relatedId}
                  className="inline-block px-3 py-1 bg-tertiary rounded-full text-sm text-secondary"
                >
                  {relatedId}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* CTAs */}
      {topic.ctas && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topic.ctas.practice && (
            <LearnCTA type="practice" to="/" />
          )}
          {topic.ctas.community && (
            <LearnCTA type="community" to="/" />
          )}
          {topic.ctas.struggles && (
            <LearnCTA type="struggles" to="/" />
          )}
        </div>
      )}
    </div>
  );
}

export default TopicContent;
