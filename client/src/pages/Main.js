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
    <div id="main">
      <img src={mainImage} alt="..." id="mainImg"></img>

      <div id='intro'>
        <p>담임목사</p>
        <img src={thumbnail} alt="..." style={{width: '10vw', height: 'auto'}}></img>
        <h1>박종수</h1>
        <p>알수 없는 영적문제로 말미암아 삶이 무너지지만 원인과 해결책을 얻지 못하고 방황하고 헤매이고 있습니다 <br/>
        예수 그리스도만이 우리 인생의 모든 문제의 해답이며 유일한 길입니다.</p>

      </div>
      <div style={{height: '40vw', border: '1px solid #000'}}>
        <h1>교회 기도제목</h1>

      </div>

      <div style={{height: '40vw'}}>
        <h1>오시는길</h1>
        <Map
          startPoint={{ lat: places[0].lat, lng: places[0].lng }}
          endPoint={{ lat: places[1].lat, lng: places[1].lng }}
        />
        <button style={{width: '30vw'}}>
          <h1>
            현재 위치에서 교회까지 경로 확인하기
          </h1>
        </button>
      </div>
      <div style={{height: '60vw', border: '2px solid #000'}}>
        <h1>예배시간</h1>
        <TimeTable />
      </div>
    </div>
  )
}

export default Main;