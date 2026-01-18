from django.contrib import admin
from .models import Sport, Rule, Technique, LearningSection, LearningTopic


@admin.register(Sport)
class SportAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Rule)
class RuleAdmin(admin.ModelAdmin):
    list_display = ('title', 'sport', 'category', 'is_myth', 'difficulty_level', 'priority')
    list_filter = ('sport', 'category', 'is_myth', 'difficulty_level')
    search_fields = ('title', 'description', 'rule_id')
    filter_horizontal = ('related_rules',)
    fieldsets = (
        ('Basic Information', {
            'fields': ('sport', 'rule_id', 'title', 'description', 'category', 'is_myth', 'difficulty_level', 'priority')
        }),
        ('Legal Information', {
            'fields': ('is_legal', 'legal_text', 'legal_details')
        }),
        ('Illegal Information', {
            'fields': ('illegal_text', 'illegal_details')
        }),
        ('Explanation', {
            'fields': ('why_this_rule',)
        }),
        ('Relationships', {
            'fields': ('related_rules',)
        }),
    )


@admin.register(Technique)
class TechniqueAdmin(admin.ModelAdmin):
    list_display = ('name', 'sport', 'skill_type', 'difficulty_level')
    list_filter = ('sport', 'skill_type', 'difficulty_level')
    search_fields = ('name', 'description', 'technique_id')
    filter_horizontal = ('related_techniques',)
    fieldsets = (
        ('Basic Information', {
            'fields': ('sport', 'technique_id', 'name', 'description', 'skill_type', 'difficulty_level')
        }),
        ('Content', {
            'fields': ('content', 'media_url')
        }),
        ('Tips & Mistakes', {
            'fields': ('key_tips', 'common_mistakes')
        }),
        ('Relationships', {
            'fields': ('related_techniques',)
        }),
    )


@admin.register(LearningSection)
class LearningSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'section_id', 'icon', 'color', 'priority')
    search_fields = ('title', 'description', 'section_id')
    list_editable = ('priority',)


@admin.register(LearningTopic)
class LearningTopicAdmin(admin.ModelAdmin):
    list_display = ('title', 'section', 'topic_id')
    list_filter = ('section',)
    search_fields = ('title', 'description', 'topic_id')
    filter_horizontal = ('related_topics',)
    fieldsets = (
        ('Basic Information', {
            'fields': ('section', 'topic_id', 'title', 'description')
        }),
        ('Content', {
            'fields': ('content',)
        }),
        ('Tips & Mistakes', {
            'fields': ('key_tips', 'common_mistakes')
        }),
        ('Settings', {
            'fields': ('ctas', 'related_topics')
        }),
    )
