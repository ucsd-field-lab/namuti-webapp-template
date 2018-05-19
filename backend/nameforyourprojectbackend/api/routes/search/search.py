from whoosh.fields import Schema, TEXT, STORED, ID, KEYWORD, SchemaClass, NGRAM
from whoosh.index import create_in
from whoosh.query import *
from whoosh.index import open_dir
from whoosh.qparser import QueryParser

import os.path
import json

from django.db.models.functions import Concat
from django.db.models import TextField, Value as V
from django.contrib.postgres.aggregates import StringAgg


from api.models.clip import Clip
from api.models.recording import Recording
from api.models.speaker import Speaker

from django.http import JsonResponse
from rest_framework import serializers


from api.serializers.serializers import SpeakerSerializer, ClipSerializer
from api.shared.helper import organize_story

from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank, SearchVectorField, TrigramSimilarity
from django.contrib.postgres.aggregates import StringAgg

from django.db.models import F


def seed(request):

	# document=Concat(
	#     'broad', V(' '),
	# 	'english', V(' '),
	#     'ortho', V(' '),
	#     'spanish', V(' '),
	# 	'utt_gloss', V(' '),
	#     # StringAgg('tags')
	#     output_field=TextField()
	# )
	# Clip.objects.annotate(document=document).values_list('document', flat=True)


	# convert docuemnts to a vector which is a format that Postgres can index and search through
	# vector= SearchVector('broad', weight='B') + \
	# 		SearchVector('english', weight='A') + \
	# 		SearchVector('new_ortho', weight='C') + \
	# 		SearchVector('spanish', weight='D') + \
	# 		SearchVector('utt_gloss')

	vector= SearchVector('broad') + \
			SearchVector('english') + \
			SearchVector('new_ortho') + \
			SearchVector('spanish') + \
			SearchVector('utt_gloss')


	# Clip.objects.annotate(search=vector).values_list('document', flat=True)
	Clip.objects.annotate(search=vector)


	for clip in Clip.objects.annotate(search=vector):
		clip.search_vector = clip.document
		clip.save(update_fields=['search_vector'])

	return JsonResponse({
		"success": True,
	})


def search_all_columns(query):
	sq = SearchQuery(query)
	results = Clip.objects\
	    .annotate(rank=SearchRank(F('search_vector'), sq))\
		.filter(search_vector=sq)\
		.order_by('-rank')
	return results



languages = {
	"global": "global",
	"newortho": "new_ortho",
	"english": "english",
	"spanish": "spanish",
	"uttgloss": "utt_gloss",
	"ortho": "ortho",
	"broad": "broad"
}


def get_matching_clips(request):

	# import pdb; pdb.set_trace()

	language = languages[request.GET.get('language')]
	query = request.GET.get('query')
	matching_clips = {}

	if language == "global":
		search_result = search_all_columns(query)
	else:
		# search_result = Clip.objects.annotate(similarity=TrigramSimilarity(language, query))\
		# 							.filter(**{language + "__search": query}, similarity__gt=0.3)\
		# 							.order_by('-similarity')\
		# search_result = Clip.objects.annotate(similarity=TrigramSimilarity(language, query))\
		# 							.filter(similarity__gt=0.3)\
		# 							.order_by('-similarity')\
		# print("searching for " + query + " in " + language)
		search_result = Clip.objects.filter(**{language + "__search": query})

	num_of_clips = 0

	for result in search_result:
		clip_serializer = ClipSerializer(result)
		print(clip_serializer.data)
		story_id = clip_serializer.data["ClipRecording"]
		recording = Recording.objects.prefetch_related('speakers').get(recording_filename=story_id)
		r = organize_story(recording)

		if story_id not in matching_clips:
			matching_clips[story_id] = {}
			matching_clips[story_id]["StoryName"] = r['story_name']
			matching_clips[story_id]["Speakers"] = r['contributors']
			matching_clips[story_id]["Clips"] = []

		matching_clips[story_id]["Clips"].append(clip_serializer.data)
		num_of_clips += 1

	return JsonResponse({
		"foundClips": True if len(matching_clips) > 0 else False,
		"numOfClips": num_of_clips,
		"data": matching_clips
	})
