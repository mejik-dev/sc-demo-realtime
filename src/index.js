import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  split,
  HttpLink,
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  concat,
  ApolloLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

//1. create httplink
const httpLink = new HttpLink({
  uri: 'https://dev-pocfordemolm81l.microgen.id/graphql',
});

//2. create a websocket link

const wsLink = new WebSocketLink(
  new SubscriptionClient('wss://dev-pocfordemolm81l.microgen.id/graphql', {
    connectionParams: {
      authorization: `Bearer ${localStorage.getItem('mgtoken') || null}`,
    },
  })
);

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem('mgtoken') || null}`,
    },
  }));

  return forward(operation);
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);
const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link: concat(authMiddleware, splitLink),
});

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>
);
