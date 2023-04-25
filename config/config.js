import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV || "development";
console.log(env)
const db = {
  production: {
    username: "root",
    password: null,
    database: "production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  development: {
    username: "postgres",
    password: "secret",
    database: "postgres",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};

const config = {
  db: db[env],
};
console.log(config.db)
export default config;
