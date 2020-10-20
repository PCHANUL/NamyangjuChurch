import express from "express";
import { graphqlHTTP } from "express-graphql";

import { schema } from './src/schema'
import resolvers from "./src/resolvers";

import { GraphQLServer } from "graphql-yoga";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
  context: {
    prisma,
  },
}));
app.listen(4000);
console.log('Running GraphQL API server')

// const server = new GraphQLServer({
//   typeDefs: "./src/schema.graphql",
//   resolvers,
//   context: {
//     prisma,
//   }
// })

// server.start(() => console.log('GraphQL Server Running'))