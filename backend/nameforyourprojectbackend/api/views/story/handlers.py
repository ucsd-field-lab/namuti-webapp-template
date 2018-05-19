from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.viewsets import ModelViewSet

# from api.models.clip import Clip
# from .models.speaker import Speaker

from api.models.recording import Recording
from api.serializers.recording_serializer import RecordingSerializer

class RecordingViewSet(ModelViewSet):
    queryset = Recording.objects.all().prefetch_related('speakers')
    serializer_class = RecordingSerializer

# class ClipViewSet(viewsets.ModelViewSet):
#     queryset = Clip.objects.all()
#     serializer_class = ClipSerializer

# class SpeakerViewSet(viewsets.ModelViewSet):
#     queryset = Clips.objects.all()
#     serializer_class = RecordingSerializer