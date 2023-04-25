const axios = require("axios");
const appBaseUrl = process.env.APP_SERVICE_BASE_URL;

const typeDefs = `#graphql

  type Category {
    id: ID
    name: String
  }

  type Query {
    getAllCategories: [Category]
    getCategoryById(id : ID): Category
  }
`;

const resolvers = {
  Query: {
    getAllCategories: async () => {
      try {
        const { data } = await axios.get(appBaseUrl + "/pub/categories");
        const categories = data.categories;
        return categories;
      } catch (error) {
        console.log(error);
      }
    },

    getCategoryById: async (_, args) => {
      const { id } = args
      const { data } = await axios.get(appBaseUrl + `/pub/categories/${id}`);
      const category = data.category
      return category
    }
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
