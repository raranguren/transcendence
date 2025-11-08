FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENV ADDRESS=0.0.0.0 PORT=8080

ENTRYPOINT ["npx", "tailwindcss", "-i", "src/input.css", "-o", "dist/output.css", "--watch"]


# npx tsc my-file.ts => pour compiler 
# npx tsc --watch => pour detecter les changements de code sans avoir a recompiler a chaque fois