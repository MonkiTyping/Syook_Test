FROM node:latest

WORKDIR /user/app/EventEmitter

COPY package.json .
RUN npm install

COPY . .

EXPOSE 5000
cmd ["npm start"]