'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};