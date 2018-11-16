// Libraries
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

function create(initialState) {
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser,
        link: new HttpLink({
            uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
            credentials: 'same-origin'
        }),
        cache: new InMemoryCache().restore(initialState || {})
    })
}

export default function initApollo(initialState) {
    if (!process.browser) {
        return create(initialState)
    }
    if (!apolloClient) {
        apolloClient = create(initialState)
    }

    return apolloClient
}