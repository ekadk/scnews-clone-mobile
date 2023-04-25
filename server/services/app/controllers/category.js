const { Category } = require("../models");

module.exports = class CategoryController {
  static async getAll(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      res.status(201).json({ category });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id);
      if (!category) throw { name: "category_not_found", categoryId: id };

      res.status(200).json({ category });
    } catch (error) {
      next(error);
    }
  }

  static async updateById(req, res, next) {
    try {
      const id = req.params.id;
      const { name } = req.body;

      const category = await Category.findByPk(id);
      if (!category) throw { name: "category_not_found", categoryId: id };

      await Category.update({ name }, { where: { id } });
      res.status(200).json({ message: `Category with id ${id} updated!` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id);
      if (!category) throw { name: "category_not_found", categoryId: id };
      await Category.destroy({ where: { id } });
      res.status(200).json({ message: `Category with id ${id} deleted ` });
    } catch (error) {
      next(error);
    }
  }

  static async pubGetAll(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  }

  static async pubGetById(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id);
      if (!category) throw { name: "category_not_found", categoryId: id };

      res.status(200).json({ category });
    } catch (error) {
      next(error);
    }
  }
};
