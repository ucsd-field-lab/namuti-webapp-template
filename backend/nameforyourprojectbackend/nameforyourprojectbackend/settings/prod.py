from nameforyourprojectbackend.settings.base import *
import os

DEBUG = False
ALLOWED_HOSTS = ['*']

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

if not DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': os.environ['POSTGRES_DB'],
            'USER': os.environ['POSTGRES_USER'],
            'PASSWORD': os.environ['POSTGRES_PASSWORD'],
            'HOST': 'pg',
            'PORT': 5432
        }
    }
