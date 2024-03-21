FROM node:14-alpine

WORKDIR /app

COPY ./vote_app/ ./

RUN npm i

EXPOSE 3000

CMD [ "npm", "start", "--no-inotify"]