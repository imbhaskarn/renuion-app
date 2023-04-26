"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("Comments", {
      fields: ["userId"],
      type: "FOREIGN KEY",
      name: "comment_user_constraint",
      references: {
        table: "Users",
        field: "id",
        onDelete: 'CASCADE' // Specify the ON DELETE action
      },
    });
    await queryInterface.addConstraint("Comments", {
      fields: ["postId"],
      type: "FOREIGN KEY",
      name: "comment_post_constraint",
      references: {
        table: "Posts",
        field: "id",
        onDelete: 'CASCADE' // Specify the ON DELETE action
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Comments", "comment_user_constraint");
    await queryInterface.removeConstraint("Comments", "comment_post_constraint");
    await queryInterface.dropTable("Comment");
  },
};
