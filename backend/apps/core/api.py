from allauth.socialaccount.models import SocialAccount
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user

    avatar = None
    if hasattr(user, "profile") and user.profile.avatar:
        avatar = request.build_absolute_uri(user.profile.avatar.url)

    social_avatar = None
    sa = SocialAccount.objects.filter(user=user, provider="google").first()
    if sa:
        pic = sa.extra_data.get("picture")
        if pic:
            social_avatar = pic

    return Response({
        "id": user.id,
        "email": user.email,
        "username": user.get_username(),
        "avatar": avatar,
        "social_avatar": social_avatar,
    })

@api_view(["GET"])
@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({"ok": True})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_avatar(request):
    profile = request.user.profile
    file = request.FILES.get("avatar")
    if not file:
        return Response({"avatar": ["Envie o arquivo no campo avatar."]}, status=400)

    profile.avatar = file
    profile.save()
    return Response({"ok": True})
