"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
