from api.models.clip import Clip

class ClipSerializer(serializers.ModelSerializer):
    clipFilename = serializers.CharField(source='clip_filename')
	clipRecording = serializers.CharField(source='clip_recording')
	newOrtho = serializers.CharField(source='new_ortho')
	uttGloss = serializers.CharField(source='utt_gloss')

    class Meta:
        model = Clip
        fields = (
            'clipFilename', 
            'clipRecording', 
            'newOrtho', 
            'uttGloss', 
            'broad', 
            'spanish',
            'ortho',
            'english',
            'phonetic',
            'path'
        )

    	# def create(self, validated_data):
	# 	"""
    #     Create and return a new `Clip` instance, given the validated data.
	# 	"""
	# 	return Clip.objects.create(**validated_data)


	# def update(self, instance, fields, validated_data):
	# 	"""
    #     Update and return an existing `Clip` instance, given the validated data.
    #     """
       
	# 	instance.save()
	# 	return instance

