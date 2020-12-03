import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css'
import '../responsibleCSS/mobileMain.css'

import Map from '../Map';
import TimeTable from '../TimeTable';

import axios from 'axios';

const places = [
  {},
  {},
  // { lat: 37.658863, lng: 127.178282 },
  // { lat: 37.659365, lng: 127.179435 },
]

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
  console.log(map, maps)
};


function Main() {
  const [leftPos, setLeftPos] = useState(0);

  function touchScrollFunc() {
    let touchPos = 0;
    let cardContainer = document.querySelector('#cardContainer');
    let cardPos = 1;
    let isMoved = false;
    
    return (e) => { 
      if (e.type === 'touchstart') {
        let initPos
        if (cardPos === 1) initPos = 0;
        else if (cardPos === 2) initPos = window.innerWidth / 2;
        else if (cardPos === 3) initPos = window.innerWidth;
        // 카드 위치 초기설정
        cardContainer.style.left = `-${initPos}px`;
        // 터치 위치 초기설정
        touchPos = e.touches[0].clientX;

      } else if (e.type === 'touchend') {
        let screenCenter = window.innerWidth / 2;
        if (isMoved === false) {
          if (touchPos <= screenCenter - 20 && cardPos > 1) cardPos += -1;
          else if (touchPos >= screenCenter + 20 && cardPos < 3) cardPos += 1;
        } else {
          if (touchPos <= screenCenter - 20 && cardPos < 3) cardPos += 1;
          else if (touchPos >= screenCenter + 20 && cardPos > 1) cardPos += -1;
        }
        
        console.log('cardPos: ', cardPos);

        // style 제거 후 className 설정
        cardContainer.style.left = null;
        cardContainer.className = `cardPos${cardPos}`;
        touchPos = 0;  // 터치 초기화
        isMoved = false;  // move 토글 초기화

      } else if (e.type === 'touchmove') {
        isMoved = true;
        let m = e.touches[0].clientX - touchPos;  // 움직인 거리
        let scrollPos = cardContainer.style.left.slice(0, -2);  // 기존 카드 위치

        if (scrollPos > 0 && Math.sign(m) === 1) return;
        else if (scrollPos < -1 * (window.innerWidth) && Math.sign(m) === -1) return;
        else {
          cardContainer.style.left = `${Number(scrollPos) + m}px`
          touchPos = e.touches[0].clientX;

        }
      }
    }
  }


  
  useEffect(() => {
    let touchScroll = touchScrollFunc();
    document.querySelector('#outer').addEventListener('touchmove', touchScroll, false);
    document.querySelector('#outer').addEventListener('touchend', touchScroll, false);
    document.querySelector('#outer').addEventListener('touchstart', touchScroll, false);
    return () => {
      document.querySelector('#outer').removeEventListener('touchmove', touchScroll, false);
    }
  }, [])

  

  return (
    <>
      <div id="mainImg">
        <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/mainPage/main.jpg' alt="..." ></img>
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


        <div id='paster'>
          <div id='pasterImg'>
            <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/mainPage/thumbnail.png' alt="..." />
            <h2>담임목사 박종수</h2>
          </div>
          <p>
            사람들은 문명과 지식의 발달로 모든 것을 다 가지고 있고 행복한 삶을 살고 있다고 생각합니다.
            그러나 알수 없는 영적문제로 말미암아 삶이 무너지고 영 육간에 어려움을 당하고 있습니다.  
            원인과 해결책을 얻지 못하고 방황하고 헤매이고 있습니다.
            이러한 시대에 하나님은 유일한 해답되신 예수 그리스도를 우리에게 보내주셨습니다.
            예수 그리스도만이 우리 인생의 모든 문제의 해답이며 유일한 길입니다.
            하나님은 당신에게 예수 그리스도를 믿고 참 자유함과 치유함을 얻고 영적 서밋으로 세워지길 원하십니다.
            여러분이 오직 복음의 증인, 말씀의 증인, 기도의 증인으로 세워지길 원하십니다.
            여기에 오신 당신과 함께 남양주 양주 백만 영혼을 위한 5천제자, 강북 3만제자, 수도권 10만제자, 
            민족 40만제자, 전세계 1천만 전도제자를 세우길 기도합니다.
          </p>
        </div>


        <div id='route'>
          <h1>오시는길</h1>
          {/* <Map
            startPoint={{ lat: places[0].lat, lng: places[0].lng }}
            endPoint={{ lat: places[1].lat, lng: places[1].lng }}
          /> */}
        </div>
        {/* <div style={{height: '60vw', border: '2px solid #000'}}>
          <h1>예배시간</h1>
          <TimeTable />
        </div> */}
      </div>
    </>
  )
}

export default Main;