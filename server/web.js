import express from "express";
import path from 'path';
import { graphqlHTTP } from "express-graphql";
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import root from './src/root';
import schema from './src/schema';

const prisma = new PrismaClient();
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