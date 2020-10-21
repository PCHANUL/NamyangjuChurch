import express from "express";
import path from 'path';
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from 'graphql';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

var schema = buildSchema(`
  type Person {
    id: Int!
    nickname: String!
    password: String!
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

var root = {
  people: async (_, context) => {
    const users = await context.prisma.user.findMany()
    return users
  },
};

const app = express();

app.use(cors({
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "credentials": true,
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

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