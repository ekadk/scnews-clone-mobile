const { Tag, sequelize } = require("../models");

module.exports = class TagController {
  static async getAll(req, res, next) {
    const tags = await Tag.findAll({
      attributes: ['name', [sequelize.fn('COUNT', sequelize.col('name')), 'total']],
      group: "name"
    });
    res.status(200).json({ tags });
  }
};
