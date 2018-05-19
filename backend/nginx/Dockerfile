FROM nginx

RUN rm /etc/nginx/conf.d/*

ARG app_env
ENV APP_ENV $app_env

COPY nginx.${APP_ENV}.conf /etc/nginx/conf.d/