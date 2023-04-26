"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Followers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      followedBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.addConstraint("Followers", {
      fields: ["userId"],
      type: "FOREIGN KEY",
      name: "follower_user_constraint",
      references: {
        table: "Users",
        field: "id",
        onDelete: 'CASCADE' // Specify the ON DELETE action
      },
    });
    await queryInterface.addConstraint("Followers", {
      fields: ["followedBy"],
      type: "FOREIGN KEY",
      name: "followedby_user_constraint",
      references: {
        table: "Users",
        field: "id",
        onDelete: 'CASCADE' // Specify the ON DELETE action
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Followers",
      "follower_user_constraint"
    );
    await queryInterface.removeConstraint(
      "Followers",
      "followedby_user_constraint"
    );
    await queryInterface.dropTable("Followers");
  },
};
