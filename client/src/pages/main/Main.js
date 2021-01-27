import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import GoogleMap from './Map';
import TimeTable from './TimeTable';
import ImgBoard from './ImgBoard';

import './main.css';
import '../responsibleCSS/mobileMain.css';

import { scrollFunc } from '../Methods';

import { Button } from '../ContentList/Button';

function Main() {
  const [isPlayed, setIsPlayed] = useState(false);

  const stopYoutube = () => {
    document.querySelector('#main-thumbnail').style.visibility = 'visible';
    document.querySelector('#imgOuter').style.zIndex = 0;
    document.querySelector('#yt-player').src = document.querySelector('#yt-player').src.split('?')[0]; 
    setIsPlayed(false);
  }
  
  const playYoutube = () => {
    console.log('start')
    document.querySelector('#main-thumbnail').style.visibility = 'hidden';
    document.querySelector('#imgOuter').style.zIndex = 1;
    document.querySelector('#yt-player').src += '?autoplay=1&rel=0'; 
    setIsPlayed(true);
  }
  
  useEffect(() => {
    let scroll
    if (window.innerWidth < 640) {
      scroll = scrollFunc(
        document.querySelector('#cardContainer'), 
        document.querySelector('#outer'),
        3, 
        window.innerWidth / 2,
        'cardPos',
        0
      );
      scroll.addScrollEvent();
    }

    return () => {
      if (scroll) scroll.removeScrollEvent();
    }
  }, [window.innerWidth])

  return (
    <>

      <div id='firstPage'>
        <div id='greeting'>
          <h1>오직</h1>
          <p>그리스도, 하나님나라, 성령충만</p>
          <p>예배, 말씀, 기도, 전도, 후대에 집중하는</p>
          <h1>남양주 사랑교회입니다</h1>
        </div>
        <ImgBoard playYoutube={playYoutube}/>
        {
          isPlayed &&
          <Button className='closeYoutubeBtn' onClick={() => stopYoutube(false)}>
            닫기
            <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/close-button.png' className='closeIcon' />
          </Button>
        }
      </div>

      <div id="main">
        <div id="prayer">
            <h1>교회 기도제목</h1>
          <div id='outer'>
            <button className='scrollButton scrollButton_right'>{'<'}</button>
            <button className='scrollButton scrollButton_left'>{'>'}</button>
            <div id='cardContainer' className='cardPos0'>
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
                  <li>5000제자, 200지교회</li>
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
          <GoogleMap />
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