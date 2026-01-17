/**
 * Hover Effects Library
 * Centralized motion presets for consistent micro-interactions
 * Provides hover, focus, and press states with sporty easing
 */

import { sharp, gentle } from './easing'

// Check if user prefers reduced motion
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Motion Values Configuration
 */
const MOTION_CONFIG = {
  // Hover lift values
  lift: {
    subtle: -2,
    medium: -3,
    prominent: -4,
  },
  // Press scale values
  press: {
    subtle: 0.99,
    medium: 0.98,
    prominent: 0.97,
  },
  // Hover scale values
  scale: {
    subtle: 1.01,
    medium: 1.02,
    prominent: 1.03,
  },
  // Duration presets
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
}

/**
 * Card Hover Effect
 * Subtle lift + shadow bloom for card interactions
 * @param {string} intensity - 'subtle' | 'medium' | 'prominent'
 * @returns {object} Framer Motion hover state
 */
export const cardHover = (intensity = 'medium') => {
  if (prefersReducedMotion()) return {}
  
  return {
    y: MOTION_CONFIG.lift[intensity],
    scale: 1.00, // Keep scale at 1 for cards
    transition: {
      duration: MOTION_CONFIG.duration.fast,
      ease: gentle,
    },
  }
}

/**
 * Card Press Effect
 * Scale down for tactile feedback
 * @param {string} intensity - 'subtle' | 'medium' | 'prominent'
 * @returns {object} Framer Motion tap state
 */
export const cardPress = (intensity = 'medium') => {
  if (prefersReducedMotion()) return {}
  
  return {
    scale: MOTION_CONFIG.press[intensity],
    y: 0,
    transition: {
      duration: 0.1,
      ease: sharp,
    },
  }
}

/**
 * Card Focus Effect
 * No transform, just for ring styling (handled in CSS)
 * @returns {object} Framer Motion focus state
 */
export const cardFocus = () => {
  // Focus is primarily handled by CSS outline
  // This is a placeholder for potential JS-driven focus effects
  return {}
}

/**
 * Icon Hover Effect
 * Scale animation for icons on hover
 * @param {string} intensity - 'subtle' | 'medium' | 'prominent'
 * @returns {object} Framer Motion hover state
 */
export const iconHover = (intensity = 'medium') => {
  if (prefersReducedMotion()) return {}
  
  return {
    scale: MOTION_CONFIG.scale[intensity],
    transition: {
      duration: MOTION_CONFIG.duration.fast,
      ease: gentle,
    },
  }
}

/**
 * Icon Press Effect
 * Quick scale down for icon press
 * @returns {object} Framer Motion tap state
 */
export const iconPress = () => {
  if (prefersReducedMotion()) return {}
  
  return {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: sharp,
    },
  }
}

/**
 * Button Hover Effect
 * Subtle scale for button interactions
 * @returns {object} Framer Motion hover state
 */
export const buttonHover = () => {
  if (prefersReducedMotion()) return {}
  
  return {
    scale: 1.02,
    transition: {
      duration: MOTION_CONFIG.duration.fast,
      ease: gentle,
    },
  }
}

/**
 * Button Press Effect
 * Scale down for button press
 * @returns {object} Framer Motion tap state
 */
export const buttonPress = () => {
  if (prefersReducedMotion()) return {}
  
  return {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: sharp,
    },
  }
}

/**
 * Stat Hover Effect
 * Subtle scale for stat displays
 * @returns {object} Framer Motion hover state
 */
export const statHover = () => {
  if (prefersReducedMotion()) return {}
  
  return {
    scale: 1.01,
    y: -1,
    transition: {
      duration: MOTION_CONFIG.duration.fast,
      ease: gentle,
    },
  }
}

/**
 * Stagger Children Configuration
 * For sequential animations
 * @param {number} staggerDelay - Delay between children (default: 0.05)
 * @returns {object} Framer Motion stagger configuration
 */
export const staggerChildren = (staggerDelay = 0.05) => {
  return {
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }
}

/**
 * Get shadow class for hover state
 * Helper for Tailwind shadow transitions
 * @param {string} baseClass - Base shadow class
 * @param {string} hoverClass - Hover shadow class
 * @returns {object} Shadow configuration
 */
export const shadowBloom = {
  base: 'shadow-md',
  hover: 'shadow-xl',
  transition: 'transition-shadow duration-200',
}

/**
 * Focus Ring Configuration
 * Consistent focus styling
 */
export const focusRing = {
  className: 'focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 focus-visible:outline-none',
}

/**
 * Sporty Easing Presets
 * Sharp in, smooth out for athletic feel
 */
export const sportyEasing = {
  // Fast and confident
  sharp: [0.4, 0, 0.2, 1],
  // Smooth and polished
  smooth: [0.4, 0, 0.6, 1],
  // Gentle micro-interactions
  gentle: [0.25, 0.1, 0.25, 1],
  // Quick exit
  exit: [0.4, 0, 1, 1],
}

export default {
  cardHover,
  cardPress,
  cardFocus,
  iconHover,
  iconPress,
  buttonHover,
  buttonPress,
  statHover,
  staggerChildren,
  shadowBloom,
  focusRing,
  sportyEasing,
}
