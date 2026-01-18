from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Sport, Rule, Technique, LearningSection, LearningTopic
from .serializers import (
    SportSerializer,
    RuleListSerializer,
    RuleDetailSerializer,
    TechniqueListSerializer,
    TechniqueDetailSerializer,
    LearningSectionSerializer,
    LearningTopicDetailSerializer,
)


class ReadOnlyOrAdminPermission(permissions.BasePermission):
    """
    Custom permission: Allow read-only access to all, write access to admins only.
    """
    def has_permission(self, request, view):
        # Allow read permissions for any request
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions only for admin users
        return request.user and request.user.is_staff


class SportViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Sport model.
    Read-only access for all users.
    """
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'


class RuleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Rule model.
    Supports filtering by sport, difficulty, category, is_legal, is_myth.
    Supports searching by title and description.
    """
    queryset = Rule.objects.select_related('sport').prefetch_related('related_rules')
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['sport', 'difficulty_level', 'category', 'is_legal', 'is_myth']
    search_fields = ['title', 'description', 'rule_id']
    ordering_fields = ['priority', 'created_at', 'title']
    ordering = ['-priority', 'title']
    lookup_field = 'rule_id'
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'retrieve':
            return RuleDetailSerializer
        return RuleListSerializer


class TechniqueViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Technique model.
    Supports filtering by sport, skill_type, difficulty.
    Supports searching by name and description.
    """
    queryset = Technique.objects.select_related('sport').prefetch_related('related_techniques')
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['sport', 'skill_type', 'difficulty_level']
    search_fields = ['name', 'description', 'technique_id']
    ordering_fields = ['difficulty_level', 'created_at', 'name']
    ordering = ['difficulty_level', 'name']
    lookup_field = 'technique_id'
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'retrieve':
            return TechniqueDetailSerializer
        return TechniqueListSerializer


class LearningSectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for LearningSection model.
    Returns sections with nested topics.
    """
    queryset = LearningSection.objects.prefetch_related('topics').all()
    serializer_class = LearningSectionSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['priority', 'title']
    ordering = ['priority', 'title']
    lookup_field = 'section_id'


class LearningTopicViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for LearningTopic model.
    Returns individual topics with full details.
    Supports filtering by section.
    """
    queryset = LearningTopic.objects.select_related('section').prefetch_related('related_topics')
    serializer_class = LearningTopicDetailSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['section']
    search_fields = ['title', 'description', 'topic_id']
    lookup_field = 'topic_id'
