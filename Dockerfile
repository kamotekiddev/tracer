FROM node:21.0-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000


CMD [ "npm", "run", "dev" ]
