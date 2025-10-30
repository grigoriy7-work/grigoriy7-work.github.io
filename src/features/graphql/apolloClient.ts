import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const link = new HttpLink({
  uri: 'http://cea3c11a3f62.vps.myjino.ru/graphql',
});

export const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
