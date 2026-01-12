from rest_framework import serializers
from apps.sketches.models import Sketch


class SketchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sketch
        fields = ["id", "title", "data", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
