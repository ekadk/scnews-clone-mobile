"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = require("../db.json").categories.map((category) => {
      delete category.id;
      category.createdAt = category.updatedAt = new Date();
      return category;
    });

    await queryInterface.bulkInsert("Categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", null, {});
  },
};
