import { GraphQLClient } from 'graphql-request';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

// Use local API proxy to bypass CORS issues
const WORDPRESS_API_URL = typeof window === 'undefined' 
  ? process.env.WORDPRESS_API_URL || 'https://newdesign.grossiweb.com/graphql'
  : '/api/graphql';

export const graphqlClient = new GraphQLClient(WORDPRESS_API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// Apollo Client setup
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: WORDPRESS_API_URL,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});

// WordPress API functions
export async function getWordPressData(query: string | DocumentNode, variables?: any) {
  try {
    const queryString = typeof query === 'string' ? query : print(query);
    const data = await graphqlClient.request(queryString, variables);
    return data;
  } catch (error) {
    console.error('WordPress GraphQL Error:', error);
    throw error;
  }
}