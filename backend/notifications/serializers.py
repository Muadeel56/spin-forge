from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Notification, Activity

User = get_user_model()


class NotificationActorSerializer(serializers.ModelSerializer):
    """
    Nested serializer for notification actor information.
    """
    display_name = serializers.CharField(source='profile.display_name', read_only=True)
    avatar = serializers.ImageField(source='profile.avatar', read_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'display_name', 'avatar')


class NotificationSerializer(serializers.ModelSerializer):
    """
    Serializer for Notification model.
    Includes actor info and formatted timestamp.
    """
    actor = NotificationActorSerializer(read_only=True)
    formatted_timestamp = serializers.SerializerMethodField()
    related_object_type = serializers.SerializerMethodField()
    related_object_id = serializers.IntegerField(source='object_id', read_only=True)
    
    class Meta:
        model = Notification
        fields = (
            'id', 'actor', 'notification_type', 'message', 'is_read',
            'related_object_type', 'related_object_id', 'created_at', 'formatted_timestamp'
        )
        read_only_fields = ('id', 'created_at', 'actor', 'notification_type', 'message')
    
    def get_formatted_timestamp(self, obj):
        """Return human-readable timestamp."""
        from django.utils import timezone
        now = timezone.now()
        diff = now - obj.created_at
        
        seconds = diff.total_seconds()
        if seconds < 60:
            return 'just now'
        elif seconds < 3600:
            minutes = int(seconds / 60)
            return f'{minutes} {"minute" if minutes == 1 else "minutes"} ago'
        elif seconds < 86400:
            hours = int(seconds / 3600)
            return f'{hours} {"hour" if hours == 1 else "hours"} ago'
        elif seconds < 604800:
            days = int(seconds / 86400)
            return f'{days} {"day" if days == 1 else "days"} ago'
        else:
            return obj.created_at.strftime('%B %d, %Y')
    
    def get_related_object_type(self, obj):
        """Return the type of related object."""
        if obj.content_type:
            return obj.content_type.model
        return None


class ActivitySerializer(serializers.ModelSerializer):
    """
    Serializer for Activity model.
    """
    actor = NotificationActorSerializer(read_only=True)
    
    class Meta:
        model = Activity
        fields = ('id', 'actor', 'action_type', 'target_type', 'target_id', 'created_at')
        read_only_fields = ('id', 'created_at', 'actor', 'action_type', 'target_type', 'target_id')


class NotificationMarkReadSerializer(serializers.Serializer):
    """
    Serializer for marking notifications as read.
    """
    is_read = serializers.BooleanField(default=True)
