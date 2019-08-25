#Build
FROM node:12-alpine AS build-env
RUN apk update
WORKDIR /app
COPY . .
#RUN npm install --production
RUN npm install --silent --production
RUN npm run build

#Run
FROM node:12-alpine
ARG nginxconf=dev.conf
RUN echo "nginxconf => $nginxconf"
RUN apk update && apk add ca-certificates nginx && rm -rf /var/cache/apk/*
RUN mkdir /run/nginx && touch /run/nginx/nginx.pid
WORKDIR /app
COPY --from=build-env /app/build /app
COPY ./$nginxconf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]