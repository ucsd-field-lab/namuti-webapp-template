from rest_framework import serializers

class SpeakerSerializer(serializers.Serializer):
	speaker_initials = serializers.CharField(max_length=5)
	speaker_name = serializers.CharField(max_length=50)


class ClipSerializer(serializers.Serializer):
	ClipFilename = serializers.CharField(max_length=50, source='clip_filename')
	ClipRecording = serializers.CharField(max_length=25, source='clip_recording')
	Broad = serializers.CharField(source='broad')
	Ortho = serializers.CharField(source='ortho')
	NewOrtho = serializers.CharField(source='new_ortho')
	Phonetic = serializers.CharField(source='phonetic')
	UttGloss = serializers.CharField(source='utt_gloss')
	Spanish	= serializers.CharField(source='spanish')
	English = serializers.CharField(source='english')
	ClipRecordingPath = serializers.CharField(source='path')


# class RecordingSerializer(serializers.Serializer):
#     recording_filename = serializers.CharField(max_length=100)
#     story_name = serializers.CharField(max_length=100)
#     description = serializers.CharField(max_length=500)
#     date_recorded = serializers.CharField(max_length=50)