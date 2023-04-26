'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING
      },
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint("Likes", {
      fields: ["userId"],
      type: "FOREIGN KEY",
      name: "like_user_constraint",
      references: {
        table: "Users",
        field: "id",
      },
    });
    await queryInterface.addConstraint("Likes", {
      fields: ["postId"],
      type: "FOREIGN KEY",
      name: "like_post_constraint",
      references: {
        table: "Posts",
        field: "id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Likes", "like_user_constraint");
    await queryInterface.removeConstraint("Likes", "like_post_constraint");
    await queryInterface.dropTable('Like');
  }
}; 