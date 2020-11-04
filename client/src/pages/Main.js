import React from 'react';
import { Link } from 'react-router-dom';

import mainImage from '../images/main.jpg';
import thumbnail from '../images/thumbnail.png';

import './main.css'

import Map from './Map';
import TimeTable from './TimeTable';

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
  return (
    <>
      <div id="mainImg">
        <img src={mainImage} alt="..." ></img>
      </div>

      <div id="main">
        <div id="prayer">
          <h1>교회 기도제목</h1>
          <div id='cardContainer'>

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
              <h2 style={{marginTop: '2.5vw'}}>강북 600만, <br /> 남양주, 양주<br />100만 복음화</h2>
              <ul>
                <li>5000제자, 2000지교회</li>
                <li>200절대제자, 200장로</li>
                <li>200렘넌트 </li>
              </ul>
            </div>
          </div>
        </div>


        <div id='intro'>
          <p>담임목사</p>
          <img src={thumbnail} alt="..." style={{width: '10vw', height: 'auto'}}></img>
          <h1>박종수</h1>
          <p>알수 없는 영적문제로 말미암아 삶이 무너지지만 원인과 해결책을 얻지 못하고 방황하고 헤매이고 있습니다 <br/>
          예수 그리스도만이 우리 인생의 모든 문제의 해답이며 유일한 길입니다.</p>
        </div>


        <div style={{height: '40vw', marginTop: '2vw'}}>
          <h1>오시는길</h1>
          <Map
            startPoint={{ lat: places[0].lat, lng: places[0].lng }}
            endPoint={{ lat: places[1].lat, lng: places[1].lng }}
          />
        </div>
        <div style={{height: '60vw', border: '2px solid #000'}}>
          <h1>예배시간</h1>
          <TimeTable />
        </div>
      </div>
    </>
  )
}

export default Main;