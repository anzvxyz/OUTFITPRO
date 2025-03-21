from django.contrib import admin
from .models import UserProfile, ClothingItem, Outfit, SavedOutfit, StylePreference

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio')
    search_fields = ('user__username', 'user__email')

@admin.register(ClothingItem)
class ClothingItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'category', 'color', 'pattern', 'season')
    list_filter = ('category', 'color', 'pattern', 'season')
    search_fields = ('name', 'user__username')

@admin.register(Outfit)
class OutfitAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'occasion', 'season', 'ai_score')
    list_filter = ('occasion', 'season')
    search_fields = ('name', 'user__username')

@admin.register(SavedOutfit)
class SavedOutfitAdmin(admin.ModelAdmin):
    list_display = ('outfit', 'user', 'date_saved')
    list_filter = ('date_saved',)
    search_fields = ('outfit__name', 'user__username')

@admin.register(StylePreference)
class StylePreferenceAdmin(admin.ModelAdmin):
    list_display = ('user', 'style_preference', 'casual_formal_balance')
    list_filter = ('style_preference',)
    search_fields = ('user__username',)
