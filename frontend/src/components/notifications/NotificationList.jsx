import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NotificationItem from './NotificationItem'
import EmptyState from '@/components/EmptyState'
import Skeleton from '@/components/Skeleton'
import Button from '@/components/Button'
import { getNotifications, markAsRead, markAllAsRead } from '@/services/notificationService'
import { staggerContainer, staggerItem } from '@/motion/variants'

function NotificationList({ onClose, onNotificationRead }) {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [markingAllRead, setMarkingAllRead] = useState(false)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const data = await getNotifications()
      setNotifications(data.results || [])
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId)
      // Update local state
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, is_read: true } : n
        )
      )
      // Notify parent component
      if (onNotificationRead) {
        onNotificationRead()
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      setMarkingAllRead(true)
      await markAllAsRead()
      // Update local state
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, is_read: true }))
      )
      // Notify parent component
      if (onNotificationRead) {
        onNotificationRead()
      }
    } catch (err) {
      console.error('Failed to mark all as read:', err)
    } finally {
      setMarkingAllRead(false)
    }
  }

  const hasUnreadNotifications = notifications.some((n) => !n.is_read)

  if (loading) {
    return (
      <div className="py-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="px-4 py-3">
            <div className="flex items-start space-x-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 py-6">
        <EmptyState
          title="Error loading notifications"
          description={error}
        />
      </div>
    )
  }

  if (notifications.length === 0) {
    return (
      <div className="px-4 py-6">
        <EmptyState
          title="No notifications yet"
          description="When someone interacts with your posts, you'll see it here"
        />
      </div>
    )
  }

  return (
    <div className="max-h-[500px] overflow-y-auto">
      {/* Header with mark all as read */}
      {hasUnreadNotifications && (
        <div className="sticky top-0 z-10 bg-surface border-b border-theme px-4 py-2 flex justify-between items-center">
          <span className="text-sm font-medium text-secondary">Notifications</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={markingAllRead}
          >
            {markingAllRead ? 'Marking...' : 'Mark all as read'}
          </Button>
        </div>
      )}

      {/* Notification list */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              variants={staggerItem}
              layout
            >
              <NotificationItem
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default NotificationList
