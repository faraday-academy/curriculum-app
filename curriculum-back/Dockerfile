FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install --production
ENV PATH="./node_modules/.bin:$PATH"
COPY . ./
CMD ["npm", "run", "prod"]
