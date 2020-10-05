import _ from 'lodash';
import printMe from './print.js';

import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  );

render(App);

if (module.hot) module.hot.accept('./components/App', () => render(App));


// function component() {
//   const element = document.createElement('div');
//   const btn = document.createElement('button');

//   element.innerHTML = _.join(['안녕하세요', '웹팩입니다.'], ' ');

//   btn.innerHTML = '나를 클릭해보세요';
//   btn.onclick = printMe;

//   element.appendChild(btn);

//   return element;
// }

// document.body.appendChild(component());