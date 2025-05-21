from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views as authtoken_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('reminders.urls')),
    path('api/api-token-auth/', authtoken_views.obtain_auth_token, name='api_token_auth'),
]