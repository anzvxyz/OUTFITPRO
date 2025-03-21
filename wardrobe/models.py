from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import json

CATEGORY_CHOICES = [
    ('tops', 'Tops'),
    ('bottoms', 'Bottoms'),
    ('dresses', 'Dresses'),
    ('outerwear', 'Outerwear'),
    ('shoes', 'Shoes'),
    ('accessories', 'Accessories'),
]

COLOR_CHOICES = [
    ('black', 'Black'),
    ('white', 'White'),
    ('gray', 'Gray'),
    ('blue', 'Blue'),
    ('red', 'Red'),
    ('green', 'Green'),
    ('yellow', 'Yellow'),
    ('purple', 'Purple'),
    ('pink', 'Pink'),
    ('brown', 'Brown'),
    ('orange', 'Orange'),
    ('multi', 'Multi'),
]

PATTERN_CHOICES = [
    ('solid', 'Solid'),
    ('striped', 'Striped'),
    ('plaid', 'Plaid'),
    ('floral', 'Floral'),
    ('polka_dot', 'Polka Dot'),
    ('graphic', 'Graphic'),
    ('other', 'Other'),
]

SEASON_CHOICES = [
    ('spring', 'Spring'),
    ('summer', 'Summer'),
    ('fall', 'Fall'),
    ('winter', 'Winter'),
    ('all', 'All Seasons'),
]

OCCASION_CHOICES = [
    ('casual', 'Casual'),
    ('formal', 'Formal'),
    ('business', 'Business'),
    ('party', 'Party'),
    ('date', 'Date Night'),
    ('workout', 'Workout'),
    ('beach', 'Beach'),
    ('everyday', 'Everyday'),
]

STYLE_CHOICES = [
    ('casual', 'Casual'),
    ('formal', 'Formal'),
    ('sporty', 'Sporty'),
    ('vintage', 'Vintage'),
    ('minimalist', 'Minimalist'),
    ('bohemian', 'Bohemian'),
    ('streetwear', 'Streetwear'),
    ('business', 'Business'),
]

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    avatar = models.ImageField(default='default.jpg', upload_to='profile_pics')
    
    def __str__(self):
        return f'{self.user.username} Profile'

class ClothingItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    color = models.CharField(max_length=20, choices=COLOR_CHOICES)
    pattern = models.CharField(max_length=20, choices=PATTERN_CHOICES)
    season = models.CharField(max_length=20, choices=SEASON_CHOICES)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='clothing_items')
    date_added = models.DateTimeField(default=timezone.now)
    favorite = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name

class Outfit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    items = models.ManyToManyField(ClothingItem)
    occasion = models.CharField(max_length=20, choices=OCCASION_CHOICES)
    season = models.CharField(max_length=20, choices=SEASON_CHOICES)
    style = models.CharField(max_length=20, choices=STYLE_CHOICES, default='casual')
    style_notes = models.TextField(blank=True)
    ai_score = models.IntegerField(default=0)  # 0-100 score
    date_created = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.name

class SavedOutfit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    outfit = models.ForeignKey(Outfit, on_delete=models.CASCADE)
    date_saved = models.DateTimeField(default=timezone.now)
    
    class Meta:
        unique_together = ('user', 'outfit')
    
    def __str__(self):
        return f'{self.user.username} - {self.outfit.name}'

class StylePreference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorite_colors = models.CharField(max_length=255, blank=True)  # Stored as JSON
    preferred_patterns = models.CharField(max_length=255, blank=True)  # Stored as JSON
    style_preference = models.CharField(max_length=20, choices=STYLE_CHOICES, default='casual')
    casual_formal_balance = models.IntegerField(default=50)  # 0-100 scale
    seasonal_preferences = models.CharField(max_length=255, blank=True)  # Stored as JSON
    occasion_preferences = models.CharField(max_length=255, blank=True)  # Stored as JSON
    sustainability_focus = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.user.username} Style Preferences'
    
    def set_favorite_colors(self, colors_list):
        self.favorite_colors = json.dumps(colors_list)
    
    def get_favorite_colors(self):
        return json.loads(self.favorite_colors) if self.favorite_colors else []
    
    def set_preferred_patterns(self, patterns_list):
        self.preferred_patterns = json.dumps(patterns_list)
    
    def get_preferred_patterns(self):
        return json.loads(self.preferred_patterns) if self.preferred_patterns else []
    
    def set_seasonal_preferences(self, seasons_dict):
        self.seasonal_preferences = json.dumps(seasons_dict)
    
    def get_seasonal_preferences(self):
        return json.loads(self.seasonal_preferences) if self.seasonal_preferences else {}
    
    def set_occasion_preferences(self, occasions_list):
        self.occasion_preferences = json.dumps(occasions_list)
    
    def get_occasion_preferences(self):
        return json.loads(self.occasion_preferences) if self.occasion_preferences else []
