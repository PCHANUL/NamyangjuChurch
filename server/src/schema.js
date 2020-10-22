import { buildSchema } from 'graphql';

// export const schema = buildSchema(`
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

var schema = buildSchema(`
  type Users {
    id: Int!
    nickname: String!
    password: String!
  }

  type Query {
    getUsers: [Users]!
  }

  type Content {
    id: Int!
    title: String!
    desc: String!
    url: String!
  }

  type Mutation {
    addUser(nickname: String!, password: String!): Users!
    deleteUser(nickname: String!): Boolean!
    addContent(
      category: String!
      title: String!
      desc: String!
      url: String!
    ): Boolean!
  }
`);

export default schema