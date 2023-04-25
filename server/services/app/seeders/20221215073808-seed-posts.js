"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const posts = require("../db").posts.map((post) => {
      delete post.id;
      post.slug = post.title.split(" ").join("-");
      post.createdAt = post.updatedAt = new Date();
      return post;
    });

    await queryInterface.bulkInsert("Posts", posts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Posts", null, {});
  },
};
