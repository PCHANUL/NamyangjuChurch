import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://nsarang.cafe24app.com/graphql",
  cache: new InMemoryCache()
});

export default client;