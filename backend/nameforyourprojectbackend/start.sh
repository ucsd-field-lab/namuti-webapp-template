#!/bin/bash

if [ $APP_ENV = "dev" ]; then
    python manage.py runserver --settings=nameforyourprojectbackend.settings.dev 0.0.0.0:8080
else
    NUM_WORKERS=3
    TIMEOUT=30

    exec gunicorn nameforyourprojectbackend.wsgi:application \
        --bind 0.0.0.0:8080 \
        --workers $NUM_WORKERS \
        --timeout $TIMEOUT \
        --reload
fi