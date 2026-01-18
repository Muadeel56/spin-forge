from django.db import models
from django.conf import settings


class Post(models.Model):
    """
    Post model for community feed content.
    Users can share achievements, struggles, or tips.
    """
    POST_TYPE_CHOICES = [
        ('achievement', 'Achievement'),
        ('struggle', 'Struggle'),
        ('tip', 'Tip'),
    ]
    
    SKILL_CHOICES = [
        ('forehand', 'Forehand'),
        ('backhand', 'Backhand'),
        ('serve', 'Serve'),
        ('footwork', 'Footwork'),
        ('general', 'General'),
    ]
    
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='posts'
    )
    content = models.TextField()
    post_type = models.CharField(
        max_length=20,
        choices=POST_TYPE_CHOICES,
        default='achievement'
    )
    related_skill = models.CharField(
        max_length=20,
        choices=SKILL_CHOICES,
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'posts'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author.username} - {self.post_type} - {self.created_at.strftime('%Y-%m-%d')}"


class Comment(models.Model):
    """
    Comment model for post discussions.
    """
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'comments'
        ordering = ['created_at']

    def __str__(self):
        return f"{self.author.username} on {self.post.id} - {self.created_at.strftime('%Y-%m-%d')}"
