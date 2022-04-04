const typeDefs = require("./entities/typeDefs");
const resolvers = require("./entities/resolvers");
const connectDB = require("./config/db");
const { ApolloServer } = require("apollo-server");
const jwt = require('jsonwebtoken');
require('dotenv').config('variables.env');
//Database connection
connectDB();

//Server instance with typeDefs, resolvers and context
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers["authorization"] || "";
      if (token) {
        try {
          const user = jwt.verify(token, process.env.SECRETA);
          return {
            user,
          };
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

//Run Server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});