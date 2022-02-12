FROM node:16-alpine AS BUILD_SERVER

RUN apk update && apk add bash python3 g++ make

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY ./server .

RUN npm install --production

FROM node:16-alpine AS BUILD_WEB

RUN apk update && apk add bash python3 g++ make

# Create app directory
WORKDIR /usr/src/app

RUN npm i -g npm
COPY package.json .

# TODO pear dependecyfor appolo angular
RUN npm install --force

# Bundle app source
COPY . .

RUN npm run build:prod

FROM node:16-alpine
WORKDIR /usr/src/app

COPY --from=BUILD_SERVER /usr/src/app/ ./
COPY --from=BUILD_WEB /usr/src/app/dist/ndfsm-frontend ./dist

EXPOSE 3500
# npm to dirrect node command
CMD [ "node", "app.js" ]
