FROM node:9.10.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

CMD [ "npm", "start" ]
