# syntax = docker/dockerfile:1.2
FROM node:18-alpine AS BUILD_SERVER

RUN apk update && apk add bash python3 g++ make

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY ./server .

RUN npm ci --omit=dev

FROM node:18-alpine AS BUILD_WEB

RUN apk update && apk add bash python3 g++ make

# Create app directory
WORKDIR /usr/src/web

RUN npm i -g npm

COPY package.json .
COPY package-lock.json .

RUN --mount=target=/usr/src/web/node_modules,type=cache \
    npm ci

# Bundle app source
COPY . .

RUN --mount=target=/usr/src/web/.angular,type=cache \
    --mount=target=/usr/src/web/node_modules,type=cache \
    --mount=target=/usr/src/web/dist,type=cache \
     npm run build:prod

RUN --mount=target=/usr/src/web/dist,type=cache \
    cp -r ./dist/ndfsm-frontend ./app

FROM node:18-alpine
WORKDIR /usr/src/app

COPY --from=BUILD_SERVER /usr/src/app/ ./
COPY --from=BUILD_WEB /usr/src/web/app ./dist

EXPOSE 3500
# npm to dirrect node command
CMD [ "node", "app.js" ]
