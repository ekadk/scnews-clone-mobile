const { Post, Category, Tag, sequelize } = require("../models");

module.exports = class PostController {
  static async getAllPosts(req, res, next) {
    try {
      const posts = await Post.findAll({
        order: [["id", "DESC"]],
        attributes: [
          "id",
          "title",
          "imgUrl",
          "slug",
          "content",
          "authorId",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
          },
          {
            model: Tag,
            attributes: ["id", "name"],
          },
        ],
      });
      res.status(200).json({ posts });
    } catch (error) {
      next(error);
    }
  }

  static async getPostById(req, res, next) {
    try {
      const id = req.params.id;
      const post = await Post.findByPk(id, {
        attributes: [
          "id",
          "title",
          "imgUrl",
          "slug",
          "content",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
          },
          {
            model: Tag,
            attributes: ["id", "name"],
          },
        ],
      });
      if (!post) throw { name: "post_not_found", postId: id };
      res.status(200).json({ post });
    } catch (error) {
      next(error);
    }
  }

  static async addPost(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const authorId = req.user.id;
      const { title, content, imgUrl, categoryId, Tags } = req.body;
      const slug = title.split(" ").join("-");

      const post = await Post.create(
        {
          title,
          slug,
          content,
          imgUrl,
          categoryId,
          authorId,
        },
        { transaction: t }
      );

      let separatedTags = Tags.split(/,| |;/)
        .filter((el) => el !== "")
        .map((el) => {
          return {
            postId: post.id,
            name: el,
          };
        });

      if (separatedTags.length === 0) {
        separatedTags.push({});
      }

      await Tag.bulkCreate(separatedTags, { validate: true, transaction: t });

      await t.commit();

      res.status(201).json({ post });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async updatePost(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const post = await Post.findByPk(id, { transaction: t });
      if (!post) throw { name: "post_not_found", postId: id };

      const { title, content, imgUrl, categoryId, Tags } = req.body;
      const slug = title.split(" ").join("-");

      await Post.update(
        { title, content, imgUrl, categoryId, slug },
        {
          where: { id },
          transaction: t,
        }
      );

      await Tag.destroy({ where: { postId: id } }, { transaction: t });

      const separatedTags = Tags.split(/,| |;/)
        .filter((el) => el !== "")
        .map((el) => {
          return {
            postId: post.id,
            name: el,
          };
        });

      await Tag.bulkCreate(separatedTags, { transaction: t, validate: true });

      await t.commit();
      res.status(200).json({ message: `Post with id ${id} updated!` });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const id = req.params.id;
      const post = await Post.findByPk(id);
      if (!post) throw { name: "post_not_found", postId: id };
      await Post.destroy({ where: { id } });
      res.status(200).json({ message: `Post with id ${id} deleted` });
    } catch (error) {
      next(error);
    }
  }

  // Public
  static async pubGetAllPosts(req, res, next) {
    try {
      const posts = await Post.findAll({
        order: [["id", "DESC"]],
        attributes: [
          "id",
          "title",
          "imgUrl",
          "slug",
          "content",
          "authorId",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
          },
          {
            model: Tag,
            attributes: ["id", "name"],
          },
        ],
      });

      res.status(200).json({ posts });
    } catch (error) {
      next(error);
    }
  }

  static async pubGetPostById(req, res, next) {
    try {
      const id = req.params.id;
      const post = await Post.findByPk(id, {
        attributes: [
          "id",
          "title",
          "imgUrl",
          "slug",
          "content",
          "authorId",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
          },
          {
            model: Tag,
            attributes: ["id", "name"],
          },
        ],
      });
      if (!post) throw { name: "post_not_found", postId: id };
      res.status(200).json({ post });
    } catch (error) {
      next(error);
    }
  }
};
