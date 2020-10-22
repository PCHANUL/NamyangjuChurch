import { buildSchema } from 'graphql';

var schema = buildSchema(`
  type Users {
    id: Int!
    nickname: String!
    password: String!
  }

  type Content {
    id: Int!
    title: String!
    desc: String!
    url: String!
  }

  type Category {
    id: Int!
    name: String!
    details: [DetailCategory]!
  }

  type DetailCategory {
    id: Int!
    name: String!
    posts: [Post]!
  }

  type Post {
    createdAt: String!
  }


  type Query {
    getUsers: [Users]!
    getCategory: [Category]!
  }

  type Mutation {
    addUser(nickname: String!, password: String!): Users!
    addContent(
      category: String!
      title: String!
      desc: String!
      url: String!
      ): Boolean!

    deleteUser(nickname: String!): Boolean!
    deleteContent(date: String!): Boolean!
    }
`);

export default schema