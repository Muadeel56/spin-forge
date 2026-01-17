import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

/**
 * Tooltip Component
 * Displays contextual information on hover with delayed appearance
 * Desktop-only feature with smooth animations
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Trigger element
 * @param {React.ReactNode} props.content - Tooltip content
 * @param {string} props.placement - Tooltip position: 'top' | 'bottom' | 'left' | 'right'
 * @param {number} props.delay - Delay before showing tooltip in ms (default: 300)
 * @param {number} props.offset - Distance from trigger in pixels (default: 8)
 * @param {boolean} props.disabled - Disable tooltip
 * @param {string} props.className - Additional classes for tooltip content
 * @param {boolean} props.hideOnClick - Hide tooltip when trigger is clicked
 */
function Tooltip({
  children,
  content,
  placement = 'top',
  delay = 300,
  offset = 8,
  disabled = false,
  className = '',
  hideOnClick = true,
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)
  const tooltipRef = useRef(null)
  const timeoutRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)

  // Check if device supports fine pointer (desktop)
  const [isPointerFine, setIsPointerFine] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setIsPointerFine(mediaQuery.matches)

    const handleChange = (e) => setIsPointerFine(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Calculate tooltip position
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    let top = 0
    let left = 0

    switch (placement) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'bottom':
        top = triggerRect.bottom + offset
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left - tooltipRect.width - offset
        break
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + offset
        break
      default:
        top = triggerRect.top - tooltipRect.height - offset
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
    }

    // Keep tooltip within viewport
    const padding = 8
    if (left < padding) left = padding
    if (left + tooltipRect.width > window.innerWidth - padding) {
      left = window.innerWidth - tooltipRect.width - padding
    }
    if (top < padding) top = triggerRect.bottom + offset // Flip to bottom if no space on top

    setPosition({ top, left })
  }

  const handleMouseEnter = () => {
    if (disabled || !isPointerFine) return

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  const handleClick = () => {
    if (hideOnClick) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setIsVisible(false)
    }
  }

  useEffect(() => {
    if (isVisible) {
      calculatePosition()
    }
  }, [isVisible])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Animation variants
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: placement === 'top' ? 4 : placement === 'bottom' ? -4 : 0,
      x: placement === 'left' ? 4 : placement === 'right' ? -4 : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 1, 1],
      },
    },
  }

  // Don't render on mobile or if content is empty
  if (!isPointerFine || !content || !isMounted) {
    return <>{children}</>
  }

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="inline-block"
      >
        {children}
      </span>

      {createPortal(
        <AnimatePresence>
          {isVisible && (
            <motion.div
              ref={tooltipRef}
              className={`fixed z-50 pointer-events-none ${className}`}
              style={{
                top: position.top,
                left: position.left,
              }}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-surface border border-theme rounded-lg shadow-lg px-3 py-2 text-sm text-primary max-w-xs">
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

/**
 * SimpleTooltip Component
 * Simplified tooltip with just text content
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Trigger element
 * @param {string} props.text - Tooltip text
 * @param {string} props.placement - Position
 */
export function SimpleTooltip({ children, text, placement = 'top' }) {
  return (
    <Tooltip content={text} placement={placement}>
      {children}
    </Tooltip>
  )
}

export default Tooltip
