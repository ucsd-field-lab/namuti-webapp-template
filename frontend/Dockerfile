FROM node:boron

RUN apt-get update && apt-get install bash

ADD package.json /tmp/package.json

RUN cd /tmp && npm install
RUN mkdir -p /opt/project/projectname/frontend && cp -a /tmp/node_modules /opt/project/projectname/frontend

ADD . /opt/project/projectname/frontend
WORKDIR /opt/project/projectname/frontend

EXPOSE 3000

COPY ./docker-entrypoint.sh /
ENTRYPOINT ["./docker-entrypoint.sh"]
