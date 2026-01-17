import { motion } from 'framer-motion'
import { pageTransition } from '@/motion/variants'

/**
 * PageTransition - Wrapper component for route-level page transitions
 * 
 * Provides smooth, GPU-accelerated transitions between routes
 * Respects user's reduced motion preferences
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content to animate
 * @param {string} props.className - Additional CSS classes
 */
function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={className}
      style={{
        // Ensure GPU acceleration
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
