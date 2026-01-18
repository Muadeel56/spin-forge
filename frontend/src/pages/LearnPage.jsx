import { useState, useEffect } from 'react';
import BaseLayout from '@/layouts/BaseLayout';
import PageTransition from '@/components/PageTransition';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SectionGrid from '@/components/learn/SectionGrid';
import FeedSkeleton from '@/components/feed/FeedSkeleton';
import EmptyState from '@/components/EmptyState';
import learningService from '@/services/learningService';

function LearnPage() {
  const [learnSections, setLearnSections] = useState([]);
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

  const gridRef = useScrollAnimation({
    animationType: 'slideUp',
    start: 'top 75%',
    delay: 0.4,
    duration: 0.8,
  });

  useEffect(() => {
    const fetchLearnSections = async () => {
      try {
        setLoading(true);
        const data = await learningService.getLearnSections();
        const sectionsData = data.results || data;
        setLearnSections(sectionsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching learning sections:', err);
        setError('Failed to load learning content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLearnSections();
  }, []);

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
              title="Error Loading Content"
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
            Learn Hub
          </h1>
          <p 
            ref={descriptionRef}
            className="text-lg text-secondary max-w-3xl leading-relaxed"
          >
            Master table tennis fundamentals, techniques, and strategies. 
            Structured learning content designed for all skill levels, from complete beginners to advanced players.
          </p>
        </div>

        {/* Sections Grid */}
        <div ref={gridRef}>
          {learnSections.length > 0 ? (
            <SectionGrid sections={learnSections} />
          ) : (
            <EmptyState
              title="No Learning Content Available"
              message="Learning content is being updated. Please check back soon."
            />
          )}
        </div>
        </div>
      </PageTransition>
    </BaseLayout>
  );
}

export default LearnPage;
