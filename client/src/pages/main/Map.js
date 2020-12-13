import React, { Component, memo, useState, useRef, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import KEYS from './keys';

import './map.css';
import '../responsibleCSS/mobileMap.css';

const findRoute = () => {
  // alert('길을 찾는 중...')
  let confirm = window.confirm('카카오맵 페이지로 이동하시겠습니까?')
  if (confirm) window.open('https://map.kakao.com/link/to/남양주사랑교회,37.659365,127.179435')
}

const onEventChecker = (e, aug, geo) => {
  console.log(e, aug, geo)
}

export class GoogleMap extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
 
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render()  {
    return (
      <div className='gMap'>
        <button onClick={findRoute}>
          교회 길찾기
        </button>
        <Map
          google={this.props.google}
          onClick={this.onMapClicked}
          initialCenter={{lat: 37.659365, lng: 127.179435 }}
        >
          <Marker/>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: KEYS.G_API
})(GoogleMap);