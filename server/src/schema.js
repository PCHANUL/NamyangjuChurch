import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Person {
    id: Int!
    name: String!
    age: Int!
    gender: String!
  }

  type Query {
    people: [Person]!
    person(id: Int!): Person
  }

  type Mutation {
    addUser(name: String!, age: Int!, gender: String!): Person!
    deleteUser(id: Int!): Boolean!
  }
`);