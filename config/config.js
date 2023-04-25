"use strict";

require("dotenv").config();
const APP_PORT = process.env.APP_PORT || "5000";

const config = {
  APP_HOST: "0.0.0.0",
  APP_PORT: APP_PORT,
  JWT_SECRET: "f271e206119433acadc4hd",
  development: {
    APP_HOST: "0.0.0.0",
    APP_PORT: APP_PORT,
    JWT_SECRET: "f271e206119433acadc4hd",
    DB_URI: `postgres://postgres:secret@elocalhost:5432/postgres`,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
};
// console.log(config)
module.exports = config;
