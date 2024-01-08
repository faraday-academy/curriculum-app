FROM node:16-alpine
# Default api url if no arg is passed into this dockerfile
ARG VUE_APP_API_URL=https://studytracker.tech
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
ENV PATH="./node_modules/.bin:$PATH"
COPY . ./
RUN VUE_APP_API_URL=$VUE_APP_API_URL npm run build --production
WORKDIR /usr/src/app/dist
COPY ../nodeServer.js ./
EXPOSE 8080
CMD [ "node", "nodeServer.js" ]
