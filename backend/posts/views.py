from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from .models import Post, Comment
from .serializers import (
    PostListSerializer,
    PostDetailSerializer,
    PostCreateSerializer,
    CommentSerializer,
    CommentCreateSerializer,
)
from .permissions import IsAuthorOrReadOnly


class PostViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Post model.
    
    list: Get paginated feed of posts
    create: Create a new post (authenticated users only)
    retrieve: Get single post with all comments
    destroy: Delete own post (author only)
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    
    def get_queryset(self):
        """
        Return posts with author profile info and comment count.
        Supports filtering by author username and post_type.
        """
        queryset = Post.objects.select_related(
            'author', 'author__profile'
        ).annotate(
            comment_count=Count('comments')
        )
        
        # Filter by author username
        author_username = self.request.query_params.get('author', None)
        if author_username:
            queryset = queryset.filter(author__username=author_username)
        
        # Filter by post type
        post_type = self.request.query_params.get('post_type', None)
        if post_type:
            queryset = queryset.filter(post_type=post_type)
        
        return queryset
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'list':
            return PostListSerializer
        elif self.action == 'create':
            return PostCreateSerializer
        elif self.action == 'retrieve':
            return PostDetailSerializer
        return PostListSerializer
    
    def perform_create(self, serializer):
        """Set the author to the current user."""
        serializer.save(author=self.request.user)
    
    def retrieve(self, request, *args, **kwargs):
        """Get single post with all comments."""
        instance = self.get_object()
        # Prefetch comments with author profile info
        comments = instance.comments.select_related('author', 'author__profile').all()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Comment model.
    
    Nested under posts: /posts/{post_id}/comments/
    Only supports creating comments.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentCreateSerializer
    http_method_names = ['post']  # Only allow POST
    
    def get_queryset(self):
        """Return comments for a specific post."""
        post_id = self.kwargs.get('post_pk')
        return Comment.objects.filter(post_id=post_id).select_related(
            'author', 'author__profile'
        )
    
    def create(self, request, *args, **kwargs):
        """Create a new comment on a post."""
        post_id = self.kwargs.get('post_pk')
        
        # Check if post exists
        try:
            post = Post.objects.get(pk=post_id)
        except Post.DoesNotExist:
            return Response(
                {'error': 'Post not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Create comment with context
        serializer = self.get_serializer(
            data=request.data,
            context={'request': request, 'post_id': post_id}
        )
        serializer.is_valid(raise_exception=True)
        comment = serializer.save()
        
        # Return the comment with full author info
        return_serializer = CommentSerializer(comment)
        return Response(
            return_serializer.data,
            status=status.HTTP_201_CREATED
        )
