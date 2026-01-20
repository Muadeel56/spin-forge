"""
Service layer for notification creation and management.
Handles business logic for creating notifications and activities.
"""
from django.contrib.contenttypes.models import ContentType
from django.db import IntegrityError
from .models import Notification, Activity


def create_notification(recipient, actor, notification_type, message, related_object=None):
    """
    Create a notification for a user.
    
    Args:
        recipient: User who will receive the notification
        actor: User who triggered the notification
        notification_type: Type of notification (from NOTIFICATION_TYPES)
        message: Message text for the notification
        related_object: Optional related object (post, comment, etc.)
    
    Returns:
        Notification instance or None if duplicate
    """
    # Don't create notification if actor is the recipient
    if actor and actor == recipient:
        return None
    
    notification_data = {
        'recipient': recipient,
        'actor': actor,
        'notification_type': notification_type,
        'message': message,
    }
    
    # Add related object if provided
    if related_object:
        notification_data['content_type'] = ContentType.objects.get_for_model(related_object)
        notification_data['object_id'] = related_object.id
    
    try:
        notification = Notification.objects.create(**notification_data)
        return notification
    except IntegrityError:
        # Duplicate notification (constraint violation)
        return None


def create_activity(actor, action_type, target_type, target_id):
    """
    Create an activity record.
    
    Args:
        actor: User who performed the action
        action_type: Type of action (from ACTION_TYPES)
        target_type: Type of target object
        target_id: ID of target object
    
    Returns:
        Activity instance
    """
    activity = Activity.objects.create(
        actor=actor,
        action_type=action_type,
        target_type=target_type,
        target_id=target_id
    )
    return activity


def mark_notification_as_read(notification_id, user):
    """
    Mark a notification as read.
    
    Args:
        notification_id: ID of the notification
        user: User who owns the notification (for security)
    
    Returns:
        True if successful, False otherwise
    """
    try:
        notification = Notification.objects.get(id=notification_id, recipient=user)
        notification.is_read = True
        notification.save(update_fields=['is_read'])
        return True
    except Notification.DoesNotExist:
        return False


def mark_all_notifications_as_read(user):
    """
    Mark all notifications as read for a user.
    
    Args:
        user: User whose notifications to mark as read
    
    Returns:
        Number of notifications marked as read
    """
    count = Notification.objects.filter(
        recipient=user,
        is_read=False
    ).update(is_read=True)
    return count


def get_unread_count(user):
    """
    Get count of unread notifications for a user.
    
    Args:
        user: User to get count for
    
    Returns:
        Integer count of unread notifications
    """
    return Notification.objects.filter(
        recipient=user,
        is_read=False
    ).count()
