import React from 'react';
import { Link } from 'react-router-dom';

import mainImage from '../images/main.jpg';

function Main() {
  return (
    <div>
      <h1>Home</h1>
      <img src={mainImage} alt="..." style={{width: '80vw', height: 'auto'}}></img>
      <div style={{width: '80vw', height: '40vw', border: '2px solid #000'}}>
        <h1>교회소개</h1>
      </div>
      <div style={{width: '80vw', height: '40vw', border: '2px solid #000'}}>
        <div style={{float: 'left', width: '30vw', height: '40vw', border: '2px solid #000'}}>
          <h1>메시지 페이지 이동</h1>
        </div>
        <div style={{float: 'left', width: '30vw', height: '40vw', border: '2px solid #000'}}>
          <h1>갤러리 페이지 이동</h1>
        </div>
      </div>
      <div style={{width: '80vw', height: '40vw', border: '2px solid #000'}}>
        <h1>오시는길</h1>
      </div>
      <div style={{width: '80vw', height: '20vw', border: '2px solid #000'}}>
        <h1>예배시간</h1>
      </div>
    </div>
  )
}

export default Main;