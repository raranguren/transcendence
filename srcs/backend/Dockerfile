FROM node:24

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

ENV ADDRESS=0.0.0.0 PORT=8080

ENTRYPOINT ["npm", "start"]