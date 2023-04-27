// test/setup.js

require("dotenv").config();

process.env.NODE_ENV = "test";
process.env.DB_NAME = "reunion";
process.env.DB_USER = "postgres";
process.env.DB_PASSWORD = "secret";
process.env.JWT_SECRET =
  "b58727e9c77956d0042eabd228bbc805502f999a568de4eff543e1f8cb333a48";
