from django.db import models
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Activity(models.Model):
    """
    Activity model to track meaningful user actions.
    Serves as an audit trail of user interactions.
    """
    ACTION_TYPES = [
        ('post_created', 'Post Created'),
        ('comment_created', 'Comment Created'),
        ('post_updated', 'Post Updated'),
        ('comment_updated', 'Comment Updated'),
    ]
    
    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='activities',
        help_text="User who performed the action"
    )
    action_type = models.CharField(
        max_length=50,
        choices=ACTION_TYPES,
        help_text="Type of action performed"
    )
    target_type = models.CharField(
        max_length=50,
        help_text="Type of target object (e.g., 'post', 'comment')"
    )
    target_id = models.PositiveIntegerField(
        help_text="ID of the target object"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'activities'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['action_type']),
            models.Index(fields=['created_at']),
            models.Index(fields=['actor', 'created_at']),
        ]
        verbose_name_plural = 'Activities'
    
    def __str__(self):
        return f"{self.actor.username} - {self.action_type} - {self.target_type}:{self.target_id}"


class Notification(models.Model):
    """
    Notification model for user notifications.
    Supports different notification types with flexible related object linking.
    """
    NOTIFICATION_TYPES = [
        ('comment_on_post', 'Comment on Post'),
        ('comment_reply', 'Comment Reply'),
        ('post_feedback', 'Post Feedback'),
        ('new_learning_content', 'New Learning Content'),
    ]
    
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notifications',
        help_text="User who receives the notification"
    )
    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sent_notifications',
        help_text="User who triggered the notification",
        null=True,
        blank=True
    )
    notification_type = models.CharField(
        max_length=50,
        choices=NOTIFICATION_TYPES,
        help_text="Type of notification"
    )
    message = models.CharField(
        max_length=255,
        help_text="Notification message text"
    )
    is_read = models.BooleanField(
        default=False,
        help_text="Whether the notification has been read"
    )
    
    # Generic relation to any model (post, comment, etc.)
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    object_id = models.PositiveIntegerField(null=True, blank=True)
    related_object = GenericForeignKey('content_type', 'object_id')
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'notifications'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['recipient', 'is_read', 'created_at']),
            models.Index(fields=['notification_type']),
            models.Index(fields=['created_at']),
        ]
        # Prevent duplicate notifications
        constraints = [
            models.UniqueConstraint(
                fields=['recipient', 'actor', 'notification_type', 'object_id'],
                condition=models.Q(is_read=False),
                name='unique_unread_notification'
            )
        ]
    
    def __str__(self):
        return f"Notification for {self.recipient.username}: {self.notification_type}"
