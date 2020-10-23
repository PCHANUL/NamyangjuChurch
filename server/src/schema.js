import { buildSchema } from 'graphql';

var schema = buildSchema(`
  type Users {
    id: Int!
    nickname: String!
    password: String!
  }

  type Content {
    id: Int!
    desc: String!
    url: String!
    postId: Int!
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
    id: Int!
    title: String!
    desc: String!
    createdAt: String!
    thumbnail: String!
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
      content: String!
      thumbnail: String
    ): Boolean!

    deleteUser(nickname: String!): Boolean!
    deleteContent(id: Int!): Boolean!
  }
`);

export default schema