import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/**
 * Reusable wrapper component for animated sections
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {string} props.animationType - Type of animation (default: 'slideUp')
 * @param {string} props.start - ScrollTrigger start position (default: "top 80%")
 * @param {boolean} props.once - Whether to animate only once (default: true)
 * @param {number} props.duration - Animation duration in seconds (default: 0.8)
 * @param {string} props.ease - GSAP easing function (default: "power2.out")
 * @param {number} props.delay - Animation delay in seconds (default: 0)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
function AnimatedSection({
  children,
  animationType = 'slideUp',
  start = 'top 80%',
  once = true,
  duration = 0.8,
  ease = 'power2.out',
  delay = 0,
  className = '',
  style = {},
  ...props
}) {
  const ref = useScrollAnimation({
    animationType,
    start,
    once,
    duration,
    ease,
    delay,
  });

  return (
    <div ref={ref} className={className} style={style} {...props}>
      {children}
    </div>
  );
}

export default AnimatedSection;
