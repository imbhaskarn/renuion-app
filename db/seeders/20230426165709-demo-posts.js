"use strict";
const faker = require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];

    // generate 10 fake posts
    for (let i = 1; i <= 5; i++) {
      data.push({
        title: faker.lorem.words(3),
        userId: faker.random.number({ min: 1, max: 10 }),
        description: faker.lorem.paragraphs(3),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Posts", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
