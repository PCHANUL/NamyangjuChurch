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
    createdAt: String!
    title: String!
    thumbnail: String
    verse: String
    detailId: Int!
    content: Content!
  }

  type Content {
    id: Int!
    content: String!
    postId: Int!
  }

  type bible_korHRV {
    book: Int!
    chapter: Int!
    verse: Int!
    content: String!
  }

  type Query {
    signin(nickname: String!, password: String!): Boolean!
    signout: Boolean!
    isSignin: Boolean!
    getCategory(category: Int!, detail: Int!): [Post]!
    getContent(id: Int!): Post!
    getBible(book: Int!, chapterA: Int!, verseA: Int, chapterB: Int, verseB: Int): [bible_korHRV]!
  }

  type Mutation {
    signup(nickname: String!, password: String!): Users!
    addContent(
      category: String!
      title: String!
      content: String!
      datetime: String!
      thumbnail: String!
      verse: String!
    ): Boolean!

    updateContent(
      id: Int!
      category: String!
      title: String!
      content: String!
      datetime: String!
      thumbnail: String
      verse: String
    ): Boolean!

    deleteUser(nickname: String!): Boolean!
    deleteContent(id: Int!): Boolean!
  }
`);

export default schema