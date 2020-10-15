import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo";

const render = Component =>
  ReactDOM.render(
    <AppContainer>
        <BrowserRouter>
      <ApolloProvider client={client}>
            <App />
    </ApolloProvider>
        </BrowserRouter>
      </AppContainer>,
    document.getElementById('root')
  );

render(App);

if (module.hot) module.hot.accept('./App', () => render(App));