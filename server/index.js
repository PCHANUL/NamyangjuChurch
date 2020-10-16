import { GraphQLServer } from "graphql-yoga";
import resolvers from "./src/resolvers";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  }
})

server.start(() => console.log('GraphQL Server Running'))