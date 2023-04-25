'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tags = require('../db.json').tags.map(tag => {
      delete tag.id
      tag.createdAt = tag.updatedAt = new Date()
      return tag
    });

    await queryInterface.bulkInsert('Tags', tags, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags', tags, {})
  }
};
