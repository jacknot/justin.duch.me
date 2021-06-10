FROM mhart/alpine-node:16.0.0

WORKDIR /app
COPY package.json package-lock.json svelte.config.js ./
RUN npm i

COPY src ./src
COPY static ./static
COPY _posts ./_posts
RUN npm run export

# Remove data that comes from the exported `load` function in all posts.
# These are already used and rendered server side so they're wastes of bandwidth.
# And also ignore spe_000+ posts.
RUN find build/post -name '*.html' -not -path 'build/post/spe_*' \
        -exec sed -i '/type="svelte-data"/d' {} \;

FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/build/. /usr/share/nginx/html
