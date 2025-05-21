from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend # For filtering
from .models import Reminder
from .serializers import ReminderSerializer
from .permissions import IsOwnerOrReadOnly

class ReminderViewSet(viewsets.ModelViewSet):
    serializer_class = ReminderSerializer
    # Apply IsAuthenticated globally, IsOwnerOrReadOnly for object-level
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    # Filtering, Searching, Ordering
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['delivery_method', 'is_sent'] # For /?delivery_method=SMS
    search_fields = ['message'] # For /?search=keyword
    ordering_fields = ['reminder_datetime', 'created_at', 'delivery_method'] # For /?ordering=created_at
    ordering = ['-reminder_datetime'] # Default ordering

    def get_queryset(self):
        """
        This view should return a list of all the reminders
        for the currently authenticated user.
        """
        # Handled by IsAuthenticated ensuring request.user is valid.
        return Reminder.objects.filter(owner=self.request.user) # .order_by('-reminder_datetime') is default

    def perform_create(self, serializer):
        """
        Associate the reminder with the logged-in user upon creation.
        """
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsOwnerOrReadOnly]) # Ensure owner
    def mark_as_sent(self, request, pk=None): # pk is 'id' here due to lookup_field
        reminder = self.get_object() # This already checks object permissions
        if reminder.is_sent:
            return Response({'detail': 'Reminder already marked as sent.'}, status=status.HTTP_400_BAD_REQUEST)
        reminder.is_sent = True
        reminder.save()
        # Return the updated reminder object or just a success status
        serializer = self.get_serializer(reminder)
        return Response(serializer.data)
        # return Response({'status': 'reminder marked as sent'})

    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """
        Custom action to list upcoming reminders for the user.
        Example: reminders in the next 7 days.
        """
        from django.utils import timezone
        from datetime import timedelta

        user = request.user
        now = timezone.now()
        in_a_week = now + timedelta(days=7)
        
        upcoming_reminders = Reminder.objects.filter(
            owner=user,
            is_sent=False,
            reminder_datetime__gte=now,
            reminder_datetime__lte=in_a_week
        ).order_by('reminder_datetime')
        
        page = self.paginate_queryset(upcoming_reminders)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(upcoming_reminders, many=True)
        return Response(serializer.data)