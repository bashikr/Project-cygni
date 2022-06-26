FROM node:14.16.0-alpine

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 1337

CMD [ "npm", "start" ]
