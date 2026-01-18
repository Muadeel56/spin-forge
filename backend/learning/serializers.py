from rest_framework import serializers
from .models import Sport, Rule, Technique, LearningSection, LearningTopic


class SportSerializer(serializers.ModelSerializer):
    """Serializer for Sport model."""
    
    class Meta:
        model = Sport
        fields = ('id', 'name', 'slug', 'created_at')
        read_only_fields = ('id', 'created_at')


class RuleListSerializer(serializers.ModelSerializer):
    """Serializer for Rule list view."""
    sport_name = serializers.CharField(source='sport.name', read_only=True)
    related_rules_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Rule
        fields = (
            'id', 'rule_id', 'title', 'description', 'sport', 'sport_name',
            'category', 'is_myth', 'difficulty_level', 'priority',
            'is_legal', 'related_rules_count', 'created_at'
        )
        read_only_fields = ('id', 'created_at')
    
    def get_related_rules_count(self, obj):
        """Return count of related rules."""
        return obj.related_rules.count()


class RuleDetailSerializer(serializers.ModelSerializer):
    """Serializer for Rule detail view with full information."""
    sport_name = serializers.CharField(source='sport.name', read_only=True)
    related_rules = serializers.SerializerMethodField()
    
    class Meta:
        model = Rule
        fields = (
            'id', 'rule_id', 'title', 'description', 'sport', 'sport_name',
            'category', 'is_myth', 'difficulty_level', 'priority', 'is_legal',
            'legal_text', 'legal_details', 'illegal_text', 'illegal_details',
            'why_this_rule', 'related_rules', 'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'created_at', 'updated_at')
    
    def get_related_rules(self, obj):
        """Return list of related rules with basic info."""
        related = obj.related_rules.all()[:5]  # Limit to 5 related rules
        return [{
            'id': rule.id,
            'rule_id': rule.rule_id,
            'title': rule.title,
            'category': rule.category
        } for rule in related]


class TechniqueListSerializer(serializers.ModelSerializer):
    """Serializer for Technique list view."""
    sport_name = serializers.CharField(source='sport.name', read_only=True)
    related_techniques_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Technique
        fields = (
            'id', 'technique_id', 'name', 'description', 'sport', 'sport_name',
            'skill_type', 'difficulty_level', 'media_url',
            'related_techniques_count', 'created_at'
        )
        read_only_fields = ('id', 'created_at')
    
    def get_related_techniques_count(self, obj):
        """Return count of related techniques."""
        return obj.related_techniques.count()


class TechniqueDetailSerializer(serializers.ModelSerializer):
    """Serializer for Technique detail view with full information."""
    sport_name = serializers.CharField(source='sport.name', read_only=True)
    related_techniques = serializers.SerializerMethodField()
    
    class Meta:
        model = Technique
        fields = (
            'id', 'technique_id', 'name', 'description', 'sport', 'sport_name',
            'skill_type', 'difficulty_level', 'content', 'media_url',
            'key_tips', 'common_mistakes', 'related_techniques',
            'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'created_at', 'updated_at')
    
    def get_related_techniques(self, obj):
        """Return list of related techniques with basic info."""
        related = obj.related_techniques.all()[:5]  # Limit to 5 related techniques
        return [{
            'id': technique.id,
            'technique_id': technique.technique_id,
            'name': technique.name,
            'skill_type': technique.skill_type
        } for technique in related]


class LearningTopicSerializer(serializers.ModelSerializer):
    """Serializer for LearningTopic within a section."""
    related_topics_count = serializers.SerializerMethodField()
    
    class Meta:
        model = LearningTopic
        fields = (
            'id', 'topic_id', 'title', 'description',
            'related_topics_count', 'ctas'
        )
        read_only_fields = ('id',)
    
    def get_related_topics_count(self, obj):
        """Return count of related topics."""
        return obj.related_topics.count()


class LearningSectionSerializer(serializers.ModelSerializer):
    """Serializer for LearningSection with nested topics."""
    topics = LearningTopicSerializer(many=True, read_only=True)
    topics_count = serializers.SerializerMethodField()
    
    class Meta:
        model = LearningSection
        fields = (
            'id', 'section_id', 'title', 'description', 'icon', 'color',
            'priority', 'topics_count', 'topics', 'created_at'
        )
        read_only_fields = ('id', 'created_at')
    
    def get_topics_count(self, obj):
        """Return count of topics in this section."""
        return obj.topics.count()


class LearningTopicDetailSerializer(serializers.ModelSerializer):
    """Serializer for individual LearningTopic detail view."""
    section_title = serializers.CharField(source='section.title', read_only=True)
    section_id = serializers.CharField(source='section.section_id', read_only=True)
    related_topics = serializers.SerializerMethodField()
    
    class Meta:
        model = LearningTopic
        fields = (
            'id', 'topic_id', 'title', 'description', 'section', 'section_title',
            'section_id', 'content', 'key_tips', 'common_mistakes',
            'related_topics', 'ctas', 'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'created_at', 'updated_at')
    
    def get_related_topics(self, obj):
        """Return list of related topics with basic info."""
        related = obj.related_topics.all()[:5]  # Limit to 5 related topics
        return [{
            'id': topic.id,
            'topic_id': topic.topic_id,
            'title': topic.title,
            'section_title': topic.section.title
        } for topic in related]
