import numpy as np
import pandas as pd
from PIL import Image
import io
import random
from sklearn.cluster import KMeans
from collections import Counter

# Define color mapping for dominant colors
COLOR_MAP = {
    'black': [(0, 0, 0), (50, 50, 50)],
    'white': [(200, 200, 200), (255, 255, 255)],
    'gray': [(100, 100, 100), (150, 150, 150)],
    'red': [(150, 0, 0), (255, 50, 50)],
    'blue': [(0, 0, 150), (50, 50, 255)],
    'green': [(0, 150, 0), (50, 255, 50)],
    'yellow': [(200, 200, 0), (255, 255, 50)],
    'purple': [(150, 0, 150), (255, 50, 255)],
    'pink': [(255, 150, 150), (255, 200, 200)],
    'brown': [(150, 75, 0), (200, 100, 50)],
    'orange': [(255, 100, 0), (255, 150, 50)],
}

# Pattern detection thresholds
PATTERN_VARIANCE_THRESHOLDS = {
    'solid': 0.05,
    'striped': 0.2,
    'plaid': 0.3,
    'floral': 0.4,
    'polka_dot': 0.25,
    'graphic': 0.35,
}

def analyze_image(image_file):
    """Analyze clothing item image to detect color and pattern"""
    try:
        # Open image and convert to RGB
        img = Image.open(image_file)
        img = img.convert('RGB')
        
        # Resize for faster processing
        img = img.resize((100, 100))
        
        # Convert image to numpy array
        img_array = np.array(img)
        
        # Reshape for clustering
        pixels = img_array.reshape(-1, 3)
        
        # Use K-means to find dominant colors
        kmeans = KMeans(n_clusters=5, random_state=42, n_init=10)
        kmeans.fit(pixels)
        
        # Get the dominant colors
        dominant_colors = kmeans.cluster_centers_.astype(int)
        
        # Count pixels in each cluster
        labels_count = Counter(kmeans.labels_)
        
        # Sort by count
        dominant_color_counts = [(dominant_colors[i], count) for i, count in labels_count.items()]
        dominant_color_counts.sort(key=lambda x: x[1], reverse=True)
        
        # Map dominant color to our color categories
        detected_color = map_color_to_category(dominant_color_counts[0][0])
        
        # Detect pattern
        detected_pattern = detect_pattern(img_array)
        
        return {
            'color': detected_color,
            'pattern': detected_pattern
        }
    except Exception as e:
        print(f"Error analyzing image: {e}")
        return {}

def map_color_to_category(rgb_color):
    """Map RGB color to predefined color category"""
    min_distance = float('inf')
    closest_color = 'other'
    
    for color_name, color_ranges in COLOR_MAP.items():
        for color_range in color_ranges:
            distance = np.sqrt(sum((rgb_color - color_range) ** 2))
            if distance < min_distance:
                min_distance = distance
                closest_color = color_name
    
    return closest_color

def detect_pattern(img_array):
    """Detect pattern in image using variance analysis"""
    # Calculate variance in different regions of the image
    h, w, _ = img_array.shape
    
    # Divide image into regions
    regions = [
        img_array[:h//2, :w//2],  # top-left
        img_array[:h//2, w//2:],   # top-right
        img_array[h//2:, :w//2],   # bottom-left
        img_array[h//2:, w//2:],   # bottom-right
    ]
    
    # Calculate variance for each region
    variances = [np.var(region) for region in regions]
    avg_variance = np.mean(variances)
    variance_ratio = np.std(variances) / (avg_variance + 1e-10)  # Avoid division by zero
    
    # Determine pattern based on variance
    if variance_ratio < PATTERN_VARIANCE_THRESHOLDS['solid']:
        return 'solid'
    elif variance_ratio < PATTERN_VARIANCE_THRESHOLDS['striped']:
        return 'striped'
    elif variance_ratio < PATTERN_VARIANCE_THRESHOLDS['polka_dot']:
        return 'polka_dot'
    elif variance_ratio < PATTERN_VARIANCE_THRESHOLDS['plaid']:
        return 'plaid'
    elif variance_ratio < PATTERN_VARIANCE_THRESHOLDS['graphic']:
        return 'graphic'
    else:
        return 'floral'

def generate_outfit_suggestions(items, style_prefs):
    """Generate outfit suggestions based on user's wardrobe and preferences"""
    # Convert QuerySet to list for easier manipulation
    items_list = list(items)
    
    if len(items_list) < 2:
        return []
    
    # Get user preferences
    favorite_colors = style_prefs.get_favorite_colors()
    preferred_patterns = style_prefs.get_preferred_patterns()
    style_preference = style_prefs.style_preference
    casual_formal_balance = style_prefs.casual_formal_balance
    seasonal_prefs = style_prefs.get_seasonal_preferences()
    occasion_prefs = style_prefs.get_occasion_preferences()
    
    # Determine seasons to prioritize based on preferences
    prioritized_seasons = []
    for season, is_preferred in seasonal_prefs.items():
        if is_preferred:
            prioritized_seasons.append(season)
    
    if not prioritized_seasons:
        prioritized_seasons = ['spring', 'summer', 'fall', 'winter']
    
    # Determine occasions to prioritize
    prioritized_occasions = occasion_prefs if occasion_prefs else ['casual', 'formal', 'business']
    
    # Generate outfit suggestions
    suggestions = []
    num_suggestions = min(6, len(items_list) // 2 + 1)  # Generate up to 6 suggestions
    
    for i in range(num_suggestions):
        # Randomly select a season and occasion from priorities
        season = random.choice(prioritized_seasons)
        occasion = random.choice(prioritized_occasions)
        
        # Filter items by season (include 'all' season items)
        seasonal_items = [item for item in items_list if item.season == season or item.season == 'all']
        
        if len(seasonal_items) < 2:
            seasonal_items = items_list  # Fallback to all items if not enough seasonal items
        
        # Determine number of items for this outfit (2-4 items)
        num_items = min(random.randint(2, 4), len(seasonal_items))
        
        # Select items for the outfit
        outfit_items = select_compatible_items(seasonal_items, num_items, favorite_colors, preferred_patterns)
        
        if not outfit_items or len(outfit_items) < 2:
            continue  # Skip if we couldn't find compatible items
        
        # Generate outfit name
        outfit_name = generate_outfit_name(outfit_items, occasion, season)
        
        # Generate style notes
        style_notes = generate_style_notes(outfit_items, occasion, season)
        
        # Calculate AI score
        ai_score = calculate_outfit_score(outfit_items, favorite_colors, preferred_patterns, occasion, season)
        
        # Create suggestion
        suggestion = {
            'name': outfit_name,
            'items': [item.id for item in outfit_items],
            'occasion': occasion,
            'season': season,
            'style': style_preference,
            'style_notes': style_notes,
            'ai_score': ai_score
        }
        
        suggestions.append(suggestion)
    
    return suggestions

def select_compatible_items(items, num_items, favorite_colors, preferred_patterns):
    """Select compatible items for an outfit"""
    # Group items by category
    categories = {}
    for item in items:
        if item.category not in categories:
            categories[item.category] = []
        categories[item.category].append(item)
    
    # Ensure we have at least 2 different categories
    if len(categories) < 2:
        return []
    
    # Select one item from each category until we have enough
    selected_items = []
    selected_categories = []
    
    # Prioritize essential categories: tops and bottoms
    essential_categories = ['tops', 'bottoms']
    for category in essential_categories:
        if category in categories and categories[category]:
            # Prioritize favorite colors and patterns
            category_items = categories[category]
            preferred_items = [item for item in category_items 
                              if item.color in favorite_colors or item.pattern in preferred_patterns]
            
            if preferred_items:
                selected_item = random.choice(preferred_items)
            else:
                selected_item = random.choice(category_items)
            
            selected_items.append(selected_item)
            selected_categories.append(category)
    
    # If we still need more items, add from other categories
    remaining_categories = [cat for cat in categories.keys() if cat not in selected_categories]
    
    while len(selected_items) < num_items and remaining_categories:
        category = random.choice(remaining_categories)
        remaining_categories.remove(category)
        
        if categories[category]:
            selected_item = random.choice(categories[category])
            selected_items.append(selected_item)
    
    return selected_items

def generate_outfit_name(items, occasion, season):
    """Generate a name for the outfit"""
    occasion_adjectives = {
        'casual': ['Relaxed', 'Casual', 'Everyday', 'Laid-back'],
        'formal': ['Elegant', 'Formal', 'Sophisticated', 'Polished'],
        'business': ['Professional', 'Business', 'Office-ready', 'Work'],
        'party': ['Festive', 'Party', 'Celebration', 'Night-out'],
        'date': ['Romantic', 'Date Night', 'Evening', 'Charming'],
        'workout': ['Active', 'Workout', 'Fitness', 'Athletic'],
    }
    
    season_adjectives = {
        'spring': ['Spring', 'Fresh', 'Blooming'],
        'summer': ['Summer', 'Sunny', 'Vibrant'],
        'fall': ['Fall', 'Autumn', 'Cozy'],
        'winter': ['Winter', 'Warm', 'Cozy'],
        'all': ['All-season', 'Versatile', 'Year-round'],
    }
    
    # Get adjectives for this occasion and season
    occasion_adj = random.choice(occasion_adjectives.get(occasion, ['Stylish']))
    season_adj = random.choice(season_adjectives.get(season, ['Seasonal']))
    
    # Generate name
    return f"{occasion_adj} {season_adj} Ensemble"

def generate_style_notes(items, occasion, season):
    """Generate style notes for the outfit"""
    # Get item categories and colors
    categories = [item.category for item in items]
    colors = [item.color for item in items]
    
    # Generate notes about color harmony
    color_note = generate_color_harmony_note(colors)
    
    # Generate occasion-specific note
    occasion_notes = {
        'casual': "This relaxed outfit is perfect for everyday wear, offering both comfort and style.",
        'formal': "This elegant ensemble is suitable for formal events, creating a sophisticated look.",
        'business': "This professional outfit projects confidence and competence in the workplace.",
        'party': "This festive combination is ideal for social gatherings and celebrations.",
        'date': "This charming outfit creates the perfect impression for a special evening out.",
        'workout': "This functional outfit provides comfort and performance for your active lifestyle.",
    }
    
    occasion_note = occasion_notes.get(occasion, "This versatile outfit works well for various occasions.")
    
    # Generate season-specific note
    season_notes = {
        'spring': "The light layers and fresh colors are perfect for spring weather.",
        'summer': "The breathable fabrics and vibrant tones are ideal for warm summer days.",
        'fall': "The rich colors and layering options work well for the transitional fall season.",
        'winter': "The warm fabrics and cozy layers will keep you stylish during cold winter days.",
        'all': "This versatile combination works well year-round with appropriate accessories.",
    }
    
    season_note = season_notes.get(season, "This outfit is suitable for the current season.")
    
    # Combine notes
    style_notes = f"{occasion_note} {season_note} {color_note}"
    
    return style_notes

def generate_color_harmony_note(colors):
    """Generate a note about color harmony"""
    if len(set(colors)) == 1:
        return "The monochromatic color scheme creates a sleek, unified look."
    elif len(set(colors)) == 2:
        return "The complementary colors create a balanced and visually appealing combination."
    else:
        return "The thoughtful color combination creates a harmonious and coordinated look."

def calculate_outfit_score(items, favorite_colors, preferred_patterns, occasion, season):
    """Calculate an AI score for the outfit"""
    base_score = 70  # Start with a base score
    
    # Add points for favorite colors
    color_score = sum(10 if item.color in favorite_colors else 0 for item in items) / len(items)
    
    # Add points for preferred patterns
    pattern_score = sum(10 if item.pattern in preferred_patterns else 0 for item in items) / len(items)
    
    # Add points for category balance (having both tops and bottoms)
    categories = [item.category for item in items]
    category_score = 10 if 'tops' in categories and 'bottoms' in categories else 0
    
    # Calculate final score
    final_score = base_score + color_score + pattern_score + category_score
    
    # Cap at 100
    return min(int(final_score), 100)
