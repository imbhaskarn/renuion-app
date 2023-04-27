FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY ./.sequelizerc .

CMD ["npm", "start"]
