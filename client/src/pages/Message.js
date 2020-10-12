import React from 'react';

import VideoList from './VideoList';

import './message.css';

function Message() {
  return (
    <div id='msgPage'>
      <h1>message page</h1>
      <div>
        <div class='tabs'>주일</div>
        <div class='tabs'>수요</div>
        <div class='tabs'>금요</div>
        <div class='tabs'>새벽</div>
        <div class='tabs'>기도수첩</div>
      </div>
      
      <VideoList />
      
    </div>
  )
}

export default Message;