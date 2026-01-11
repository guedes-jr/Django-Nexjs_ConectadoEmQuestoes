from django.urls import path
from .views import health
from apps.core.api import me, csrf

urlpatterns = [
    path("health/", health),
    path("me/", me),
    path("csrf/", csrf),
]
