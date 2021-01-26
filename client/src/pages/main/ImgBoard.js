import React, { useEffect, useState } from 'react';
import './imgBoard.css';
import '../responsibleCSS/mobileImgBoard.css';

import { calcPassedTime } from '../Methods';
import { getLiveUrl } from '../axiosRequest';

export default function ImgBoard() {
  const [liveInfo, setLiveUrl] = useState({url: '', isLive: false})
  let infoData = calcTime();
  
  useEffect(() => {
    getLiveUrl((result) => {
      setLiveUrl({
        url: result.url,
        isLive: (result.live === 'live'),
      });
    });
  },[])

  return (
    <div id='imgBoard'>
      <div id='onairInfo'>
        {
          liveInfo.isLive ? (
            <h1>{infoData[1]} 중입니다</h1>
            ) : (
            <h1>{infoData[0]}</h1>
          )
        }
        <div id='prevPlay' onClick={playYoutube}>
          <svg id="ytp-Btn" height="100%" version="1.1" viewBox="0 0 68 48" width="120%" >
            <path d="M 45,24 27,14 27,34"></path>
          </svg>
        </div>
      </div>

      <div id='imgOuter'>
        <div id="mainImg">
          <img id="main-thumbnail" src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/mainPage/main.jpg' alt="..." ></img>
          <iframe id='yt-player' width="100%" height="100%" src={`https://www.youtube.com/embed/${liveInfo.url}`}
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
        let nextWorship = worshipTimes[now.day][times[i]];
        let text = remainTime === 0 ? `잠시 후에 ${nextWorship}가 시작됩니다` : 
               remainTime > 10 ? `다음 예배는 ${nextWorship}입니다` : `${remainTime}시간 뒤에 ${nextWorship}가 시작됩니다`;
        result = [text, nextWorship];
        break;
      }
    }
  } 

  if (!worshipTimes[now.day] || !result || ([0, 3].includes(now.day) && now.hours < 6)) {
    let remainTime = now.hours < 6 ? 5 - now.hours : 29 - now.hours;
    let text = remainTime === 0 ? '잠시 후에 새벽예배가 시작됩니다' : 
               remainTime > 10 ? `다음 예배는 새벽예배입니다` : `${remainTime}시간 뒤에 새벽예배가 시작됩니다`;
    result = [text, '새벽예배'];
  }
  return result;
}


function playYoutube() {
  document.querySelector('#main-thumbnail').style.visibility = 'hidden';
  document.querySelector('#imgOuter').style.zIndex = 1;
  document.querySelector('#yt-player').src += '?autoplay=1&rel=0'; 
}