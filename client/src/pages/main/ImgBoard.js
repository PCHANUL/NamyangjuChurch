import React, { useEffect, useState } from 'react';
import './imgBoard.css';
import '../responsibleCSS/mobileImgBoard.css';

import { scrollFunc } from '../Methods';
import { getLiveUrl } from '../axiosRequest';

export default function ImgBoard() {
  const [liveUrl, setLiveUrl] = useState('')
  let infoData = calcTime();
  console.log('infoData: ', infoData);
  
  useEffect(() => {
    getLiveUrl((url) => {
      setLiveUrl(url.data)
      console.log('url.data: ', url.data);
    });
  },[])

  return (
    <div id='imgBoard'>
      <div id='onairInfo'>
        <h1>{infoData[0]}에 {infoData[1]}가 시작됩니다</h1>
      </div>
      <div id='prevPlay' onClick={playYoutube}>
        <h1>이전예배</h1>
        <svg id="ytp-Btn" height="100%" version="1.1" viewBox="0 0 68 48" width="100%" >
          <path d="M 45,24 27,14 27,34" fill="#fff"></path>
        </svg>
      </div>

      {/* <div id='onairInfo'>
        <h1>{infoData[1]} 중입니다</h1>
      </div>
      <div id='prevPlay' onClick={playYoutube}>
        <h1>생방송</h1>
        <svg id="ytp-Btn" height="100%" version="1.1" viewBox="0 0 68 48" width="100%" >
          <path d="M 45,24 27,14 27,34" fill="#fff"></path>
        </svg>
      </div> */}

      <div id='imgOuter'>
        <div id="mainImg">
          <img id="main-thumbnail" src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/mainPage/main.jpg' alt="..." ></img>
          <iframe id='yt-player' width="100%" height="100%" src={`https://www.youtube.com/embed/${liveUrl}`}
            frameBorder="0" allow='autoplay' allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}

let worshipTimes = {
  '0': {
    '9': '주일학교예배',
    '11': '주일대예배',
    '14': '주일오후예배',
  },
  '3': {
    '19': '수요예배'
  },
  '5': {
    '20': '금요예배'
  },
} 

function calcTime() {
  let result;

  let date = new Date();
  let now = {
    day: date.getDay(),
    hours: date.getHours(),
    mins: date.getMinutes(),
  }

  if (worshipTimes[now.day]) {
    let times = Object.keys(worshipTimes[now.day]);
    for (let i = 0; i < times.length; i++) {
      if (now.hours <= times[i]) {
        let remainTime = Number(times[i]) - now.hours;
        let text = remainTime === 0 ? '잠시 후' : `${remainTime}시간 뒤`;
        result = [text, worshipTimes[now.day][times[i]]];
        break;
      }
    }
  } 

  if (!worshipTimes[now.day] || !result) {
    let remainTime = now.hours < 6 ? 5 - now.hours : 29 - now.hours;
    let text = remainTime === 0 ? '잠시 후' : `${remainTime}시간 뒤`;
    result = [text, '새벽예배'];
  }
  return result;
}


function playYoutube() {
  document.querySelector('#onairIcon').style.visibility = 'hidden';
  document.querySelector('#main-thumbnail').style.visibility = 'hidden';
  document.querySelector('#imgOuter').style.zIndex = 1;
  document.querySelector('#yt-player').src += '?autoplay=1&rel=0'; 
}