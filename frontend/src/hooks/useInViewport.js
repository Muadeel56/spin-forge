import { useEffect, useState, useRef } from 'react'

/**
 * useInViewport Hook
 * Detects when an element enters the viewport using Intersection Observer
 * Useful for triggering animations on scroll
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Percentage of element visible to trigger (0-1, default: 0.1)
 * @param {string} options.rootMargin - Margin around viewport (default: '0px')
 * @param {boolean} options.triggerOnce - Only trigger once (default: true)
 * @param {boolean} options.enabled - Enable/disable observation (default: true)
 * @returns {Object} { ref, isInViewport, hasBeenInViewport }
 */
export function useInViewport(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    enabled = true,
  } = options

  const elementRef = useRef(null)
  const [isInViewport, setIsInViewport] = useState(false)
  const [hasBeenInViewport, setHasBeenInViewport] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const element = elementRef.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // If reduced motion, immediately set as in viewport
      setIsInViewport(true)
      setHasBeenInViewport(true)
      return
    }

    // If already triggered and triggerOnce is true, skip observation
    if (triggerOnce && hasBeenInViewport) {
      return
    }

    // Create intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting

        setIsInViewport(inView)

        if (inView) {
          setHasBeenInViewport(true)
          
          // If triggerOnce, disconnect after first trigger
          if (triggerOnce) {
            observer.disconnect()
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce, enabled, hasBeenInViewport])

  return {
    ref: elementRef,
    isInViewport,
    hasBeenInViewport,
  }
}

/**
 * useInViewportMultiple Hook
 * For observing multiple elements independently
 * Returns a function to create refs
 * 
 * @param {Object} options - Configuration options (same as useInViewport)
 * @returns {Function} createRef function that returns { ref, isInViewport, hasBeenInViewport }
 */
export function useInViewportMultiple(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    enabled = true,
  } = options

  const [entries, setEntries] = useState(new Map())
  const observerRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Create observer
    observerRef.current = new IntersectionObserver(
      (observedEntries) => {
        setEntries((prev) => {
          const next = new Map(prev)
          observedEntries.forEach((entry) => {
            const element = entry.target
            const inView = entry.isIntersecting
            const current = next.get(element) || { isInViewport: false, hasBeenInViewport: false }

            next.set(element, {
              isInViewport: inView,
              hasBeenInViewport: current.hasBeenInViewport || inView,
            })

            // If triggerOnce and has been in viewport, disconnect
            if (triggerOnce && next.get(element).hasBeenInViewport) {
              observerRef.current?.unobserve(element)
            }
          })
          return next
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    // If reduced motion, no need to observe
    if (prefersReducedMotion) {
      return
    }

    // Cleanup
    return () => {
      observerRef.current?.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce, enabled])

  const createRef = (element) => {
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Set immediately as in viewport if reduced motion
      setEntries((prev) => {
        const next = new Map(prev)
        next.set(element, { isInViewport: true, hasBeenInViewport: true })
        return next
      })
      return
    }

    if (observerRef.current && enabled) {
      observerRef.current.observe(element)
    }
  }

  const getState = (element) => {
    return entries.get(element) || { isInViewport: false, hasBeenInViewport: false }
  }

  return { createRef, getState }
}

export default useInViewport
