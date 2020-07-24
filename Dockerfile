FROM mhart/alpine-node:10.21

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM mhart/alpine-node:10.21
COPY --from=0 /app .
COPY . .

EXPOSE 3000
CMD ["node", "__sapper__/build"]
