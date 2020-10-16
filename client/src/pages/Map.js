import React, { memo, useState, useRef, useEffect, } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { InfoWindow } from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";


import KEYS from '../keys';

const Directions = (props) => {
  const [directions, setDirections] = useState();
  const { origin, destination } = props;
  const count = useRef(0);

  const options = {
    polylineOptions: {
      strokeColor: 'red',
      strokeWeight: 6,
      strokeOpacity: 0.8,
    }
  };

  useEffect(() => {
    count.current = 0;
    console.log(origin, destination);
  }, [origin.lat, origin.lng, destination.lat, destination.lng]);

  const directionsCallback = (result, status) => {
    console.log(result, status);
    if (status === 'OK' && count.current === 0) {
      count.current += 1;
      setDirections(result);
    }
  };

  return (
    <>
      <DirectionsService
        options={{ origin, destination, travelMode: 'TRANSIT' }}
        callback={directionsCallback}
      />
      <DirectionsRenderer directions={directions} options={options}/>
    </>
  );
};

const Map = (props) => {
  const { startPoint, endPoint } = props;

  return (
    <LoadScript googleMapsApiKey={KEYS.G_API}>
      <GoogleMap
        mapContainerStyle={{
          height: "30vw",
          width: '70vw',
        }}
        zoom={16}
        center={ startPoint ? { lat: 37.659365, lng: 127.179435 } : undefined }
      >
        {/* <SearchBox /> */}
        <Directions origin={startPoint} destination={endPoint} />
      </GoogleMap>
    </LoadScript>
  )
}

export default memo(Map)