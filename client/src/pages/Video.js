import React from 'react';
import YouTube from 'react-youtube';

const opts = {
  height: '390',
  width: '640',
  // playerVars: {
  //   // https://developers.google.com/youtube/player_parameters
  //   autoplay: 1,
  // },
};

function _onReady(event) {
  // access to player in all event handlers via event.target
  event.target.playVideo();
}



function Video() {
  return (
    <div>
      <h1>video</h1>
      <YouTube videoId="i5ImwmxIBtc" opts={opts} onReady={_onReady} />;
    </div>
  )
}

export default Video;