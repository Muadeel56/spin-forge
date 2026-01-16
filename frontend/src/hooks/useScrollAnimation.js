import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for scroll-triggered animations using GSAP ScrollTrigger
 * @param {Object} options - Animation configuration
 * @param {string} options.animationType - Type of animation: 'fadeIn', 'slideUp', 'slideLeft', 'slideRight', 'scale', 'parallax'
 * @param {string} options.start - ScrollTrigger start position (default: "top 80%")
 * @param {boolean} options.once - Whether to animate only once (default: true)
 * @param {number} options.duration - Animation duration in seconds (default: 0.8)
 * @param {string} options.ease - GSAP easing function (default: "power2.out")
 * @param {number} options.delay - Animation delay in seconds (default: 0)
 * @param {number} options.y - Y offset for slide animations (default: 50)
 * @param {number} options.x - X offset for slide animations (default: 50)
 * @param {number} options.scale - Initial scale for scale animations (default: 0.9)
 * @param {number} options.parallaxSpeed - Parallax movement speed (default: 50)
 * @param {boolean} options.scrub - Whether to scrub animation with scroll (for parallax)
 * @returns {React.RefObject} - Ref to attach to the element to animate
 */
export function useScrollAnimation(options = {}) {
  const elementRef = useRef(null);
  const {
    animationType = 'fadeIn',
    start = 'top 80%',
    once = true,
    duration = 0.8,
    ease = 'power2.out',
    delay = 0,
    y = 50,
    x = 50,
    scale = 0.9,
    parallaxSpeed = 50,
    scrub = false,
  } = options;

  useEffect(() => {
    if (!elementRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Still show content but with minimal/no animation
      gsap.set(elementRef.current, { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    const element = elementRef.current;
    let animation;

    // Set initial state based on animation type
    switch (animationType) {
      case 'fadeIn':
        gsap.set(element, { opacity: 0 });
        animation = gsap.to(element, {
          opacity: 1,
          duration,
          ease,
          delay,
          scrollTrigger: {
            trigger: element,
            start,
            once,
          },
        });
        break;

      case 'slideUp':
        gsap.set(element, { opacity: 0, y });
        animation = gsap.to(element, {
          opacity: 1,
          y: 0,
          duration,
          ease,
          delay,
          scrollTrigger: {
            trigger: element,
            start,
            once,
          },
        });
        break;

      case 'slideLeft':
        gsap.set(element, { opacity: 0, x: x });
        animation = gsap.to(element, {
          opacity: 1,
          x: 0,
          duration,
          ease,
          delay,
          scrollTrigger: {
            trigger: element,
            start,
            once,
          },
        });
        break;

      case 'slideRight':
        gsap.set(element, { opacity: 0, x: -x });
        animation = gsap.to(element, {
          opacity: 1,
          x: 0,
          duration,
          ease,
          delay,
          scrollTrigger: {
            trigger: element,
            start,
            once,
          },
        });
        break;

      case 'scale':
        gsap.set(element, { opacity: 0, scale });
        animation = gsap.to(element, {
          opacity: 1,
          scale: 1,
          duration,
          ease,
          delay,
          scrollTrigger: {
            trigger: element,
            start,
            once,
          },
        });
        break;

      case 'parallax':
        animation = gsap.to(element, {
          y: -parallaxSpeed,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub,
          },
        });
        break;

      default:
        gsap.set(element, { opacity: 0, y });
        animation = gsap.to(element, {
          opacity: 1,
          y: 0,
          duration,
          ease,
          delay,
          scrollTrigger: {
            trigger: element,
            start,
            once,
          },
        });
    }

    // Cleanup function
    return () => {
      if (animation && animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      if (animation) {
        animation.kill();
      }
    };
  }, [animationType, start, once, duration, ease, delay, y, x, scale, parallaxSpeed, scrub]);

  return elementRef;
}

/**
 * Hook for hero section animations (fade in on mount, not scroll-triggered)
 * @param {Object} options - Animation configuration
 * @param {number} options.duration - Animation duration (default: 1)
 * @param {string} options.ease - GSAP easing function (default: "power2.out")
 * @param {number} options.delay - Animation delay (default: 0)
 * @param {number} options.y - Initial Y offset (default: 30)
 * @returns {React.RefObject} - Ref to attach to the element
 */
export function useHeroAnimation(options = {}) {
  const elementRef = useRef(null);
  const { duration = 1, ease = 'power2.out', delay = 0, y = 30 } = options;

  useEffect(() => {
    if (!elementRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(elementRef.current, { opacity: 1, y: 0 });
      return;
    }

    const element = elementRef.current;
    gsap.from(element, {
      opacity: 0,
      y,
      duration,
      ease,
      delay,
    });

    // No cleanup needed for non-scroll animations
  }, [duration, ease, delay, y]);

  return elementRef;
}
