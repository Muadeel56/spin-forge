/**
 * Motion Duration Presets
 * Standardized timing for consistent animations
 */

import { sharp, smooth, gentle, exit } from './easing'

// Fast - 0.2s - micro-interactions (hovers, presses)
export const fast = {
  duration: 0.2,
  ease: gentle,
}

// Normal - 0.3s - standard page transitions
export const normal = {
  duration: 0.3,
  ease: smooth,
}

// Slow - 0.5s - hero animations, large movements
export const slow = {
  duration: 0.5,
  ease: smooth,
}

// Sharp - 0.25s - confident, decisive actions
export const sharpTransition = {
  duration: 0.25,
  ease: sharp,
}

// Exit - 0.2s - faster exits feel more responsive
export const exitTransition = {
  duration: 0.2,
  ease: exit,
}

// Spring - for natural bouncy feel (use sparingly)
export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}
