from django.test import TestCase
from django.contrib.auth import get_user_model
from posts.models import Post, Comment
from .models import Notification, Activity
from .services import create_notification, create_activity, get_unread_count

User = get_user_model()


class NotificationModelTests(TestCase):
    """Tests for Notification model."""
    
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', email='user1@test.com', password='pass')
        self.user2 = User.objects.create_user(username='user2', email='user2@test.com', password='pass')
    
    def test_create_notification(self):
        """Test creating a notification."""
        notification = Notification.objects.create(
            recipient=self.user1,
            actor=self.user2,
            notification_type='comment_on_post',
            message='Test notification'
        )
        self.assertEqual(notification.recipient, self.user1)
        self.assertEqual(notification.actor, self.user2)
        self.assertFalse(notification.is_read)


class NotificationServiceTests(TestCase):
    """Tests for notification services."""
    
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', email='user1@test.com', password='pass')
        self.user2 = User.objects.create_user(username='user2', email='user2@test.com', password='pass')
    
    def test_create_notification_service(self):
        """Test notification creation via service."""
        notification = create_notification(
            recipient=self.user1,
            actor=self.user2,
            notification_type='comment_on_post',
            message='Test'
        )
        self.assertIsNotNone(notification)
        self.assertEqual(notification.recipient, self.user1)
    
    def test_no_self_notification(self):
        """Test that users don't get notifications for their own actions."""
        notification = create_notification(
            recipient=self.user1,
            actor=self.user1,
            notification_type='comment_on_post',
            message='Test'
        )
        self.assertIsNone(notification)
