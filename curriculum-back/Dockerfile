FROM node:14-alpine 
#node:lts-alpine
RUN apk add --no-cache --update nodejs npm
WORKDIR /usr/src/app
COPY curriculum-back/package*.json ./
RUN npm install
COPY curriculum-back ./
RUN ls -l
CMD ["npm", "run", "prod"]
