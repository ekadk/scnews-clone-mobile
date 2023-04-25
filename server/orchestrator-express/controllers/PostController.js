const axios = require("axios");
const baseUrl = "http://localhost:4002/posts";

const Redis = require("ioredis");
const fs = require("fs");

const redis = new Redis({
  host: "redis-18363.c257.us-east-1-3.ec2.cloud.redislabs.com",
  port: 18363,
  password: "TiNmnuryENF8ub0LTKYe60YnNiHYik4i",
});

module.exports = class PostController {
  static async getAllPosts(req, res, next) {
    try {
      const postCache = await redis.get("postCache");
      if (postCache) {
        res.status(200).json(JSON.parse(postCache));
      } else {
        const { data } = await axios({
          method: "get",
          url: baseUrl,
          headers: {
            access_token: req.headers.access_token,
          },
        });

        const posts = data.posts;
        await redis.set("postCache", JSON.stringify(posts));
        res.status(200).json({ posts });
      }
    } catch (error) {
      next(error);
    }
  }

  static async addPost(req, res, next) {
    try {
      const { title, content, imgUrl, categoryId, Tags } = req.body;
      const { data } = await axios({
        method: "post",
        url: baseUrl,
        headers: {
          access_token: req.headers.access_token,
        },
        data: {
          title,
          content,
          imgUrl,
          categoryId,
          Tags,
        },
      });

      const post = data.post;
      await redis.del("postCache");
      await redis.del("pubPostsCache");
      res.status(201).json({ post });
    } catch (error) {
      next(error);
    }
  }

  static async getPostById(req, res, next) {
    try {
      const id = req.params.id;
      const { data } = await axios.get(baseUrl + `/${id}`, {
        headers: {
          access_token: req.headers.access_token,
        },
      });
      const post = data.post;
      res.status(200).json({ post });
    } catch (error) {
      next(error);
    }
  }

  static async updatePost(req, res, next) {
    try {
      const id = req.params.id;
      const { title, content, imgUrl, categoryId, Tags } = req.body;
      const { data } = await axios({
        method: "put",
        url: baseUrl + `/${id}`,
        headers: {
          access_token: req.headers.access_token,
        },
        data: {
          title,
          content,
          imgUrl,
          categoryId,
          Tags,
        },
      });

      const message = data.message;
      await redis.del("postCache");
      await redis.del("pubPostsCache");
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const id = req.params.id;
      const { data } = await axios({
        method: "delete",
        url: baseUrl + `/${id}`,
        headers: {
          access_token: req.headers.access_token,
        },
      });
      const message = data.message;
      await redis.del("postCache");
      await redis.del("pubPostsCache");
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }
};
