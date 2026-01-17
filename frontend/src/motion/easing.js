/**
 * Motion Easing Curves
 * Sporty, sharp easing functions for confident transitions
 * No bouncy animations - clean and intentional
 */

// Fast, confident transitions - for decisive actions
export const sharp = [0.4, 0, 0.2, 1]

// Standard page transitions - balanced and smooth
export const smooth = [0.4, 0, 0.6, 1]

// Subtle micro-interactions - gentle and refined
export const gentle = [0.25, 0.1, 0.25, 1]

// Exit animations - slightly faster
export const exit = [0.4, 0, 1, 1]

// Spring physics for natural feel (use sparingly)
export const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

// Tween for predictable timing
export const tween = {
  type: 'tween',
  ease: smooth,
}
