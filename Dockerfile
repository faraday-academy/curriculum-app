FROM node:16-alpine as app-build-stage

# Default api url if no arg is passed into this dockerfile
ARG VUE_APP_API_URL=https://studytracker.tech
WORKDIR /usr/src/app
COPY ./curriculum-front/package*.json ./
RUN npm i
ENV PATH="./node_modules/.bin:$PATH"
COPY ./curriculum-front ./
RUN VUE_APP_API_URL=$VUE_APP_API_URL npm run build --production

FROM amd64/ubuntu:22.04 as reverse-proxy-stage

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        bash \
        neovim \
        ca-certificates curl gnupg

RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/trusted.gpg.d/nodesource.gpg && \
    NODE_MAJOR=20 && \
    echo "deb [signed-by=/etc/apt/trusted.gpg.d/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs nginx

# Add your configuration or additional setup steps here

WORKDIR /usr/src/api
COPY ./curriculum-back/package*.json ./
RUN npm install --production
COPY ./curriculum-back ./

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=app-build-stage /usr/src/app/dist /usr/share/nginx/html
RUN rm -f /etc/nginx/sites-enabled/default
# Clean up unnecessary packages and cache to reduce image size
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Expose necessary ports
EXPOSE 80
EXPOSE 5050

CMD ["/bin/sh", "-c", "nginx -g 'daemon off;' & npm run prod"]
