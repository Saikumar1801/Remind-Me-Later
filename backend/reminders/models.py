from django.db import models
from django.contrib.auth.models import User # Import User model

class Reminder(models.Model):
    DELIVERY_CHOICES = [
        ('SMS', 'SMS'),
        ('EMAIL', 'Email'),
    ]

    owner = models.ForeignKey(User, related_name='reminders', on_delete=models.CASCADE) # New field
    message = models.TextField(help_text="The actual text message for the reminder.")
    reminder_datetime = models.DateTimeField(help_text="The specific date and time when the reminder should be triggered.")
    delivery_method = models.CharField(
        max_length=10,
        choices=DELIVERY_CHOICES,
        default='EMAIL',
        help_text="How the user wants to be reminded (e.g., SMS, Email)."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_sent = models.BooleanField(default=False)

    def __str__(self):
        formatted_datetime = self.reminder_datetime.strftime('%Y-%m-%d %H:%M') if self.reminder_datetime else "N/A"
        return f"Reminder for {self.owner.username} at {formatted_datetime}: \"{self.message[:20]}...\""

    class Meta:
        ordering = ['owner', 'reminder_datetime', 'created_at'] # Added owner to ordering
        verbose_name = "Reminder"
        verbose_name_plural = "Reminders"