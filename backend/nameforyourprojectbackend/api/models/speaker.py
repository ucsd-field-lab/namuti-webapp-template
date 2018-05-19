""" Model for Speaker """
from django.db import models

class Speaker(models.Model):
	speaker_initials = models.CharField(max_length=5)
	speaker_name = models.CharField(max_length=50)

	class Meta:
		db_table = 'speaker'