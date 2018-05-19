#!/bin/bash

if [ "$NODE_ENV" == "dev" ]
then
  if test -d node_modules;
  then
    echo node_modules already exists;
  else
    cp -a /tmp/node_modules /opt/project/projectname/frontend;
  fi &&
  yarn start
fi
