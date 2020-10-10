import React from 'react';
import YouTube from 'react-youtube';

const opts = {
  height: '390',
  width: '640',
};

function _onReady(event) {
  // access to player in all event handlers via event.target
  // event.target.playVideo();
}

function Video() {
  return (
    <div>
      <h1>video</h1>
      <div style={{width: '80vw', height: '40vw', border: '2px solid #000'}}>
        <YouTube videoId="A_QaD1D-S2A" opts={opts} onReady={_onReady} />;
      </div>
      <div style={{width: '80vw', height: '40vw', border: '2px solid #000'}}>
       텍스트
      </div>

    </div>
  )
}

export default Video;