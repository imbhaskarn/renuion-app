"use strict";

require("dotenv").config();
const APP_PORT = process.env.APP_PORT || "5000";
const config = {
  development: {
    APP_HOST: "0.0.0.0",
    APP_PORT: APP_PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_URI: process.env.DB_URI,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see new error
        rejectUnauthorized: false, // This line will fix new error
      },
    },
  },
  test: {
    APP_HOST: "0.0.0.0",
    APP_PORT: APP_PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_URI: process.env.DB_URI,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
};

module.exports = config;
