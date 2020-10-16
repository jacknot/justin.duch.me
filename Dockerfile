FROM nginx:alpine
COPY __sapper__/export/. /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf