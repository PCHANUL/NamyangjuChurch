import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  scalar Upload

  type Person {
    id: Int!
    name: String!
    age: Int!
    gender: String!
  }

  type Query {
    people: [Person]!
    person(id: Int!): Person
    uploads: [File]
  }

  type Mutation {
    addUser(name: String!, age: Int!, gender: String!): Person!
    deleteUser(id: Int!): Boolean!
    singleUpload(file: Upload!): File!
  }

  type File {
    filename: String!
    mimetype: String!
    encording: String!
  }
`);
