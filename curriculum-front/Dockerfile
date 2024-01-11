FROM node:16-alpine as build-stage
# Default api url if no arg is passed into this dockerfile
ARG VUE_APP_API_URL=https://studytracker.tech
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
ENV PATH="./node_modules/.bin:$PATH"
COPY . ./
RUN VUE_APP_API_URL=$VUE_APP_API_URL npm run build --production

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY --from=build-stage /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
