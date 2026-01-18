import LearnCard from './LearnCard';

/**
 * Grid layout component for displaying section cards
 */
function SectionGrid({ sections, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {sections.map((section, index) => {
        // Support both old (section.id) and new (section.section_id) structures
        const sectionId = section.section_id || section.id;
        
        return (
          <LearnCard
            key={section.id}
            title={section.title}
            description={section.description}
            icon={section.icon}
            to={`/learn/${sectionId}`}
            color={section.color}
            animationDelay={index * 0.1}
          />
        );
      })}
    </div>
  );
}

export default SectionGrid;
