import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import Map from './Map';
import TimeTable from '../TimeTable';
import ImgBoard from './ImgBoard';

import './main.css';
import '../responsibleCSS/mobileMain.css';

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
  console.log(map, maps)
};


function Main() {
  const [leftPos, setLeftPos] = useState(0);
  let scroll;

  const scrollFunc = () => {
    let curPos = 0;
    let initCurPos = 0;
    let cardContainer = document.querySelector('#cardContainer');
    let cardPos = 1;
    let isMoved = false;
    let isMouse = false;
    let nextPage = false;
    
    return (e) => { 
      if (e.type[0] === 'm') isMouse = true;
      else isMouse = false;
      
      if (e.type === 'touchstart' || e.type === 'mousedown') {
        if (isMouse) cardContainer.addEventListener('mousemove', scroll, false); // 마우스 이벤트 생성
        let initCardPos
        if (cardPos === 1) initCardPos = 0;
        else if (cardPos === 2) initCardPos = window.innerWidth / 2;
        else if (cardPos === 3) initCardPos = window.innerWidth;
        // 카드 위치 초기설정
        cardContainer.style.left = `-${initCardPos}px`;
        // 초기 위치설정
        curPos = isMouse ? e.clientX : e.touches[0].clientX;
        initCurPos = curPos;

      } else if (e.type === 'touchend' || e.type === 'mouseup') {
        let screenCenter = window.innerWidth / 2;

        if (isMoved === false) {
          if (curPos <= screenCenter - 20 && cardPos > 1) cardPos += -1;
          else if (curPos >= screenCenter + 20 && cardPos < 3) cardPos += 1;
        } else {
          if (curPos <= initCurPos - 20 && cardPos < 3) cardPos += 1;
          else if (curPos >= initCurPos + 20 && cardPos > 1) cardPos += -1;
        }
        cardContainer.style.left = null;  // style 제거 후 className 설정
        cardContainer.className = `cardPos${cardPos}`;
        curPos = 0;  // 위치 초기화
        initCurPos = 0;  
        isMoved = false;  // move 토글 초기화
        if (isMouse) cardContainer.removeEventListener('mousemove', scroll, false); // 마우스 이벤트 제거

      } else if (e.type === 'touchmove' || e.type === 'mousemove') {
        isMoved = true;
        let m = (isMouse ? e.clientX : e.touches[0].clientX) - curPos;  // 움직인 거리
        let scrollPos = cardContainer.style.left.slice(0, -2);  // 기존 카드 위치

        if (scrollPos > 0 && Math.sign(m) === 1) return;
        else if (scrollPos < -1 * (window.innerWidth) && Math.sign(m) === -1) return;
        else {
          cardContainer.style.left = `${Number(scrollPos) + m}px`
          curPos = isMouse ? e.clientX : e.touches[0].clientX;
        }
      }
    }
  }


  
  useEffect(() => {
    scroll = scrollFunc();
    if ('ontouchstart' in window) {
      // touch
      document.querySelector('#outer').addEventListener('touchmove', scroll, false);
      document.querySelector('#outer').addEventListener('touchend', scroll, false);
      document.querySelector('#outer').addEventListener('touchstart', scroll, false);
    } else {
      // click
      document.querySelector('#outer').addEventListener('mousedown', scroll, false);
      document.querySelector('#outer').addEventListener('mouseup', scroll, false);
    }

    return () => {
      if ('ontouchstart' in window) {
        // touch
        document.querySelector('#outer').removeEventListener('touchmove', scroll, false);
        document.querySelector('#outer').removeEventListener('touchend', scroll, false);
        document.querySelector('#outer').removeEventListener('touchstart', scroll, false);
      } else {
        // click
        document.querySelector('#outer').removeEventListener('mousedown', scroll, false);
        document.querySelector('#outer').removeEventListener('mouseup', scroll, false);
      }
    }
  }, [])

  

  return (
    <>

      <div id='firstPage'>
        <div id='greeting'>
          <h1>오직</h1>
          <p>그리스도, 하나님나라, 성령충만</p>
          <p>예배, 말씀, 기도, 전도, 후대에 집중하는</p>
          <h1>남양주 사랑교회입니다</h1>
        </div>
        <ImgBoard />
      </div>

      <div id="main">
        <div id="prayer">
            <h1>교회 기도제목</h1>
          <div id='outer'>
            <button className='scrollButton scrollButton_right'>{'<'}</button>
            <button className='scrollButton scrollButton_left'>{'>'}</button>
            <div id='cardContainer' className='cardPos1'>
              <div className='prayerCard'>
                <h2>하나님이 <br />원하시는 교회</h2>
                <ul>
                  <li>오직 복음</li>
                  <li>오직 전도,선교</li>
                  <li>오직 제자</li>
                  <li>오직 후대</li>
                </ul>
              </div>

              <div className='prayerCard'>
                <h2>하나님이 <br />찾으시는 교회</h2>
                <ul>
                  <li>성경적 전도운동하는 교회</li>
                  <li>다락방, 팀사역, 미션홈 </li>
                  <li>지교회 5기초 현장</li>
                </ul>
              </div>

              <div className='prayerCard'>
                <h2>강북 600만, <br /> 남양주, 양주<br />100만 복음화</h2>
                <ul>
                  <li>5000제자, 2000지교회</li>
                  <li>200절대제자, 200장로</li>
                  <li>200렘넌트 </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div id='route'>
          <h1>오시는길</h1>
          <p>경기도 남양주시 진건읍 진건오남로 98 한신그린상가 304호</p>
          <Map />
        </div>

        <TimeTable />
        <p id='lastSentence'>
          예배시간에 홈페이지에 접속하시면
          <br />
          생방송을 보실 수 있습니다.
        </p>
      </div>
    </>
  )
}

export default Main;