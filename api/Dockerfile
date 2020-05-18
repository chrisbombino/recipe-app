FROM node:8

WORKDIR /api

COPY app.js ./
COPY *.json ./

RUN npm install --silent

EXPOSE 5000

CMD ["node", "app.js"]
