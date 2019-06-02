FROM node:10-alpine

WORKDIR /app/gastarme

COPY package.json .

RUN npm install --only=production

COPY src src

ENTRYPOINT [ "npm", "start" ]
