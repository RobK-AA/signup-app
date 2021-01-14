import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';

// 1
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>, root);
});

serviceWorker.unregister();