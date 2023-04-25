const axios = require("axios");
const appBaseUrl = process.env.APP_SERVICE_BASE_URL;
const userBaseUrl = process.env.USER_SERVICE_BASE_URL;

const Redis = require("ioredis");
const fs = require("fs");

const redis = new Redis({
  host: "redis-18363.c257.us-east-1-3.ec2.cloud.redislabs.com",
  port: 18363,
  password: "TiNmnuryENF8ub0LTKYe60YnNiHYik4i",
});

const typeDefs = `#graphql
  type Post {
    id: ID
    title: String
    slug: String
    content: String
    imgUrl: String
    category: Category
    author: User
    createdAt: String
    updatedAt: String
    Tags: [Tag]
  }

  type Tag {
    name: String
  }

  type Query {
    getAllPost: [Post],
    getPostById(postId: ID): Post
  }
`;

const resolvers = {
  Query: {
    getAllPost: async () => {
      try {
        const pubPostsCache = await redis.get("pubPostsCache");

        if (pubPostsCache) {
          const posts = JSON.parse(pubPostsCache);
          return posts;
        } else {
          const { data } = await axios.get(appBaseUrl + "/pub/posts");
          const userData = await axios.get(userBaseUrl);
          const posts = data.posts;
          const users = userData.data.users;
          posts.forEach((post) => {
            post.author = users.find((user) => user.id == post.authorId);
            post.category = post.Category;
            delete post.authorId;
          });
          await redis.set("pubPostsCache", JSON.stringify(posts));
          return posts;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getPostById: async (_, args) => {
      try {
        const { postId } = args;
        const { data } = await axios.get(appBaseUrl + `/pub/posts/${postId}`);
        const post = data.post;
        const userData = await axios.get(userBaseUrl + `/${post.authorId}`);
        const user = userData.data.user;
        post.category = post.Category;
        post.author = user;
        return post;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
