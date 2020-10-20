FROM mhart/alpine-node:10.21

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn export

FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 __sapper__/export/. /usr/share/nginx/html
