import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NotificationList from './notifications/NotificationList'
import { getUnreadCount } from '@/services/notificationService'
import { fast } from '@/motion/transitions'

function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    fetchUnreadCount()

    // Auto-refresh unread count every 30 seconds
    const interval = setInterval(() => {
      fetchUnreadCount()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const fetchUnreadCount = async () => {
    try {
      setLoading(true)
      const count = await getUnreadCount()
      setUnreadCount(count)
    } catch (err) {
      console.error('Failed to fetch unread count:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationRead = () => {
    // Refresh unread count when a notification is marked as read
    fetchUnreadCount()
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell button */}
      <motion.button
        type="button"
        className="relative p-2 rounded-md text-secondary hover:text-primary hover:bg-tertiary transition-colors"
        onClick={toggleDropdown}
        aria-label="Notifications"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={fast}
      >
        {/* Bell icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Unread badge */}
        {unreadCount > 0 && (
          <motion.span
            className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-96 bg-surface rounded-lg shadow-lg border border-theme z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={fast}
          >
            {/* Arrow */}
            <div className="absolute -top-2 right-4 w-4 h-4 bg-surface border-l border-t border-theme transform rotate-45"></div>

            {/* Notification list */}
            <div className="relative bg-surface rounded-lg overflow-hidden">
              <NotificationList
                onClose={() => setIsOpen(false)}
                onNotificationRead={handleNotificationRead}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NotificationBell
