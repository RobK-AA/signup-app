import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { HashRouter } from 'react-router-dom';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_util';
import { logout } from './actions/session_actions';

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter> 
    </ApolloProvider>
  );
};

// document.addEventListener('DOMContentLoaded', () => {
//   let store;

//   if (localStorage.jwtToken) {
//     setAuthToken(localStorage.jwtToken);
//     const decodedUser = jwt_decode(localStorage.jwtToken);
//     const preloadedState = {
//       session: {
//         isAuthenticated: true,
//         user: decodedUser
//       }
//     };
//     store = configureStore(preloadedState);
//     const currentTime = Date.now() / 1000;
//     if (decodedUser.exp < currentTime) {
//       store.dispatch(logout());
//       window.location.href = '/';
//     }
//   } else {
//     store = configureStore();
//   }
//   const root = document.getElementById('root');
//   ReactDOM.render(<Root store={store} />, root);
// });
ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();