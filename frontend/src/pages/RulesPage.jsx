import { Link } from 'react-router-dom';
import BaseLayout from '@/layouts/BaseLayout';
import PageTransition from '@/components/PageTransition';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import RuleSection from '@/components/rules/RuleSection';
import RulesNavigation from '@/components/rules/RulesNavigation';
import { rulesSections } from '@/constants/rulesContent';

function RulesPage() {
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
            {rulesSections.map((section) => (
              <RuleSection key={section.id} section={section} />
            ))}

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
