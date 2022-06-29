import { User } from './Schema/index';
import { ApolloServer } from "apollo-server-express";
import express from "express";
import typeDefs from "../src/GraphQl/TypeDefs";
import resolvers from "./GraphQl/Resolvers";
import mongoose from "mongoose"

async function startServer() {
    const app = express();
    try {
      await mongoose.connect("mongodb://localhost:27017/test1")
    } catch (e) {
      console.log(e);
    }
    
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    
    await server.start();
    
    server.applyMiddleware({ app: app });
    
    app.listen({ port: 4000 }, async () => {
      const url = "http://localhost:" + "4000/graphql"
      console.log(`Listening On LocalHost ${url}`);
    });
}

startServer()
