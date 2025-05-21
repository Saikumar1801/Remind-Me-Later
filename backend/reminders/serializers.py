from rest_framework import serializers
from .models import Reminder
from django.contrib.auth.models import User
from datetime import datetime

class ReminderSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True,
        # default=serializers.CurrentUserDefault() # Another way if view doesn't set it
    )
    owner_username = serializers.CharField(source='owner.username', read_only=True) # More readable

    reminder_date = serializers.DateField(write_only=True, input_formats=['%Y-%m-%d'], required=False)
    reminder_time = serializers.TimeField(write_only=True, input_formats=['%H:%M', '%H:%M:%S'], required=False)
    
    # Fields that can be updated but are not strictly required for PATCH
    message = serializers.CharField(required=False, allow_blank=False) # allow_blank=False to prevent empty messages on update
    delivery_method = serializers.ChoiceField(choices=Reminder.DELIVERY_CHOICES, required=False)

    class Meta:
        model = Reminder
        fields = [
            'id', 'owner', 'owner_username', 'message', 'reminder_datetime', 
            'delivery_method', 'created_at', 'is_sent',
            'reminder_date', 'reminder_time', # Input only
        ]
        read_only_fields = ['id', 'owner', 'owner_username', 'created_at', 'is_sent', 'reminder_datetime']

    def validate(self, data):
        reminder_date_val = data.get('reminder_date')
        reminder_time_val = data.get('reminder_time')
        
        is_creating = self.instance is None

        if reminder_date_val and reminder_time_val:
            try:
                combined_datetime = datetime.combine(reminder_date_val, reminder_time_val)
                current_time = datetime.now()
                if combined_datetime <= current_time:
                    raise serializers.ValidationError({"reminder_datetime_future": "Reminder must be set for a future date and time."})
                data['validated_reminder_datetime'] = combined_datetime
            except ValueError: # Should be caught by field validation
                raise serializers.ValidationError({"reminder_date_time_combination": "Invalid date/time format or combination."})
        elif (reminder_date_val and not reminder_time_val) or (not reminder_date_val and reminder_time_val):
            if ('reminder_date' in data or 'reminder_time' in data): # Only raise if user attempted to set one part
                raise serializers.ValidationError({"reminder_datetime_parts": "Both reminder_date and reminder_time must be provided to update the reminder time."})

        if is_creating:
            if 'reminder_date' not in data or not data.get('reminder_date'): # Check for None or empty string
                 raise serializers.ValidationError({"reminder_date": "This field is required."})
            if 'reminder_time' not in data or not data.get('reminder_time'):
                 raise serializers.ValidationError({"reminder_time": "This field is required."})
            if 'validated_reminder_datetime' not in data: # Ensure date/time were actually processed if provided
                # This implies reminder_date or reminder_time was missing if we reach here in create
                raise serializers.ValidationError({"reminder_datetime_parts": "Valid reminder_date and reminder_time are required to set reminder_datetime."})
            if 'message' not in data or not data.get('message', '').strip(): # Ensure message is not empty on create
                raise serializers.ValidationError({"message": "This field is required and cannot be empty."})
        
        # For updates, if message is provided, ensure it's not empty string
        if not is_creating and 'message' in data and not data.get('message', '').strip():
            raise serializers.ValidationError({"message": "Message cannot be empty."})
            
        return data
    
    def create(self, validated_data):
        validated_data.pop('reminder_date', None)
        validated_data.pop('reminder_time', None)
        combined_dt = validated_data.pop('validated_reminder_datetime')
        validated_data['reminder_datetime'] = combined_dt
        # Owner is set in view's perform_create
        return Reminder.objects.create(**validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('reminder_date', None)
        validated_data.pop('reminder_time', None)
        
        new_reminder_dt = validated_data.pop('validated_reminder_datetime', None)
        if new_reminder_dt:
            instance.reminder_datetime = new_reminder_dt
        
        instance.message = validated_data.get('message', instance.message).strip() # Ensure message is stripped
        instance.delivery_method = validated_data.get('delivery_method', instance.delivery_method)
        instance.save()
        return instance