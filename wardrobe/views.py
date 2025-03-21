from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm, ClothingItemForm, OutfitForm, StylePreferenceForm
from .models import UserProfile, ClothingItem, Outfit, SavedOutfit, StylePreference
from .ml_utils import analyze_image, generate_outfit_suggestions

def home(request):
    """Home page view"""
    return render(request, 'wardrobe/home.html')

def register(request):
    """User registration view"""
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Create user profile
            UserProfile.objects.create(user=user)
            # Create style preferences
            StylePreference.objects.create(user=user)
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}! You can now log in.')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'wardrobe/register.html', {'form': form})

@login_required
def dashboard(request):
    """User dashboard view"""
    # Get user's wardrobe stats
    wardrobe_count = ClothingItem.objects.filter(user=request.user).count()
    recent_items = ClothingItem.objects.filter(user=request.user).order_by('-date_added')[:4]
    saved_outfits = SavedOutfit.objects.filter(user=request.user).order_by('-date_saved')[:2]
    
    # Get outfit suggestions
    outfit_suggestions = Outfit.objects.filter(user=request.user).order_by('-ai_score')[:3]
    
    # Calculate style score based on wardrobe variety
    style_score = calculate_style_score(request.user)
    
    context = {
        'wardrobe_count': wardrobe_count,
        'recent_items': recent_items,
        'saved_outfits': saved_outfits,
        'outfit_suggestions': outfit_suggestions,
        'style_score': style_score,
    }
    return render(request, 'wardrobe/dashboard.html', context)

def calculate_style_score(user):
    """Calculate a style score based on wardrobe variety"""
    # This is a simple implementation - in a real app, this would be more sophisticated
    items = ClothingItem.objects.filter(user=user)
    
    if not items:
        return 0
    
    # Count unique categories, colors, patterns
    categories = set(items.values_list('category', flat=True))
    colors = set(items.values_list('color', flat=True))
    patterns = set(items.values_list('pattern', flat=True))
    
    # Calculate score based on variety
    category_score = min(len(categories) * 10, 30)  # Max 30 points
    color_score = min(len(colors) * 5, 30)  # Max 30 points
    pattern_score = min(len(patterns) * 10, 30)  # Max 30 points
    
    # Add bonus for having items in each season
    seasons = set(items.values_list('season', flat=True))
    season_score = min(len(seasons) * 2.5, 10)  # Max 10 points
    
    total_score = category_score + color_score + pattern_score + season_score
    return int(total_score)

@login_required
def wardrobe_home(request):
    """View for browsing wardrobe items"""
    items = ClothingItem.objects.filter(user=request.user).order_by('-date_added')
    
    # Filter handling
    category = request.GET.get('category')
    color = request.GET.get('color')
    pattern = request.GET.get('pattern')
    season = request.GET.get('season')
    
    if category and category != 'All':
        items = items.filter(category=category.lower())
    if color and color != 'All':
        items = items.filter(color=color.lower())
    if pattern and pattern != 'All':
        items = items.filter(pattern=pattern.lower())
    if season and season != 'All':
        items = items.filter(season=season.lower())
    
    context = {
        'items': items,
        'selected_category': category,
        'selected_color': color,
        'selected_pattern': pattern,
        'selected_season': season,
    }
    return render(request, 'wardrobe/wardrobe_home.html', context)

@login_required
def add_item(request):
    """View for adding a new clothing item"""
    if request.method == 'POST':
        form = ClothingItemForm(request.POST, request.FILES)
        if form.is_valid():
            # Save the item but don't commit to DB yet
            item = form.save(commit=False)
            item.user = request.user
            
            # If image is provided, analyze it with ML
            if 'image' in request.FILES:
                image = request.FILES['image']
                # Analyze image to detect color and pattern
                analysis_results = analyze_image(image)
                
                # Update form with ML analysis results if available
                if analysis_results.get('color'):
                    item.color = analysis_results['color']
                if analysis_results.get('pattern'):
                    item.pattern = analysis_results['pattern']
            
            item.save()
            messages.success(request, f'Item "{item.name}" has been added to your wardrobe!')
            return redirect('wardrobe-home')
    else:
        form = ClothingItemForm()
    
    return render(request, 'wardrobe/item_form.html', {'form': form, 'title': 'Add New Item'})

@login_required
def item_detail(request, pk):
    """View for viewing a clothing item's details"""
    item = get_object_or_404(ClothingItem, pk=pk, user=request.user)
    return render(request, 'wardrobe/item_detail.html', {'item': item})

@login_required
def update_item(request, pk):
    """View for updating a clothing item"""
    item = get_object_or_404(ClothingItem, pk=pk, user=request.user)
    
    if request.method == 'POST':
        form = ClothingItemForm(request.POST, request.FILES, instance=item)
        if form.is_valid():
            form.save()
            messages.success(request, f'Item "{item.name}" has been updated!')
            return redirect('item-detail', pk=item.pk)
    else:
        form = ClothingItemForm(instance=item)
    
    return render(request, 'wardrobe/item_form.html', {'form': form, 'title': 'Update Item'})

@login_required
def delete_item(request, pk):
    """View for deleting a clothing item"""
    item = get_object_or_404(ClothingItem, pk=pk, user=request.user)
    
    if request.method == 'POST':
        item_name = item.name
        item.delete()
        messages.success(request, f'Item "{item_name}" has been deleted!')
        return redirect('wardrobe-home')
    
    return render(request, 'wardrobe/item_confirm_delete.html', {'item': item})

@login_required
def outfit_suggestions(request):
    """View for outfit suggestions"""
    # Get all outfits for the user
    outfits = Outfit.objects.filter(user=request.user).order_by('-ai_score')
    
    # Filter handling
    occasion = request.GET.get('occasion')
    season = request.GET.get('season')
    style = request.GET.get('style')
    
    if occasion:
        outfits = outfits.filter(occasion=occasion.lower())
    if season:
        outfits = outfits.filter(season=season.lower())
    if style:
        outfits = outfits.filter(style=style.lower())
    
    context = {
        'outfits': outfits,
        'selected_occasion': occasion,
        'selected_season': season,
        'selected_style': style,
    }
    return render(request, 'wardrobe/outfit_suggestions.html', context)

@login_required
def generate_suggestions(request):
    """Generate new outfit suggestions using ML"""
    # Get user's clothing items
    items = ClothingItem.objects.filter(user=request.user)
    
    if items.count() < 2:
        messages.warning(request, 'You need at least 2 items in your wardrobe to generate outfit suggestions.')
        return redirect('wardrobe-home')
    
    # Get user's style preferences
    try:
        style_prefs = StylePreference.objects.get(user=request.user)
    except StylePreference.DoesNotExist:
        style_prefs = StylePreference.objects.create(user=request.user)
    
    # Generate outfit suggestions using ML
    suggestions = generate_outfit_suggestions(items, style_prefs)
    
    # Save the generated outfits
    for suggestion in suggestions:
        outfit = Outfit(
            user=request.user,
            name=suggestion['name'],
            occasion=suggestion['occasion'],
            season=suggestion['season'],
            style=suggestion['style'],
            style_notes=suggestion['style_notes'],
            ai_score=suggestion['ai_score']
        )
        outfit.save()
        
        # Add items to the outfit
        for item_id in suggestion['items']:
            outfit.items.add(item_id)
    
    messages.success(request, f'Generated {len(suggestions)} new outfit suggestions!')
    return redirect('outfit-suggestions')

@login_required
def outfit_detail(request, pk):
    """View for viewing an outfit's details"""
    outfit = get_object_or_404(Outfit, pk=pk, user=request.user)
    
    # Check if the outfit is saved
    is_saved = SavedOutfit.objects.filter(user=request.user, outfit=outfit).exists()
    
    context = {
        'outfit': outfit,
        'is_saved': is_saved,
    }
    return render(request, 'wardrobe/outfit_detail.html', context)

@login_required
def save_outfit(request, pk):
    """Save an outfit to user's saved outfits"""
    outfit = get_object_or_404(Outfit, pk=pk, user=request.user)
    
    # Check if already saved
    if not SavedOutfit.objects.filter(user=request.user, outfit=outfit).exists():
        SavedOutfit.objects.create(user=request.user, outfit=outfit)
        messages.success(request, f'Outfit "{outfit.name}" has been saved!')
    else:
        messages.info(request, f'Outfit "{outfit.name}" is already saved.')
    
    return redirect('outfit-detail', pk=outfit.pk)

@login_required
def delete_outfit(request, pk):
    """Delete an outfit"""
    outfit = get_object_or_404(Outfit, pk=pk, user=request.user)
    
    if request.method == 'POST':
        outfit_name = outfit.name
        outfit.delete()
        messages.success(request, f'Outfit "{outfit_name}" has been deleted!')
        return redirect('outfit-suggestions')
    
    return render(request, 'wardrobe/outfit_confirm_delete.html', {'outfit': outfit})

@login_required
def saved_outfits(request):
    """View for saved outfits"""
    saved = SavedOutfit.objects.filter(user=request.user).order_by('-date_saved')
    return render(request, 'wardrobe/saved_outfits.html', {'saved_outfits': saved})

@login_required
def profile(request):
    """User profile view"""
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.userprofile)
        
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, 'Your profile has been updated!')
            return redirect('profile')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.userprofile)
    
    context = {
        'u_form': u_form,
        'p_form': p_form,
    }
    return render(request, 'wardrobe/profile.html', context)

@login_required
def style_preferences(request):
    """View for setting style preferences"""
    try:
        style_prefs = StylePreference.objects.get(user=request.user)
    except StylePreference.DoesNotExist:
        style_prefs = StylePreference.objects.create(user=request.user)
    
    if request.method == 'POST':
        form = StylePreferenceForm(request.POST, instance=style_prefs)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your style preferences have been updated!')
            return redirect('dashboard')
    else:
        form = StylePreferenceForm(instance=style_prefs)
    
    return render(request, 'wardrobe/style_preferences.html', {'form': form})
