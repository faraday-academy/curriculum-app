FROM node:lts-alpine
WORKDIR /usr/src/app
COPY curriculum-front/package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY node_server.js dist/node_server.js
WORKDIR /usr/src/app/dist
EXPOSE 8080
CMD [ "node", "node_server.js" ]
