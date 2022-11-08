FROM node:16.3.0-alpine
WORKDIR /usr/src/app
COPY curriculum-back/package*.json ./
RUN npm install
COPY curriculum-back ./
RUN ls -l
CMD ["npm", "run", "prod"]
