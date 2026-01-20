"""
Signal handlers for automatic notification creation.
Listens to model events and creates notifications accordingly.
"""
from django.db.models.signals import post_save
from django.dispatch import receiver
from posts.models import Comment, Post
from .services import create_notification, create_activity


@receiver(post_save, sender=Comment)
def handle_comment_created(sender, instance, created, **kwargs):
    """
    Handle comment creation.
    Creates notifications for:
    1. Post author (someone commented on your post)
    2. Previous commenter (if this is a reply to their comment)
    """
    if not created:
        return
    
    comment = instance
    post = comment.post
    commenter = comment.author
    
    # Create activity record
    create_activity(
        actor=commenter,
        action_type='comment_created',
        target_type='comment',
        target_id=comment.id
    )
    
    # Notify post author (if not commenting on own post)
    if post.author != commenter:
        message = f"{commenter.profile.display_name} commented on your post"
        create_notification(
            recipient=post.author,
            actor=commenter,
            notification_type='comment_on_post',
            message=message,
            related_object=comment
        )
    
    # Check if this is a reply to another comment
    # Get all comments on this post before this one
    previous_comments = Comment.objects.filter(
        post=post,
        created_at__lt=comment.created_at
    ).select_related('author').order_by('-created_at')
    
    # If there are previous comments and this isn't the first comment
    if previous_comments.exists():
        # Get the most recent commenter (likely being replied to)
        # This is a simple heuristic - in a full implementation you'd parse @mentions or have explicit reply links
        most_recent_commenter = previous_comments.first().author
        
        # Notify if replying to someone else's comment
        if most_recent_commenter != commenter and most_recent_commenter != post.author:
            message = f"{commenter.profile.display_name} replied to your comment"
            create_notification(
                recipient=most_recent_commenter,
                actor=commenter,
                notification_type='comment_reply',
                message=message,
                related_object=comment
            )


@receiver(post_save, sender=Post)
def handle_post_created(sender, instance, created, **kwargs):
    """
    Handle post creation.
    Creates activity record for post creation.
    """
    if not created:
        return
    
    post = instance
    
    # Create activity record
    create_activity(
        actor=post.author,
        action_type='post_created',
        target_type='post',
        target_id=post.id
    )
