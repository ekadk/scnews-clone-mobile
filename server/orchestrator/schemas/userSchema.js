const axios = require("axios");
const userBaseUrl = process.env.USER_SERVICE_BASE_URL;

const Redis = require("ioredis");
const fs = require("fs");

const redis = new Redis({
  host: "redis-18363.c257.us-east-1-3.ec2.cloud.redislabs.com",
  port: 18363,
  password: "TiNmnuryENF8ub0LTKYe60YnNiHYik4i",
});

const typeDefs = `#graphql

  type User {
    id: ID
    email: String
  }

  type Query {
    getAllUsers: [User],
  }

  input UserInput {
    email: String!,
    password: String!
  }

  type Mutation {
    registerUser (email: String!, password: String!) : User
  }
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const usersCache = await redis.get("usersCache");
        if (usersCache) {
          const users = JSON.parse(usersCache);
          return users;
        } else {
          const { data } = await axios.get(userBaseUrl);
          const users = data.users;
          return users;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    registerUser: async (_, args) => {
      try {
        const { email, password } = args;
        const { data } = await axios.post(userBaseUrl + '/register', { email, password });
        const user = data.user;
        await redis.del("usersCache");
        return user;
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
