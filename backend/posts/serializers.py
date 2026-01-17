from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post, Comment

User = get_user_model()


class CommentAuthorSerializer(serializers.ModelSerializer):
    """
    Nested serializer for comment author information.
    """
    display_name = serializers.CharField(source='profile.display_name', read_only=True)
    avatar = serializers.ImageField(source='profile.avatar', read_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'display_name', 'avatar')


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for Comment model with nested author info.
    """
    author = CommentAuthorSerializer(read_only=True)
    formatted_timestamp = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = ('id', 'author', 'content', 'created_at', 'formatted_timestamp')
        read_only_fields = ('id', 'created_at', 'author')
    
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


class PostAuthorSerializer(serializers.ModelSerializer):
    """
    Nested serializer for post author information.
    """
    display_name = serializers.CharField(source='profile.display_name', read_only=True)
    avatar = serializers.ImageField(source='profile.avatar', read_only=True)
    playing_level = serializers.CharField(source='profile.playing_level', read_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'display_name', 'avatar', 'playing_level')


class PostListSerializer(serializers.ModelSerializer):
    """
    Serializer for Post list view (feed).
    Includes author info and comment count, but not full comments.
    """
    author = PostAuthorSerializer(read_only=True)
    comment_count = serializers.IntegerField(read_only=True)
    formatted_timestamp = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = (
            'id', 'author', 'content', 'post_type', 'related_skill',
            'comment_count', 'created_at', 'formatted_timestamp'
        )
        read_only_fields = ('id', 'created_at', 'author')
    
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


class PostDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for single Post view with all comments.
    """
    author = PostAuthorSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.IntegerField(read_only=True)
    formatted_timestamp = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = (
            'id', 'author', 'content', 'post_type', 'related_skill',
            'comments', 'comment_count', 'created_at', 'formatted_timestamp'
        )
        read_only_fields = ('id', 'created_at', 'author')
    
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


class PostCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating posts with validation.
    """
    class Meta:
        model = Post
        fields = ('content', 'post_type', 'related_skill')
    
    def validate_content(self, value):
        """Validate that content is not empty."""
        if not value or not value.strip():
            raise serializers.ValidationError("Content cannot be empty.")
        if len(value) > 5000:
            raise serializers.ValidationError("Content is too long (max 5000 characters).")
        return value.strip()
    
    def validate_post_type(self, value):
        """Validate post type."""
        valid_types = [choice[0] for choice in Post.POST_TYPE_CHOICES]
        if value not in valid_types:
            raise serializers.ValidationError(
                f"Invalid post type. Choose from: {', '.join(valid_types)}"
            )
        return value
    
    def validate_related_skill(self, value):
        """Validate related skill if provided."""
        if value:
            valid_skills = [choice[0] for choice in Post.SKILL_CHOICES]
            if value not in valid_skills:
                raise serializers.ValidationError(
                    f"Invalid skill. Choose from: {', '.join(valid_skills)}"
                )
        return value
    
    def create(self, validated_data):
        """Create post with current user as author."""
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)


class CommentCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating comments.
    """
    class Meta:
        model = Comment
        fields = ('content',)
    
    def validate_content(self, value):
        """Validate that content is not empty."""
        if not value or not value.strip():
            raise serializers.ValidationError("Content cannot be empty.")
        if len(value) > 2000:
            raise serializers.ValidationError("Content is too long (max 2000 characters).")
        return value.strip()
    
    def create(self, validated_data):
        """Create comment with current user as author."""
        validated_data['author'] = self.context['request'].user
        validated_data['post_id'] = self.context['post_id']
        return super().create(validated_data)
