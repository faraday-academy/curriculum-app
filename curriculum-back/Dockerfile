FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ./package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "prod"]
