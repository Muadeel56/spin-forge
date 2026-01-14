from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'display_name', 'playing_level', 'forehand_rating', 'backhand_rating', 'serve_rating', 'footwork_rating', 'created_at')
    list_filter = ('playing_level', 'created_at')
    search_fields = ('user__username', 'user__email', 'display_name')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('User Information', {
            'fields': ('user', 'display_name', 'bio')
        }),
        ('Playing Information', {
            'fields': ('playing_level',)
        }),
        ('Skill Ratings', {
            'fields': ('forehand_rating', 'backhand_rating', 'serve_rating', 'footwork_rating')
        }),
        ('Additional Information', {
            'fields': ('avatar', 'location', 'website')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
