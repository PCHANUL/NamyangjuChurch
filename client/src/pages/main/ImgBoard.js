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
      <svg id="ytp-Btn" height="100%" version="1.1" viewBox="0 0 68 48" width="100%" onClick={playYoutube}>
        <path id="ytp-Btn-Bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" 
          fill="#f00"></path>
        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
      </svg>

      <div id='imgOuter'>
        <div id="mainImg">
          <img id="ytp-thumbnail" src='http://img.youtube.com/vi/EFnXozbldns/0.jpg' alt="..."></img>
          <iframe id='yt-player' width="100%" height="100%" src="https://www.youtube.com/embed/EFnXozbldns" frameBorder="0" allow='autoplay' allowFullScreen></iframe>
        </div>

        <div id="mainImg">
          <img id="main-thumbnail" src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/mainPage/main.jpg' alt="..." ></img>
        </div>
      </div>

      <div id='btnOuter'>
        <button className='boardBtn boardLeft'>{'<'}</button>
        <button className='boardBtn boardRight'>{'>'}</button>
      </div>
    </div>
  )
}

function playYoutube() {
  document.querySelector('#ytp-Btn').style.visibility = 'hidden';
  document.querySelector('#ytp-thumbnail').style.visibility = 'hidden';
  document.querySelector('#imgOuter').style.zIndex = 2;
  document.querySelector('#yt-player').src += '?autoplay=1'; 
}