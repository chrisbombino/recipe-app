FROM node:14.15-alpine

WORKDIR /client

COPY package*.json ./
RUN npm install --silent

COPY . .

EXPOSE 3000
EXPOSE 35729

CMD ["npm", "start"]
