""" Model for story """
from django.db import models
from .speaker import Speaker

class Recording(models.Model):
	recording_filename = models.CharField(max_length=100)
	story_name = models.CharField(max_length=100)
	description = models.CharField(max_length=500, null=True, blank=True)
	date_recorded = models.CharField(max_length=50, null=True, blank=True)
	speakers = models.ManyToManyField(Speaker, related_name="speakers")

	class Meta:
		db_table = 'recording'