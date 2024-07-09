FROM node:18-alpine
WORKDIR /online-judge-backend
COPY package.json .
RUN npm i
COPY . .
EXPOSE 3001
CMD ["node","index.js"]