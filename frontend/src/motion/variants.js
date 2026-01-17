/**
 * Motion Variants
 * Reusable animation presets for consistent motion design
 * Respects prefers-reduced-motion for accessibility
 */

import { normal, fast, exitTransition } from './transitions'

// Check if user prefers reduced motion
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Helper to create variants that respect reduced motion
const createVariants = (fullMotion, reducedMotion) => {
  return prefersReducedMotion() ? reducedMotion : fullMotion
}

/**
 * Fade In/Out - Simple opacity transitions
 */
export const fadeIn = createVariants(
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
)

/**
 * Slide Up - Fade + slide from bottom
 */
export const slideUp = createVariants(
  {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
)

/**
 * Slide Down - Fade + slide from top
 */
export const slideDown = createVariants(
  {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
  },
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
)

/**
 * Slide Left - Fade + slide from right
 * For forward navigation
 */
export const slideLeft = createVariants(
  {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
  },
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
)

/**
 * Slide Right - Fade + slide from left
 * For backward navigation
 */
export const slideRight = createVariants(
  {
    initial: { opacity: 0, x: -16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 16 },
  },
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
)

/**
 * Scale In - Subtle scale + fade
 */
export const scaleIn = createVariants(
  {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  },
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
)

/**
 * Page Transition - Default route transition
 * Subtle fade + slide up
 */
export const pageTransition = createVariants(
  {
    initial: { opacity: 0, y: 8 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: normal,
    },
    exit: { 
      opacity: 0, 
      y: -4,
      transition: exitTransition,
    },
  },
  {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.15 },
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.1 },
    },
  }
)

/**
 * Stagger Container - For staggered children animations
 */
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
}

/**
 * Stagger Item - For children in stagger container
 */
export const staggerItem = createVariants(
  {
    initial: { opacity: 0, y: 8 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: fast,
    },
    exit: { 
      opacity: 0, 
      y: -4,
      transition: { duration: 0.15 },
    },
  },
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
)

/**
 * Mobile Menu - Slide in from side
 */
export const mobileMenu = createVariants(
  {
    initial: { opacity: 0, height: 0 },
    animate: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.2, delay: 0.1 },
      },
    },
    exit: { 
      opacity: 0,
      height: 0,
      transition: {
        opacity: { duration: 0.15 },
        height: { duration: 0.25, delay: 0.05, ease: [0.4, 0, 1, 1] },
      },
    },
  },
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
)

/**
 * Hover Scale - Subtle scale on hover
 */
export const hoverScale = prefersReducedMotion()
  ? {}
  : {
      scale: 1.02,
      transition: fast,
    }

/**
 * Press Scale - Press down effect
 */
export const pressScale = prefersReducedMotion()
  ? {}
  : {
      scale: 0.98,
      transition: { duration: 0.1 },
    }

/**
 * Get variants based on reduced motion preference
 * Use this function for dynamic variant selection
 */
export const getVariants = (fullMotion, reducedMotion = null) => {
  if (prefersReducedMotion()) {
    return reducedMotion || {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }
  }
  return fullMotion
}
