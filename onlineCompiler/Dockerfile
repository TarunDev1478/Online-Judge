FROM node:18-alpine
WORKDIR /online-compiler
RUN apk update && apk add --no-cache g++
COPY package.json package-lock.json .
RUN npm i
COPY . .
EXPOSE 5000
CMD ["node","index.js"]