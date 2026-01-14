from django.db import models
from django.conf import settings


class Profile(models.Model):
    """
    User profile model extending user information.
    Includes player profile information and skill matrix ratings.
    """
    PLAYING_LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    display_name = models.CharField(max_length=150, blank=True)
    bio = models.TextField(blank=True, max_length=500)
    playing_level = models.CharField(
        max_length=20,
        choices=PLAYING_LEVEL_CHOICES,
        blank=True
    )
    # Skill ratings (1-10 scale)
    forehand_rating = models.IntegerField(default=1, blank=True)
    backhand_rating = models.IntegerField(default=1, blank=True)
    serve_rating = models.IntegerField(default=1, blank=True)
    footwork_rating = models.IntegerField(default=1, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    location = models.CharField(max_length=100, blank=True)
    website = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'profiles'

    def __str__(self):
        return f"{self.user.username}'s Profile"

    def save(self, *args, **kwargs):
        # Set display_name to username if not provided
        if not self.display_name:
            self.display_name = self.user.username
        super().save(*args, **kwargs)
