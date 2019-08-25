FROM node:12-alpine
RUN apk update
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8001
CMD ["npm", "run", "start"]