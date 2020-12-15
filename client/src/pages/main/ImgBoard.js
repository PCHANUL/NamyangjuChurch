import React, { useEffect } from 'react';
import './imgBoard.css';
import '../responsibleCSS/mobileImgBoard.css';

import { scrollFunc } from '../Methods';

export default function ImgBoard() {

  useEffect(() => {
    let target = document.querySelector('#imgOuter');
    const scroll = scrollFunc(target, 2, window.innerWidth * 0.9, 'img');
    

    return () => {

    }
  })

  const moveLeft = () => {
    console.log('left')
    document.querySelector('#imgOuter').className = 'img_2';
    // document.querySelector('#imgOuter').style.left = `-${window.innerWidth * 0.9}px`;
  }
  const moveRight = () => {
    document.querySelector('#imgOuter').className = 'img_1';
    // document.querySelector('#imgOuter').style.left = 0;
  }


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
        <button className='boardBtn boardLeft' onClick={moveLeft}>{'<'}</button>
        <button className='boardBtn boardRight' onClick={moveRight}>{'>'}</button>
      </div>
    </div>
  )
}