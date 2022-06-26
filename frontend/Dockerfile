FROM node:14.16.0-alpine

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]
