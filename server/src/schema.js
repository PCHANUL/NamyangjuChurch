import { buildSchema } from 'graphql';

var schema = buildSchema(`
  type Users {
    id: Int!
    nickname: String!
    password: String!
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
    createdAt: String!
    detailId: Int!
    content: Content!
  }

  type Content {
    id: Int!
    content: String!
    postId: Int!
  }

  type Query {
    signin(nickname: String!, password: String!): Boolean!
    getCategory: [Category]!
    getContent(id: Int!): Post!
  }

  type Mutation {
    signup(nickname: String!, password: String!): Users!
    addContent(
      category: String!
      title: String!
      content: String!
    ): Boolean!

    updateContent(
      id: Int!
      category: String!
      title: String!
      content: String!
    ): Boolean!

    deleteUser(nickname: String!): Boolean!
    deleteContent(id: Int!): Boolean!
  }
`);

export default schema