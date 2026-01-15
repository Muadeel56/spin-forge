import { Link } from 'react-router-dom'
import Button from './Button'

function EmptyState({
  icon,
  title = 'Nothing here yet',
  description = 'Get started by creating something new.',
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <div className="text-center py-12 px-4">
      {icon && (
        <div className="mx-auto w-16 h-16 text-gray-400 dark:text-gray-500 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-primary mb-2">{title}</h3>
      <p className="text-secondary max-w-sm mx-auto mb-6">{description}</p>
      {actionLabel && (actionTo || onAction) && (
        actionTo ? (
          <Link to={actionTo}>
            <Button variant="primary">{actionLabel}</Button>
          </Link>
        ) : (
          <Button variant="primary" onClick={onAction}>{actionLabel}</Button>
        )
      )}
    </div>
  )
}

export default EmptyState
