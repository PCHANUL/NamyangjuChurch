import React from 'react';
import {useParams} from 'react-router-dom';

import './video.css';


const opts = {
  height: '50%',
  width: '50%',
};


function Video() {
  const { id } = useParams();
  console.log('id: ', id);
  

  return (
    <div id='video'>
      <h1>video</h1>
      <div id='contentBody'></div>
    </div>
  )
}

export default Video;