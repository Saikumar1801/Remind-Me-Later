from django.contrib import admin
from .models import Reminder

@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'owner_username_display', # Custom method to display owner's username
        'message_summary',
        'reminder_datetime',
        'delivery_method',
        'is_sent',
        'created_at'
    )
    list_filter = ('owner', 'delivery_method', 'is_sent', 'reminder_datetime', 'created_at')
    search_fields = ('message', 'owner__username', 'id') # Search by owner username
    date_hierarchy = 'reminder_datetime'
    ordering = ('-reminder_datetime',)
    raw_id_fields = ('owner',) # Better UI for selecting owner if many users

    def message_summary(self, obj):
        return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
    message_summary.short_description = 'Message'

    def owner_username_display(self, obj):
        return obj.owner.username
    owner_username_display.short_description = 'Owner'
    owner_username_display.admin_order_field = 'owner__username' # Allow sorting by username