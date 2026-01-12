import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
    // Replace this with your GraphQL API endpoint
    link: new HttpLink({uri: "http://localhost:5095/graphql"}),
    cache: new InMemoryCache(),
});
