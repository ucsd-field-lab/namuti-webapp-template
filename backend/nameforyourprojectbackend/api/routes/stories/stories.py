from django.http import JsonResponse
import os
import json

from rest_framework.response import Response


from api.models.recording import Recording

from api.serializers.serializers import SpeakerSerializer
from api.shared.helper import organize_stories, organize_stories_by_speaker


def get_stories(request):

    by_speakers = request.GET.get('bySpeaker') == 'true'
    by_title = request.GET.get('byTitle') == 'true'

    stories = {}

    if by_title:
        stories["by_title"] = get_stories_by_title()

    if by_speakers:
        stories["by_speakers"] = get_stories_by_speakers()


    return JsonResponse({"stories": stories})


def get_stories_by_speakers():
    recordings = Recording.objects.all().prefetch_related('speakers')
    stories = organize_stories_by_speaker(recordings)
    return stories

def get_stories_by_title():
    recordings = Recording.objects.all().prefetch_related('speakers')
    stories = organize_stories(recordings)
    return stories
