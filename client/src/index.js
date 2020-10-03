import _ from 'lodash';
import printMe from './print.js';


function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['안녕하세요', '웹팩입니다.'], ' ');

  btn.innerHTML = '나를 클릭해보세요!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());