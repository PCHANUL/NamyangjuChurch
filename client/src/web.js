import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

// import { ApolloProvider } from "@apollo/react-hooks";
// import { ApolloProvider } from "@apollo/client";
// import client from "./apollo";

// import { AppProvider } from './state/appContext'

const render = () =>
  ReactDOM.render(
      // <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      // </AppProvider>,
    document.getElementById('root')
  );

render(App);

if (module.hot) module.hot.accept('./App', () => render(App));