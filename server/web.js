import express from "express";
import path from 'path';
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from 'graphql';
import cors from 'cors';

// import { schema } from './src/schema'
import resolvers from "./src/resolvers";

import { GraphQLServer } from "graphql-yoga";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Person {
    id: Int!
    name: String!
    age: Int!
    gender: String!
  }

  type Query {
    people: [Person]!
  }
`);

// var schema = buildSchema(`
//   type Person {
//     id: Int!
//     name: String!
//     age: Int!
//     gender: String!
//   }

//   type Query {
//     people: [Person]!
//     person(id: Int!): Person
//   }

//   type Mutation {
//     addUser(name: String!, age: Int!, gender: String!): Person!
//     deleteUser(id: Int!): Boolean!
//   }
// `);

// The root provides a resolver function for each API endpoint
var root = {
  people: async (_, context) => {
    const users = await context.prisma.user.findMany()
    return users
  },
};

const app = express();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
})

app.use(express.static(path.join(__dirname, './views')))

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
  context: {
    prisma,
  },
}));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/index.html'));
})
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