import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { slideLeft, slideRight, pageTransition } from '@/motion/variants'

/**
 * useDirectionAwareTransition
 * 
 * Detects navigation direction and returns appropriate animation variants
 * - Forward navigation: slide from right
 * - Back navigation: slide from left
 * - First load: default page transition
 * 
 * @returns {Object} Animation variants based on navigation direction
 */
export function useDirectionAwareTransition() {
  const location = useLocation()
  const previousPathRef = useRef(null)
  const isBackRef = useRef(false)

  useEffect(() => {
    // Detect if user navigated back
    const handlePopState = () => {
      isBackRef.current = true
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    // Determine direction based on browser history
    const currentPath = location.pathname
    
    if (previousPathRef.current === null) {
      // First load - use default transition
      previousPathRef.current = currentPath
      return
    }

    // Reset back flag after determining direction
    if (isBackRef.current) {
      isBackRef.current = false
    }

    previousPathRef.current = currentPath
  }, [location.pathname])

  // Return variants based on direction
  if (isBackRef.current) {
    return slideRight
  }

  // Check if it's a deeper route (forward)
  if (previousPathRef.current && location.pathname.length > previousPathRef.current.length) {
    return slideLeft
  }

  // Default transition
  return pageTransition
}

/**
 * useNavigationDirection
 * 
 * Simple hook to detect if navigation was forward or backward
 * 
 * @returns {'forward' | 'back' | 'initial'}
 */
export function useNavigationDirection() {
  const location = useLocation()
  const previousPathRef = useRef(null)
  const directionRef = useRef('initial')

  useEffect(() => {
    const handlePopState = () => {
      directionRef.current = 'back'
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    const currentPath = location.pathname

    if (previousPathRef.current === null) {
      directionRef.current = 'initial'
    } else if (directionRef.current !== 'back') {
      directionRef.current = 'forward'
    }

    // Reset for next navigation
    setTimeout(() => {
      directionRef.current = 'forward'
    }, 100)

    previousPathRef.current = currentPath
  }, [location.pathname])

  return directionRef.current
}
