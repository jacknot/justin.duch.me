FROM mhart/alpine-node:16.0.0

WORKDIR /app
COPY package.json svelte.config.cjs ./
RUN npm i

COPY src ./src
COPY static ./static
COPY _posts ./_posts
RUN npm run export

FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/build/. /usr/share/nginx/html
