from api.models.clip import Clip
from api.models.recording import Recording
from django.http import JsonResponse
from django.forms.models import model_to_dict

def get_data(request):

    data = {
        'clips': [],
    }

    # get all clip names
    clips = Clip.objects.values_list('clip_filename', flat=True)
    for clip in clips:
        data['clips'].append({'value': clip, 'label': clip})

    return JsonResponse({'data': data})
