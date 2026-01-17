import { motion } from 'framer-motion'
import { cardHover, cardPress, cardFocus, shadowBloom, focusRing } from './HoverEffects'

/**
 * CardMotion Component
 * Wrapper component that provides premium micro-interactions for card elements
 * Includes hover lift, shadow bloom, focus glow, and press feedback
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.intensity - Hover intensity: 'subtle' | 'medium' | 'prominent'
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Disable interactions
 * @param {Function} props.onClick - Click handler
 * @param {string} props.as - HTML element type (default: 'div')
 * @param {boolean} props.enableShadow - Enable shadow bloom effect (default: true)
 * @param {Object} props.initial - Initial animation state
 * @param {Object} props.animate - Animate state
 * @param {Object} props.exit - Exit animation state
 * @param {Object} props...rest - Additional props passed to motion component
 */
function CardMotion({
  children,
  intensity = 'medium',
  className = '',
  disabled = false,
  onClick,
  as = 'div',
  enableShadow = true,
  initial,
  animate,
  exit,
  ...rest
}) {
  const MotionComponent = motion[as] || motion.div

  // Build className with shadow if enabled
  const shadowClasses = enableShadow
    ? `${shadowBloom.base} hover:${shadowBloom.hover} ${shadowBloom.transition}`
    : ''

  // Combine all classes
  const combinedClassName = `${className} ${shadowClasses} ${focusRing.className}`.trim()

  // Interaction props
  const interactionProps = disabled
    ? {}
    : {
        whileHover: cardHover(intensity),
        whileTap: cardPress(intensity),
        whileFocus: cardFocus(),
      }

  return (
    <MotionComponent
      className={combinedClassName}
      onClick={disabled ? undefined : onClick}
      initial={initial}
      animate={animate}
      exit={exit}
      {...interactionProps}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}

export default CardMotion
