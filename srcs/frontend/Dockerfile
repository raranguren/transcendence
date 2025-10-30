FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT ["npx", "tailwindcss", "-i", "src/input.css", "-o", "dist/output.css", "--watch"]


# npx tsc my-file.ts => pour compiler 