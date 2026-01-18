import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '@/layouts/BaseLayout';
import PageTransition from '@/components/PageTransition';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import RuleSection from '@/components/rules/RuleSection';
import RulesNavigation from '@/components/rules/RulesNavigation';
import FeedSkeleton from '@/components/feed/FeedSkeleton';
import EmptyState from '@/components/EmptyState';
import learningService from '@/services/learningService';

function RulesPage() {
  const [rulesSections, setRulesSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const titleRef = useScrollAnimation({
    animationType: 'fadeIn',
    start: 'top 85%',
    duration: 0.6,
  });

  const descriptionRef = useScrollAnimation({
    animationType: 'slideUp',
    start: 'top 80%',
    delay: 0.2,
    duration: 0.8,
  });

  const ctaRef = useScrollAnimation({
    animationType: 'slideUp',
    start: 'top 80%',
    delay: 0.3,
    duration: 0.8,
  });

  useEffect(() => {
    const fetchRules = async () => {
      try {
        setLoading(true);
        const data = await learningService.getRules();
        
        // Group rules by category to create sections
        const rulesData = data.results || data;
        const sectionsMap = {};
        
        rulesData.forEach(rule => {
          if (!sectionsMap[rule.category]) {
            sectionsMap[rule.category] = {
              id: rule.category,
              title: getCategoryTitle(rule.category),
              description: getCategoryDescription(rule.category),
              icon: getCategoryIcon(rule.category),
              color: rule.is_myth ? 'primary' : 'accent',
              priority: rule.priority,
              rules: []
            };
          }
          
          // Transform rule to match component structure
          sectionsMap[rule.category].rules.push({
            id: rule.rule_id,
            title: rule.title,
            description: rule.description,
            legal: {
              text: rule.legal_text,
              details: rule.legal_details
            },
            illegal: {
              text: rule.illegal_text,
              details: rule.illegal_details
            },
            whyThisRule: rule.why_this_rule,
            category: rule.category,
            mythBusting: rule.is_myth,
            relatedRules: []
          });
        });
        
        const sections = Object.values(sectionsMap).sort((a, b) => b.priority - a.priority);
        setRulesSections(sections);
        setError(null);
      } catch (err) {
        console.error('Error fetching rules:', err);
        setError('Failed to load rules. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, []);

  const getCategoryTitle = (category) => {
    const titles = {
      serving: 'Serving Rules',
      scoring: 'Scoring System',
      format: 'Match Format',
      fault: 'Common Faults',
      myth: 'Myths & Misconceptions'
    };
    return titles[category] || category;
  };

  const getCategoryDescription = (category) => {
    const descriptions = {
      serving: 'Master the legal serve requirements and avoid common violations',
      scoring: 'Understand how points are scored and games are won',
      format: 'Learn about match structures, side changes, and game procedures',
      fault: 'Recognize faults and violations that cost you points',
      myth: 'Debunk common table tennis myths and clarify confusing rules'
    };
    return descriptions[category] || '';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      serving: '🏓',
      scoring: '🎯',
      format: '📋',
      fault: '⚠️',
      myth: '💡'
    };
    return icons[category] || '📚';
  };

  if (loading) {
    return (
      <BaseLayout>
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <FeedSkeleton />
          </div>
        </PageTransition>
      </BaseLayout>
    );
  }

  if (error) {
    return (
      <BaseLayout>
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <EmptyState
              title="Error Loading Rules"
              message={error}
              actionLabel="Try Again"
              onAction={() => window.location.reload()}
            />
          </div>
        </PageTransition>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            Rules & Legality
          </h1>
          <p
            ref={descriptionRef}
            className="text-lg text-secondary max-w-3xl leading-relaxed mb-6"
          >
            Your complete guide to table tennis rules. Clear explanations, visual examples,
            and myth-busting to help you play confidently and fairly. No jargon, just
            straightforward answers to your rule questions.
          </p>

          {/* Quick CTA Bar */}
          <div ref={ctaRef} className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Ask the Community
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface hover:bg-tertiary border border-theme text-secondary hover:text-primary rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              View Related Struggles
            </Link>
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface hover:bg-tertiary border border-theme text-secondary hover:text-primary rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Practice Drills
            </Link>
          </div>
        </div>

        {/* Main Content with Sidebar Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Main Rules Content */}
          <div className="min-w-0">
            {rulesSections.length > 0 ? (
              rulesSections.map((section) => (
                <RuleSection key={section.id} section={section} />
              ))
            ) : (
              <EmptyState
                title="No Rules Available"
                message="Rules content is being updated. Please check back soon."
              />
            )}

            {/* Bottom CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border border-theme rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-primary mb-3">
                Still Have Questions?
              </h2>
              <p className="text-secondary mb-6 max-w-2xl mx-auto">
                The SpinForge community is here to help. Ask your rule questions, share
                situations you've encountered, or help others understand the game better.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/">
                  <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
                    Join the Discussion
                  </button>
                </Link>
                <Link to="/learn">
                  <button className="px-6 py-3 bg-surface hover:bg-tertiary border-2 border-theme text-primary rounded-lg font-medium transition-colors">
                    Explore Learning Hub
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Navigation - Desktop */}
          <aside className="hidden lg:block">
            <RulesNavigation sections={rulesSections} />
          </aside>
        </div>

        {/* Mobile Navigation - Floating Button */}
        <div className="lg:hidden">
          <RulesNavigation sections={rulesSections} />
        </div>
        </div>
      </PageTransition>
    </BaseLayout>
  );
}

export default RulesPage;
