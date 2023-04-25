const baseUrl = "http://localhost:4002/categories";
const axios = require("axios");

module.exports = class CategoryController {
  static async getAll(req, res, next) {
    try {
      const { data } = await axios.get(baseUrl, {
        headers: {
          access_token: req.headers.access_token,
        },
      });
      const categories = data.categories;
      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { name } = req.body;
      const { data } = await axios.post(
        baseUrl,
        { name },
        {
          headers: {
            access_token: req.headers.access_token,
          },
        }
      );
      const category = data.category;
      res.status(201).json({ category });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const { data } = await axios.get(baseUrl + `/${id}`, {
        headers: {
          access_token: req.headers.access_token,
        },
      });
      const category = data.category;
      res.status(200).json({ category });
    } catch (error) {
      next(error);
    }
  }

  static async updateById(req, res, next) {
    try {
      const id = req.params.id;
      const { name } = req.body;

      const { data } = await axios({
        url: baseUrl + `/${id}`,
        method: "put",
        headers: {
          access_token: req.headers.access_token,
        },
        data: { name },
      });

      const message = data.message;
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const id = req.params.id;
      const { data } = await axios({
        url: baseUrl + `/${id}`,
        method: "delete",
        headers: {
          access_token: req.headers.access_token,
        },
      });
      const message = data.message;
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }
};
