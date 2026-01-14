from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for Profile model.
    Includes validation for skill ratings (1-10 range).
    """
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Profile
        fields = (
            'id',
            'username',
            'email',
            'display_name',
            'bio',
            'playing_level',
            'forehand_rating',
            'backhand_rating',
            'serve_rating',
            'footwork_rating',
            'avatar',
            'location',
            'website',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('id', 'created_at', 'updated_at')

    def validate_forehand_rating(self, value):
        if value is not None and (value < 1 or value > 10):
            raise serializers.ValidationError("Forehand rating must be between 1 and 10.")
        return value

    def validate_backhand_rating(self, value):
        if value is not None and (value < 1 or value > 10):
            raise serializers.ValidationError("Backhand rating must be between 1 and 10.")
        return value

    def validate_serve_rating(self, value):
        if value is not None and (value < 1 or value > 10):
            raise serializers.ValidationError("Serve rating must be between 1 and 10.")
        return value

    def validate_footwork_rating(self, value):
        if value is not None and (value < 1 or value > 10):
            raise serializers.ValidationError("Footwork rating must be between 1 and 10.")
        return value

    def validate_playing_level(self, value):
        if value and value not in [choice[0] for choice in Profile.PLAYING_LEVEL_CHOICES]:
            raise serializers.ValidationError(
                f"Playing level must be one of: {', '.join([choice[0] for choice in Profile.PLAYING_LEVEL_CHOICES])}"
            )
        return value
