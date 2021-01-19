FROM node:14.15-alpine

WORKDIR /api

COPY app.js ./
COPY *.json ./

RUN npm install --silent

EXPOSE 5000

CMD ["node", "app.js"]
