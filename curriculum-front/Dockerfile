FROM node:lts-alpine
WORKDIR /usr/src/app
COPY curriculum-front/package*.json ./
RUN ls -l
RUN npm install
COPY . .
RUN ls -l
RUN npm run build
COPY curriculum-front/node_server.js dist/node_server.js
WORKDIR /usr/src/app/dist
EXPOSE 8080
CMD [ "node", "node_server.js" ]
