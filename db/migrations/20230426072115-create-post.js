"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      Likes: {
        allowNull: false,
        type: Sequelize.INTEGER,
        default: 0,
      },
      description: {
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
    await queryInterface.addConstraint("Posts", {
      fields: ["userId"],
      type: "FOREIGN KEY",
      name: "post_user_constraint",
      references: {
        table: "Users",
        field: "id",
        onDelete: 'CASCADE' // Specify the ON DELETE action
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Posts", "post_user_constraint");
    await queryInterface.dropTable("Posts");
  },
};
