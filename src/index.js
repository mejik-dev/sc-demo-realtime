import "./index.css";

import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { BrowserRouter } from "react-router-dom";

const token = localStorage.getItem("token");

const httpLink = new HttpLink({
  uri: "https://dev-pocfordemolm81l.microgen.id/graphql",
});
const wsLink = new WebSocketLink(
  new SubscriptionClient("wss://dev-pocfordemolm81l.microgen.id/graphql", {
    connectionParams: {
      authorization: token ? `Bearer ${token}` : "",
    },
  })
);
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>
);
