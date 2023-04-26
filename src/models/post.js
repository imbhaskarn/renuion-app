"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(models) {
      Post.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE' })
      models.User.hasMany(Post, {foreignKey: 'userId', onDelete: 'CASCADE'})
    }
  }
  Post.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      likes:{
        defaultValue: 0,
        type: DataTypes.INTEGER
      },
      userId:{
        allowNull:false,
        type: DataTypes.INTEGER,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
