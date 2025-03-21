from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import UserProfile, ClothingItem, Outfit, StylePreference, CATEGORY_CHOICES, COLOR_CHOICES, PATTERN_CHOICES, SEASON_CHOICES, OCCASION_CHOICES, STYLE_CHOICES

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()
    
    class Meta:
        model = User
        fields = ['username', 'email']

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['bio', 'avatar']

class ClothingItemForm(forms.ModelForm):
    class Meta:
        model = ClothingItem
        fields = ['name', 'category', 'color', 'pattern', 'season', 'description', 'image', 'favorite']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 3}),
        }

class OutfitForm(forms.ModelForm):
    class Meta:
        model = Outfit
        fields = ['name', 'items', 'occasion', 'season', 'style', 'style_notes']
        widgets = {
            'items': forms.CheckboxSelectMultiple(),
            'style_notes': forms.Textarea(attrs={'rows': 3}),
        }

class StylePreferenceForm(forms.ModelForm):
    FAVORITE_COLORS = [
        ('black', 'Black'),
        ('white', 'White'),
        ('gray', 'Gray'),
        ('blue', 'Blue'),
        ('red', 'Red'),
        ('green', 'Green'),
        ('yellow', 'Yellow'),
        ('purple', 'Purple'),
    ]
    
    PATTERN_CHOICES = [
        ('solid', 'Solid'),
        ('stripes', 'Stripes'),
        ('plaid', 'Plaid'),
        ('floral', 'Floral'),
        ('polka-dots', 'Polka Dots'),
        ('minimal', 'Minimal'),
    ]
    
    OCCASION_CHOICES = [
        ('everyday', 'Everyday'),
        ('work', 'Work'),
        ('formal-events', 'Formal Events'),
        ('casual-outings', 'Casual Outings'),
        ('date-night', 'Date Night'),
        ('workout', 'Workout'),
    ]
    
    favorite_colors = forms.MultipleChoiceField(
        choices=FAVORITE_COLORS,
        widget=forms.CheckboxSelectMultiple(),
        required=False
    )
    
    preferred_patterns = forms.MultipleChoiceField(
        choices=PATTERN_CHOICES,
        widget=forms.CheckboxSelectMultiple(),
        required=False
    )
    
    spring = forms.BooleanField(required=False)
    summer = forms.BooleanField(required=False)
    fall = forms.BooleanField(required=False)
    winter = forms.BooleanField(required=False)
    
    occasion_preferences = forms.MultipleChoiceField(
        choices=OCCASION_CHOICES,
        widget=forms.CheckboxSelectMultiple(),
        required=False
    )
    
    class Meta:
        model = StylePreference
        fields = ['style_preference', 'casual_formal_balance', 'sustainability_focus']
        widgets = {
            'casual_formal_balance': forms.NumberInput(attrs={'type': 'range', 'min': 0, 'max': 100, 'step': 10}),
        }
    
    def __init__(self, *args, **kwargs):
        instance = kwargs.get('instance', None)
        super(StylePreferenceForm, self).__init__(*args, **kwargs)
        
        if instance:
            # Set initial values for favorite colors
            self.fields['favorite_colors'].initial = instance.get_favorite_colors()
            
            # Set initial values for preferred patterns
            self.fields['preferred_patterns'].initial = instance.get_preferred_patterns()
            
            # Set initial values for seasonal preferences
            seasonal_prefs = instance.get_seasonal_preferences()
            self.fields['spring'].initial = seasonal_prefs.get('spring', False)
            self.fields['summer'].initial = seasonal_prefs.get('summer', False)
            self.fields['fall'].initial = seasonal_prefs.get('fall', False)
            self.fields['winter'].initial = seasonal_prefs.get('winter', False)
            
            # Set initial values for occasion preferences
            self.fields['occasion_preferences'].initial = instance.get_occasion_preferences()
    
    def save(self, commit=True):
        instance = super(StylePreferenceForm, self).save(commit=False)
        
        # Save favorite colors
        instance.set_favorite_colors(self.cleaned_data.get('favorite_colors', []))
        
        # Save preferred patterns
        instance.set_preferred_patterns(self.cleaned_data.get('preferred_patterns', []))
        
        # Save seasonal preferences
        seasonal_prefs = {
            'spring': self.cleaned_data.get('spring', False),
            'summer': self.cleaned_data.get('summer', False),
            'fall': self.cleaned_data.get('fall', False),
            'winter': self.cleaned_data.get('winter', False),
        }
        instance.set_seasonal_preferences(seasonal_prefs)
        
        # Save occasion preferences
        instance.set_occasion_preferences(self.cleaned_data.get('occasion_preferences', []))
        
        if commit:
            instance.save()
        return instance
