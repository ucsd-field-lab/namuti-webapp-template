from rest_framework import serializers
from api.models.recording import Recording

class RecordingSerializer(serializers.ModelSerializer):
    recordingFilename = serializers.CharField(source='recording_filename')
    storyName = serializers.CharField(source='story_name')
    dateRecorded = serializers.CharField(source='date_recorded')

    class Meta:
        model = Recording
        fields = ('recordingFilename', 'storyName', 'dateRecorded', 'description')
