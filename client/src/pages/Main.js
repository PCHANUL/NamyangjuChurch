import React from 'react';
import { Link } from 'react-router-dom';

import mainImage from '../images/main.jpg';
import thumbnail from '../images/thumbnail.png';
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps';
import KEYS from '../keys';

function NaverMapAPI() {
  return (
    <NaverMap
      mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
      style={{
        width: '100%', // 네이버지도 가로 길이
        height: '30vw' // 네이버지도 세로 길이
      }}
      defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
      defaultZoom={13} // 지도 초기 확대 배율
    />
  );
}

function Main() {

  return (
    <div>
      <h1>Home</h1>
      <img src={mainImage} alt="..." style={{width: '80vw', height: 'auto'}}></img>
      <div style={{width: '80vw', height: '40vw', border: '2px solid #000'}}>
        <h1>교회소개</h1>
        <img src={thumbnail} alt="..." style={{width: '10vw', height: 'auto'}}></img>
        <h4>담임목사: 박종수</h4>
        <p>알수 없는 영적문제로 말미암아 삶이 무너지지만 원인과 해결책을 얻지 못하고 방황하고 헤매이고 있습니다 <br/>
        예수 그리스도만이 우리 인생의 모든 문제의 해답이며 유일한 길입니다.</p>

      </div>
      <div style={{width: '80vw', height: '40vw', border: '2px solid #000'}}>
        <div style={{float: 'left', width: '30vw', height: '40vw', border: '2px solid #000'}}>
          <h1>메시지 페이지 이동</h1>
        </div>
        <div style={{float: 'left', width: '30vw', height: '40vw', border: '2px solid #000'}}>
          <h1>갤러리 페이지 이동</h1>
        </div>
      </div>
      <div style={{width: '80vw', height: '40vw', border: '2px solid #000'}}>
        <h1>오시는길</h1>
        <RenderAfterNavermapsLoaded
          ncpClientId={KEYS.NAVER_ID} 
          error={<p>Maps Load Error</p>}
          loading={<p>Maps Loading...</p>}
        >
          <NaverMapAPI />
        </RenderAfterNavermapsLoaded>
      </div>
      <div style={{width: '80vw', height: '20vw', border: '2px solid #000'}}>
        <h1>예배시간</h1>
      </div>
    </div>
  )
}

export default Main;