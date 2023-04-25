
import { Sequelize, DataTypes } from "sequelize";
import config from "../../config/config.js";
import user from "./user.js";

//manually import models

const db = {};
const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'postgres',
  }
);

const User = user(sequelize, DataTypes);
db.User = User;

// for await (const file of files) {
//   const model = await import(`./${file}`);
//   const namedModel = model.default(sequelize, DataTypes);
//   db[namedModel.name] = namedModel;
// }

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
