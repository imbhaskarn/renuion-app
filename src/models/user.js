"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        require: true,
      },
      email: {
        type: DataTypes.STRING,
        require: true,
      },
      password: {
        type: DataTypes.STRING,
        require: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
