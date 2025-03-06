FROM node:22

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate dev --name init

COPY .env ./

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/main.js"] 