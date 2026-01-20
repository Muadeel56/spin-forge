import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Avatar from '@/components/Avatar'
import { fast } from '@/motion/transitions'

function NotificationItem({ notification, onMarkAsRead }) {
  const navigate = useNavigate()

  const handleClick = () => {
    // Mark as read if unread
    if (!notification.is_read && onMarkAsRead) {
      onMarkAsRead(notification.id)
    }

    // Navigate to related content
    if (notification.related_object_type === 'comment' && notification.related_object_id) {
      // Navigate to the post containing the comment
      // Since we don't have the post ID directly, we'll need to handle this
      // For now, navigate to feed
      navigate('/')
    } else if (notification.related_object_type === 'post' && notification.related_object_id) {
      navigate('/')
    }
  }

  return (
    <motion.div
      className={`px-4 py-3 hover:bg-tertiary transition-colors cursor-pointer ${
        !notification.is_read ? 'bg-primary-50 dark:bg-primary-900/10' : ''
      }`}
      onClick={handleClick}
      whileHover={{ x: 2 }}
      transition={fast}
    >
      <div className="flex items-start space-x-3">
        {/* Unread indicator dot */}
        {!notification.is_read && (
          <div className="flex-shrink-0 mt-2">
            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
          </div>
        )}

        {/* Actor avatar */}
        {notification.actor && (
          <div className="flex-shrink-0">
            <Avatar
              src={notification.actor.avatar}
              alt={notification.actor.display_name}
              size="sm"
            />
          </div>
        )}

        {/* Notification content */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm ${
              !notification.is_read
                ? 'font-semibold text-primary'
                : 'text-secondary'
            }`}
          >
            {notification.message}
          </p>
          <p className="text-xs text-tertiary mt-1">
            {notification.formatted_timestamp}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default NotificationItem
