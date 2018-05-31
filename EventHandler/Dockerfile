FROM node:latest

WORKDIR /user/app/EventHandler

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000
cmd ["npm start"]