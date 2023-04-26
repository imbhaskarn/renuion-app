"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User, { foreignKey: "userId" });
      models.User.hasMany(Like, { foreignKey: "userId" });

      Like.belongsTo(models.Post, { foreignKey: "postId" });
      models.User.hasMany(Like, { foreignKey: "postId" });
    }
  }
  Like.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
      indexes: [{ fields: ["postId", "userId"], unique: true }],
      hooks: {
        afterCreate: async (like, options) => {
          const post = await like.getPost();
          const likes = await Like.count({ where: { postId: post.id } });
          await post.update({ likes });
        },
      },
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
