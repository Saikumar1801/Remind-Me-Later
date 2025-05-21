from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReminderViewSet

router = DefaultRouter()
router.register(r'reminders', ReminderViewSet, basename='reminder')

app_name = 'reminders_api'

urlpatterns = [
    path('', include(router.urls)),
]