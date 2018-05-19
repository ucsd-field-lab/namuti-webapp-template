from api.models.clip import Clip
from api.models.recording import Recording
from django.http import JsonResponse

import json

from api.serializers.serializers import ClipSerializer
from api.shared.helper import organize_story

def retrieve_grammar_clips(request):

    examples = request.GET.get('examples')

    clips = []


    for i in json.loads(examples):
        example = {}
        clip = Clip.objects.get(clip_filename=i)
        clip_serializer = ClipSerializer(clip)
        recording = Recording.objects.get(recording_filename=clip_serializer.data["ClipRecording"].lower())
        r = organize_story(recording)

        c = clip_serializer.data

        example = {
            "Title":                r['story_name'],
            "ClipRecording":        c["ClipFilename"],
            "Speakers":             r['contributors'],
            "ClipRecordingPath":    c["ClipRecordingPath"],
            "Broad":                c["Broad"],
            "Spanish":              c["Spanish"],
            "English":              c["English"],
            "UttGloss":             c["UttGloss"],
            "NewOrtho":             c["NewOrtho"],
        }

        clips.append(example)

        # clips.append(c)

    return JsonResponse({"data": clips})
