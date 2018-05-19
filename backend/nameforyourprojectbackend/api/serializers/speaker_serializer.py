class SpeakerSerializer(serializers.ModelSerializer):
    speakerInitials = serializers.CharField(source='speaker_initials')
	speakerName = serializers.CharField(source='speaker_name')

    class Meta:
        model = Speaker
        fields = ('speakerInitials', 'speakerName')
