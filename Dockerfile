FROM node:18-alpine AS BUILD_SERVER

RUN apk update && apk add bash python3 g++ make

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY ./server .

RUN --mount=target=/usr/src/app/node_modules,type=cache \
    npm ci --omit=dev

FROM node:18-alpine AS BUILD_WEB

RUN apk update && apk add bash python3 g++ make

# Create app directory
WORKDIR /usr/src/app

RUN npm i -g npm

COPY package.json .
COPY package-lock.json .

RUN --mount=target=/usr/src/app/node_modules,type=cache \
    npm ci

# Bundle app source
COPY . .

RUN --mount=target=/usr/src/app/.angular,type=cache \
    --mount=target=/usr/src/app/dist,type=cache \
     npm run build:prod

RUN ls /usr/src/app/dist

FROM node:18-alpine
WORKDIR /usr/src/app

COPY --from=BUILD_SERVER /usr/src/app/ ./
COPY ./dist/ndfsm-frontend ./dist

EXPOSE 3500
# npm to dirrect node command
CMD [ "node", "app.js" ]
