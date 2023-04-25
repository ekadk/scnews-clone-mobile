if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.ORCHESTRATOR_PORT || 4000

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const postSchema = require('./schemas/postSchema');
const userSchema = require('./schemas/userSchema');
const categorySchema = require('./schemas/categorySchema');


const server = new ApolloServer({
  typeDefs: [postSchema.typeDefs, userSchema.typeDefs, categorySchema.typeDefs],
  resolvers: [postSchema.resolvers, userSchema.resolvers, categorySchema.resolvers],
  introspection: true
});

startStandaloneServer(server, { listen: { port: PORT } })
  .then(({ url }) => {
    console.log(`Server is ready at ${url}`);
  })
  .catch(console.log);
