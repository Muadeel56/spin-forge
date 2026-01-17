import { useEffect, useRef } from 'react'
import { motion, useSpring, useTransform, useInView } from 'framer-motion'
import { sportyEasing } from './HoverEffects'

/**
 * StatMotion Component
 * Animated count-up number display that triggers on viewport entry
 * Perfect for scores, metrics, and performance indicators
 * 
 * @param {Object} props
 * @param {number} props.value - The target number to count up to
 * @param {number} props.from - Starting value (default: 0)
 * @param {number} props.duration - Animation duration in seconds (default: auto-calculated)
 * @param {number} props.decimals - Number of decimal places (default: 0)
 * @param {string} props.prefix - Text to display before the number
 * @param {string} props.suffix - Text to display after the number
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.formatValue - Custom formatter function
 * @param {boolean} props.triggerOnce - Only animate once (default: true)
 * @param {string} props.ease - Easing function name (default: 'sharp')
 */
function StatMotion({
  value = 0,
  from = 0,
  duration,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  formatValue,
  triggerOnce = true,
  ease = 'sharp',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: triggerOnce, margin: '-50px' })
  const hasAnimated = useRef(false)

  // Check for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Calculate duration based on value difference if not provided
  const calculatedDuration = duration || Math.min(2, Math.max(0.5, Math.abs(value - from) / 100))

  // Create spring animation
  const spring = useSpring(from, {
    damping: 30,
    stiffness: 100,
    duration: calculatedDuration * 1000,
  })

  // Transform spring value to rounded number
  const display = useTransform(spring, (latest) => {
    const rounded = decimals > 0 
      ? latest.toFixed(decimals)
      : Math.round(latest)
    
    if (formatValue) {
      return formatValue(rounded)
    }
    
    return rounded.toString()
  })

  // Trigger animation when in view
  useEffect(() => {
    if (prefersReducedMotion) {
      // Instant value for reduced motion
      spring.set(value)
      return
    }

    if (isInView && !hasAnimated.current) {
      spring.set(value)
      hasAnimated.current = true
    } else if (!isInView && !triggerOnce) {
      // Reset if not triggerOnce and out of view
      spring.set(from)
      hasAnimated.current = false
    }
  }, [isInView, value, from, spring, triggerOnce, prefersReducedMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {prefersReducedMotion ? (
        // Show final value immediately for reduced motion
        formatValue ? formatValue(value) : value.toFixed(decimals)
      ) : (
        <motion.span>{display}</motion.span>
      )}
      {suffix}
    </span>
  )
}

/**
 * SimpleStatMotion Component
 * Simpler count-up animation using Framer Motion variants
 * Good for smaller numbers or simpler use cases
 * 
 * @param {Object} props
 * @param {number} props.value - The number to display
 * @param {string} props.prefix - Text before number
 * @param {string} props.suffix - Text after number
 * @param {string} props.className - Additional classes
 */
export function SimpleStatMotion({ value, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const variants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: sportyEasing.sharp,
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {prefix}
      {value}
      {suffix}
    </motion.span>
  )
}

/**
 * PercentageStat Component
 * Specialized stat display for percentages
 * 
 * @param {Object} props
 * @param {number} props.value - Percentage value (0-100)
 * @param {string} props.className - Additional classes
 */
export function PercentageStat({ value, className = '' }) {
  return (
    <StatMotion
      value={value}
      from={0}
      decimals={1}
      suffix="%"
      className={className}
      duration={1.2}
    />
  )
}

/**
 * CounterStat Component
 * For whole number counts (posts, matches, etc.)
 * 
 * @param {Object} props
 * @param {number} props.value - Count value
 * @param {string} props.label - Label text (pluralized automatically)
 * @param {string} props.className - Additional classes
 */
export function CounterStat({ value, label, className = '' }) {
  const pluralLabel = value === 1 ? label : `${label}s`
  
  return (
    <div className={className}>
      <StatMotion
        value={value}
        from={0}
        decimals={0}
        className="text-2xl font-bold text-primary"
        duration={1}
      />
      <p className="text-sm text-secondary mt-1">{pluralLabel}</p>
    </div>
  )
}

export default StatMotion
