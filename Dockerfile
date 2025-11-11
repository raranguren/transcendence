FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install --save-dev typescript

COPY . .

ENTRYPOINT ["npm", "run", "dev"]


# npx tsc my-file.ts => pour compiler 
# npx tsc --watch => pour detecter les changements de code sans avoir a recompiler a chaque fois