FROM django

ADD requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

ADD . /opt/project/projectname/backend/nameforyourprojectbackend
WORKDIR /opt/project/projectname/backend/nameforyourprojectbackend

EXPOSE 8080

ARG app_env
ENV APP_ENV $app_env

COPY start.sh /
ENTRYPOINT ["./start.sh"]
