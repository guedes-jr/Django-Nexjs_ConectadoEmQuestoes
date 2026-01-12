from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        # Import here to avoid circular imports at app startup when
        # there's also a conflicting `apps.core.models` package.
        from apps.core.models import Profile

        Profile.objects.create(user=instance)
