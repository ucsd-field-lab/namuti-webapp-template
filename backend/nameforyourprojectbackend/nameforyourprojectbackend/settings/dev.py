from nameforyourprojectbackend.settings.base import *
import os
from django.utils.crypto import get_random_string

DEBUG = True
# ALLOWED_HOSTS = ['192.168.99.100']
ALLOWED_HOSTS = []

MEDIA_ROOT = '/mnt/parody/'

# careful with this, this means every Django process will have different secret key
chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
SECRET_KEY = get_random_string(50, chars)

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