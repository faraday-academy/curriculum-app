FROM node:lts-alpine
WORKDIR /usr/src/app
COPY curriculum-back/package*.json ./
RUN npm install
COPY curriculum-back ./
RUN ls -l
VOLUME /.env:/root/devops/.env
CMD ["npm", "run", "prod"]
