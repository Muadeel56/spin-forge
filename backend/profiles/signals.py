from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Profile

User = settings.AUTH_USER_MODEL


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Signal handler to automatically create a profile when a user is created.
    """
    if created:
        Profile.objects.create(
            user=instance,
            display_name=instance.username,
            forehand_rating=1,
            backhand_rating=1,
            serve_rating=1,
            footwork_rating=1,
        )
