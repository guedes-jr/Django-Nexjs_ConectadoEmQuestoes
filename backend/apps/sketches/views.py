from rest_framework import permissions, viewsets
from apps.sketches.models import Sketch
from apps.sketches.serializers import SketchSerializer


class SketchViewSet(viewsets.ModelViewSet):
    serializer_class = SketchSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Sketch.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
