"use strict";
const faker = require('faker')
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: await bcrypt.hash("reunion", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        password: await bcrypt.hash("reunion", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        password: await bcrypt.hash("reunion", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Users", users, {});
    const posts = [];

    // generate 10 fake posts
    for (let i = 1; i <= 25; i++) {
      posts.push({
        title: faker.lorem.words(3),
        userId: faker.random.number({ min: 1, max: 3 }),
        description: faker.lorem.paragraphs(3),
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Posts", posts, {});
    const comments = [];

    // generate 15 fake comments for post 1-5 by users 1-3
    for (let i = 1; i <= 15; i++) {
      comments.push({
        postId: faker.random.number({ min: 1, max: 5 }),
        userId: faker.random.number({ min: 1, max: 3 }),
        content: faker.lorem.sentences(2),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Comments", comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null, {});
    await queryInterface.bulkDelete("Posts", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
