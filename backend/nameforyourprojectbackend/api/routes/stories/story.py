from django.http import JsonResponse
from django.conf import settings

import os
import json

from api.models.speaker import Speaker
from api.models.clip import Clip
from api.models.recording import Recording

from api.serializers.serializers import ClipSerializer
from api.shared.helper import organize_story


def get_story(request):
    story_id = request.GET.get('id') + ".wav"
    recording = Recording.objects.prefetch_related('speakers').get(recording_filename=story_id)
    clips = Clip.objects.filter(recording=recording).order_by("start_ms").select_related('recording')

    story_clips = []

    r = organize_story(recording)


    for clip in clips:
        clip_serializer = ClipSerializer(clip)
        story_clips.append(clip_serializer.data)

    return JsonResponse({
        "story": {
            "Title":        r['story_name'],
            "Filename":     r['recording_filename'],
            "Description":  r['description'],
            "Date":         r['date_recorded'],
            "Speakers":     r['contributors'],
            "Clips":        story_clips,
            "RecordingPath": 'http://yoursite.com' +
                                settings.MEDIA_URL +
                                r['recording_filename'][:2] + '/' +
                                r['recording_filename'].split('.')[0] + '/' +
                                r['recording_filename']
        }
    })
