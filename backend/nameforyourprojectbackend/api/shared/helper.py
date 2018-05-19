from django.forms.models import model_to_dict

from api.serializers.serializers import SpeakerSerializer

from api.models.clip import Clip


def organize_stories(stories):

    # query clips for that story, if number of clips is 0, ignore that story
    organized_stories = {"data": [], "count": 0}

    for story in stories:
        r = model_to_dict(story)
        clips = Clip.objects.filter(clip_recording=r['recording_filename'])
        if len(clips) > 0:
            r['contributors'] = ""

            num_of_speakers = 1
            for speaker in r['speakers']:
                speaker_serializer = SpeakerSerializer(speaker)

                if num_of_speakers == 1:
                    r['contributors'] += speaker_serializer.data['speaker_name']
                elif num_of_speakers == 2:
                    r['contributors'] += " and " + speaker_serializer.data['speaker_name']

                num_of_speakers += 1

            r.pop('speakers', None)
            organized_stories["data"].append(r)
            organized_stories["count"] += 1

    return organized_stories


# Returns all stories for speaker view, only get stories with clips
def organize_stories_by_speaker(stories):

    organized_stories = {}

    for story in stories:

        r = model_to_dict(story)
        clips = Clip.objects.filter(clip_recording=r['recording_filename'])
        if len(clips) > 0:

            speakers_queryset = r['speakers']
            r.pop('description', None)
            r.pop('speakers', None)

            for speaker in speakers_queryset:
                speaker_serializer = SpeakerSerializer(speaker)

                speaker_initials = speaker_serializer.data['speaker_initials']
                r['contributor'] = speaker_serializer.data['speaker_name']

                if speaker_initials not in organized_stories:
                    organized_stories[speaker_initials] = [] # where stories go

                organized_stories[speaker_initials].append(r)

    return organized_stories


def organize_story(story):
    r = model_to_dict(story)
    speakers_queryset = r['speakers']
    r.pop('speakers', None)

    for speaker in speakers_queryset:
        speaker_serializer = SpeakerSerializer(speaker)

        speaker_initials = speaker_serializer.data['speaker_initials']
        r['contributors'] = speaker_serializer.data['speaker_name']
    return r
