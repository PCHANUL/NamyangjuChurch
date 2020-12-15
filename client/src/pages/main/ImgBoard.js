import React, { useEffect } from 'react';
import './imgBoard.css';
import '../responsibleCSS/mobileImgBoard.css';

import { scrollFunc } from '../Methods';

export default function ImgBoard() {

  useEffect(() => {
    const scroll = scrollFunc(
      document.querySelector('#imgOuter'),
      document.querySelector('#btnOuter'),
      2, 
      window.innerWidth * 0.9, 
      'img'
    );
    scroll.addScrollEvent();

    return () => {
      scroll.removeScrollEvent();
    }
  }, [])

  return (
    <div id='imgBoard'>
      <div id='imgOuter'>
        <div id="mainImg">
          <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/mainPage/main.jpg' alt="..." ></img>
        </div>

        <div id="mainImg">
          <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/mainPage/main.jpg' alt="..." ></img>
        </div>
      </div>
      <div id='btnOuter'>
        <button className='boardBtn boardLeft'>{'<'}</button>
        <button className='boardBtn boardRight'>{'>'}</button>
      </div>
    </div>
  )
}