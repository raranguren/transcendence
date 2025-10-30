FROM node:24

WORKDIR /app

RUN apt-get update && \
    apt-get install -y sqlite3 && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir /etc/certificates && \
    openssl req -x509 -new -days 365 -nodes \
    -keyout /etc/certificates/server.key \
    -out /etc/certificates/server.crt \
    -subj "/C=FR/ST=IDF/L=Paris/O=42"

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8080

ENV ADDRESS=0.0.0.0 PORT=8080

ENTRYPOINT ["npm", "start"]