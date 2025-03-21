from django.urls import path
from . import views

urlpatterns = [
    path('', views.wardrobe_home, name='wardrobe-home'),
    path('item/new/', views.add_item, name='add-item'),
    path('item/<int:pk>/', views.item_detail, name='item-detail'),
    path('item/<int:pk>/update/', views.update_item, name='update-item'),
    path('item/<int:pk>/delete/', views.delete_item, name='delete-item'),
    path('outfit-suggestions/', views.outfit_suggestions, name='outfit-suggestions'),
    path('outfit/<int:pk>/', views.outfit_detail, name='outfit-detail'),
    path('outfit/<int:pk>/save/', views.save_outfit, name='save-outfit'),
    path('outfit/<int:pk>/delete/', views.delete_outfit, name='delete-outfit'),
    path('saved-outfits/', views.saved_outfits, name='saved-outfits'),
    path('profile/', views.profile, name='profile'),
    path('style-preferences/', views.style_preferences, name='style-preferences'),
    path('generate-suggestions/', views.generate_suggestions, name='generate-suggestions'),
]
