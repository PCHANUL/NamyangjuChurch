import React, { memo, useState, useRef, useEffect, } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";
import KEYS from './keys';

import './map.css';
import '../responsibleCSS/mobileMap.css';

// const Directions = (props) => {
//   const [directions, setDirections] = useState();
//   const { origin, destination } = props;
//   const count = useRef(0);

//   const options = {
//     polylineOptions: {
//       strokeColor: 'red',
//       strokeWeight: 6,
//       strokeOpacity: 0.8,
//     }
//   };

//   useEffect(() => {
//     count.current = 0;
//     console.log(origin, destination);
//   }, [origin.lat, origin.lng, destination.lat, destination.lng]);

//   const directionsCallback = (result, status) => {
//     console.log(result, status);
//     if (status === 'OK' && count.current === 0) {
//       count.current += 1;
//       setDirections(result);
//     }
//   };

//   return (
//     <>
//       <DirectionsService
//         options={{ origin, destination, travelMode: 'TRANSIT' }}
//         callback={directionsCallback}
//       />
//       <DirectionsRenderer directions={directions} options={options}/>
//     </>
//   );
// };

const findRoute = () => {
  // alert('길을 찾는 중...')
  let confirm = window.confirm('카카오맵 페이지로 이동하시겠습니까?')
  if (confirm) window.open('https://map.kakao.com/link/to/남양주사랑교회,37.659365,127.179435')
}

const onEventChecker = (e, aug, geo) => {
  console.log(e, aug, geo)
}

// function getLocation() {
//   if (navigator.geolocation) { // GPS를 지원하면
//     navigator.geolocation.getCurrentPosition(function(position) {
//       alert(position.coords.latitude + ' ' + position.coords.longitude);
//     }, function(error) {
//       console.error(error);
//     });
//   } else {
//     alert('GPS를 지원하지 않습니다');
//   }
// }

const Map = (props) => {

  return (
    <LoadScript googleMapsApiKey={KEYS.G_API}>
      <GoogleMap
        mapContainerClassName='gMap'
        zoom={14}
        center={{lat: 37.659365, lng: 127.179435 }}
        onClick={onEventChecker}
      >
        <Marker position={{ lat: 37.659365, lng: 127.179435 }}>
          <InfoWindow>
            <div id='infoWindow'>
              <button onClick={findRoute}>
                교회 길찾기
              </button>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    </LoadScript>
  )
}

export default memo(Map)