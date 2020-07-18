FROM mhart/alpine-node:10.21

WORKDIR "/app"

COPY package.json yarn.lock ./
RUN yarn install

###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM mhart/alpine-node:10.21

COPY --from=0 /app .
COPY . .

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["node", "__sapper__/build"]