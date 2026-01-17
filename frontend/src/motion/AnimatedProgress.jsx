import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { sportyEasing } from './HoverEffects'

/**
 * AnimatedProgress Component
 * Smooth progress bar animation that triggers on viewport entry
 * Perfect for skill ratings, completion percentages, and performance metrics
 * 
 * @param {Object} props
 * @param {number} props.value - Progress value (0-100 for percentage, or raw value)
 * @param {number} props.max - Maximum value (default: 100)
 * @param {string} props.className - Container classes
 * @param {string} props.barClassName - Progress bar classes
 * @param {string} props.trackClassName - Track (background) classes
 * @param {number} props.height - Bar height in pixels (default: 8)
 * @param {number} props.duration - Animation duration in seconds (default: 0.8)
 * @param {boolean} props.showLabel - Show percentage label (default: false)
 * @param {string} props.label - Custom label text
 * @param {Function} props.getColor - Function to determine color based on value
 * @param {boolean} props.triggerOnce - Only animate once (default: true)
 * @param {number} props.delay - Animation delay in seconds (default: 0)
 */
function AnimatedProgress({
  value = 0,
  max = 100,
  className = '',
  barClassName = '',
  trackClassName = 'bg-tertiary',
  height = 8,
  duration = 0.8,
  showLabel = false,
  label,
  getColor,
  triggerOnce = true,
  delay = 0,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: triggerOnce, margin: '-50px' })

  // Check for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  // Default color function
  const defaultGetColor = (val) => {
    if (val >= 80) return 'bg-primary-600'
    if (val >= 50) return 'bg-primary-500'
    return 'bg-primary-400'
  }

  const colorClass = getColor ? getColor(percentage) : defaultGetColor(percentage)
  const combinedBarClassName = `${colorClass} ${barClassName}`.trim()

  // Animation variants
  const variants = {
    hidden: { width: '0%' },
    visible: {
      width: `${percentage}%`,
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        ease: sportyEasing.sharp,
        delay: prefersReducedMotion ? 0 : delay,
      },
    },
  }

  return (
    <div className={className}>
      {/* Label */}
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-secondary">{label}</span>}
          {showLabel && (
            <span className="text-sm font-semibold text-primary">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div
        ref={ref}
        className={`w-full ${trackClassName} rounded-full overflow-hidden`}
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <motion.div
          className={`h-full rounded-full ${combinedBarClassName}`}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
        />
      </div>
    </div>
  )
}

/**
 * SkillProgress Component
 * Specialized progress bar for skill ratings (1-10 scale)
 * 
 * @param {Object} props
 * @param {string} props.skillName - Name of the skill
 * @param {number} props.rating - Skill rating (1-10)
 * @param {string} props.className - Additional classes
 * @param {number} props.delay - Animation delay
 */
export function SkillProgress({ skillName, rating, className = '', delay = 0 }) {
  const getSkillColor = (percentage) => {
    const ratingValue = (percentage / 100) * 10
    if (ratingValue >= 8) return 'bg-primary-600'
    if (ratingValue >= 5) return 'bg-primary-500'
    return 'bg-primary-400'
  }

  return (
    <AnimatedProgress
      value={rating}
      max={10}
      label={skillName}
      showLabel={true}
      getColor={getSkillColor}
      className={className}
      height={8}
      duration={0.8}
      delay={delay}
      triggerOnce={true}
    />
  )
}

/**
 * ComparisonProgress Component
 * Shows two progress bars for comparison (e.g., wins vs losses)
 * 
 * @param {Object} props
 * @param {number} props.value1 - First value
 * @param {number} props.value2 - Second value
 * @param {string} props.label1 - First label
 * @param {string} props.label2 - Second label
 * @param {string} props.color1 - First bar color class
 * @param {string} props.color2 - Second bar color class
 * @param {string} props.className - Container classes
 */
export function ComparisonProgress({
  value1,
  value2,
  label1,
  label2,
  color1 = 'bg-primary-600',
  color2 = 'bg-accent-600',
  className = '',
}) {
  const total = value1 + value2
  const percentage1 = total > 0 ? (value1 / total) * 100 : 0
  const percentage2 = total > 0 ? (value2 / total) * 100 : 0

  return (
    <div className={className}>
      {/* Labels */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color1}`} />
          <span className="text-sm text-secondary">{label1}</span>
          <span className="text-sm font-semibold text-primary">{value1}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-primary">{value2}</span>
          <span className="text-sm text-secondary">{label2}</span>
          <div className={`w-3 h-3 rounded-full ${color2}`} />
        </div>
      </div>

      {/* Dual Progress Bar */}
      <div className="flex w-full h-2 rounded-full overflow-hidden bg-tertiary">
        <AnimatedProgress
          value={percentage1}
          max={100}
          barClassName={color1}
          trackClassName="bg-transparent"
          height={8}
          duration={0.8}
          delay={0}
        />
        <AnimatedProgress
          value={percentage2}
          max={100}
          barClassName={color2}
          trackClassName="bg-transparent"
          height={8}
          duration={0.8}
          delay={0.2}
        />
      </div>
    </div>
  )
}

/**
 * StaggeredProgressList Component
 * Renders multiple progress bars with staggered animations
 * 
 * @param {Object} props
 * @param {Array} props.items - Array of { label, value, max } objects
 * @param {number} props.staggerDelay - Delay between each bar (default: 0.1)
 * @param {string} props.className - Container classes
 * @param {Function} props.getColor - Color function
 */
export function StaggeredProgressList({
  items = [],
  staggerDelay = 0.1,
  className = '',
  getColor,
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <AnimatedProgress
          key={item.label || index}
          value={item.value}
          max={item.max || 100}
          label={item.label}
          showLabel={true}
          getColor={getColor}
          delay={index * staggerDelay}
          duration={0.8}
        />
      ))}
    </div>
  )
}

export default AnimatedProgress
