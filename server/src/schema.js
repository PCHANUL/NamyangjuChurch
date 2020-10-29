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
    desc: String!
    createdAt: String!
    thumbnail: String!
    detailId: Int!
    content: Content!
  }

  type Content {
    id: Int!
    content: String!
    url: String!
    postId: Int!
  }

  type Query {
    getUsers: [Users]!
    getCategory: [Category]!
    getContent(id: Int!): Post!
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

    updateContent(
      id: Int!
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