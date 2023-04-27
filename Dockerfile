FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm i sequelize-cli
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all
CMD ["npm", "start"]
