import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// https://www.apollographql.com/docs/react/networking/authentication
const httpLink = createHttpLink({
  uri: `${process.env.WORDPRESS_API_URL}/graphql`
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Basic ${process.env.WORDPRESS_APPLICATION_PWD}`
    }
  };
});

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache" // Bypass cache for watch queries
    },
    query: {
      fetchPolicy: "no-cache" // Bypass cache for queries
    }
  }
});
