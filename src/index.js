import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';

// 1
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache
} from '@apollo/client';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("auth-token")
  },
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>, root);
});

serviceWorker.unregister();