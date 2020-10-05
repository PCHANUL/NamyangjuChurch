import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

const render = Component =>
  ReactDOM.render(
    <BrowserRouter>
      <AppContainer>
        <App />
      </AppContainer>
    </BrowserRouter>,
    document.getElementById('root')
  );

render(App);

if (module.hot) module.hot.accept('./App', () => render(App));