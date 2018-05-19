# from django.contrib.postgres.search import SearchVectorField
# from django.contrib.postgres.indexes import GinIndex
""" Model for clip """
from django.db import models
from .recording import Recording

class Clip(models.Model):
	clip_filename = models.CharField(max_length=50)
	clip_recording = models.CharField(max_length=25)
	path = models.CharField(max_length=100)
	language1 = models.TextField(null=True, blank=True)
	language2 = models.TextField(null=True, blank=True)

	class Meta:
		db_table = 'clip'