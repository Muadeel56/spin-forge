from django.db import models
from django.utils.text import slugify


class Sport(models.Model):
    """
    Sport model for categorizing learning content.
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'sports'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Rule(models.Model):
    """
    Rule model for table tennis rules and legality information.
    """
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    CATEGORY_CHOICES = [
        ('serving', 'Serving'),
        ('scoring', 'Scoring'),
        ('format', 'Format'),
        ('fault', 'Fault'),
        ('myth', 'Myth'),
    ]

    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, related_name='rules')
    rule_id = models.CharField(max_length=100, unique=True, help_text="Unique identifier (e.g., 'ball-toss-height')")
    title = models.CharField(max_length=200)
    description = models.TextField()
    is_legal = models.BooleanField(default=True, help_text="Whether this describes a legal or illegal action")
    difficulty_level = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='beginner')
    legal_text = models.TextField(help_text="Short description of legal action")
    legal_details = models.TextField(help_text="Detailed explanation of legal action")
    illegal_text = models.TextField(help_text="Short description of illegal action")
    illegal_details = models.TextField(help_text="Detailed explanation of illegal action")
    why_this_rule = models.TextField(help_text="Explanation of why this rule exists")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    is_myth = models.BooleanField(default=False, help_text="Whether this is a myth-busting rule")
    priority = models.IntegerField(default=0, help_text="Display priority (higher = shown first)")
    related_rules = models.ManyToManyField('self', blank=True, symmetrical=False, related_name='related_to')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'rules'
        ordering = ['-priority', 'title']
        indexes = [
            models.Index(fields=['category']),
            models.Index(fields=['is_myth']),
            models.Index(fields=['difficulty_level']),
        ]

    def __str__(self):
        return f"{self.title} ({self.sport.name})"


class Technique(models.Model):
    """
    Technique model for table tennis shots and techniques.
    """
    SKILL_TYPE_CHOICES = [
        ('forehand', 'Forehand'),
        ('backhand', 'Backhand'),
        ('serve', 'Serve'),
        ('footwork', 'Footwork'),
        ('general', 'General'),
    ]

    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, related_name='techniques')
    technique_id = models.CharField(max_length=100, unique=True, help_text="Unique identifier (e.g., 'forehand-drive')")
    name = models.CharField(max_length=200)
    description = models.TextField()
    skill_type = models.CharField(max_length=20, choices=SKILL_TYPE_CHOICES)
    difficulty_level = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='beginner')
    content = models.TextField(help_text="Main technique content/explanation")
    media_url = models.URLField(blank=True, null=True, help_text="Optional video or image URL")
    key_tips = models.JSONField(default=list, help_text="Array of key tips")
    common_mistakes = models.JSONField(default=list, help_text="Array of common mistakes")
    related_techniques = models.ManyToManyField('self', blank=True, symmetrical=False, related_name='related_to')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'techniques'
        ordering = ['difficulty_level', 'name']
        indexes = [
            models.Index(fields=['skill_type']),
            models.Index(fields=['difficulty_level']),
        ]

    def __str__(self):
        return f"{self.name} - {self.skill_type} ({self.sport.name})"


class LearningSection(models.Model):
    """
    LearningSection model for organizing learning topics into sections.
    """
    COLOR_CHOICES = [
        ('primary', 'Primary'),
        ('accent', 'Accent'),
    ]

    section_id = models.CharField(max_length=100, unique=True, help_text="Unique identifier (e.g., 'getting-started')")
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, help_text="Emoji or icon name")
    color = models.CharField(max_length=20, choices=COLOR_CHOICES, default='primary')
    priority = models.IntegerField(default=0, help_text="Display priority (lower = shown first)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'learning_sections'
        ordering = ['priority', 'title']

    def __str__(self):
        return self.title


class LearningTopic(models.Model):
    """
    LearningTopic model for individual learning articles/topics.
    """
    section = models.ForeignKey(LearningSection, on_delete=models.CASCADE, related_name='topics')
    topic_id = models.CharField(max_length=100, unique=True, help_text="Unique identifier (e.g., 'forehand-drive')")
    title = models.CharField(max_length=200)
    description = models.TextField()
    content = models.TextField(help_text="Main content/article text")
    key_tips = models.JSONField(default=list, help_text="Array of key tips")
    common_mistakes = models.JSONField(default=list, help_text="Array of common mistakes")
    related_topics = models.ManyToManyField('self', blank=True, symmetrical=False, related_name='related_to')
    ctas = models.JSONField(default=dict, help_text="Call-to-action flags (practice, community, struggles)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'learning_topics'
        ordering = ['section__priority', 'title']
        indexes = [
            models.Index(fields=['section']),
        ]

    def __str__(self):
        return f"{self.title} ({self.section.title})"
