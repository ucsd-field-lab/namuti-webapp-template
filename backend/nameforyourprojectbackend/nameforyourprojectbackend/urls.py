from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import SimpleRouter
from api.views.story.handlers import RecordingViewSet

from api.routes.stories import stories, story
from api.routes.search import search
from api.routes.grammar import clips
from api.routes.links import generator

from api.routes.db import update

from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    url(r'^api/stories$', stories.get_stories),
    url(r'^api/stories/story$', story.get_story),
    url(r'^api/search/clips$', search.get_matching_clips),
    url(r'^api/grammar/clips$', clips.retrieve_grammar_clips),
    url(r'^api/link-generator-data', generator.get_data),
    url(r'^api/update', csrf_exempt(update.update)),
]

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
