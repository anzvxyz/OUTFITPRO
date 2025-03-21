from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from wardrobe import views as wardrobe_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', wardrobe_views.home, name='home'),
    path('register/', wardrobe_views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='wardrobe/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='wardrobe/logout.html'), name='logout'),
    path('dashboard/', wardrobe_views.dashboard, name='dashboard'),
    path('wardrobe/', include('wardrobe.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
