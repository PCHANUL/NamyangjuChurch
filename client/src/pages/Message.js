import React from 'react';

import VideoList from './VideoList';

import './message.css';

function Message() {
  return (
    <div id='message'>
      <div id='tabList'>
        <div class='tab'>주일예배</div>
        <div class='tab'>수요예배</div>
        <div class='tab'>금요예배</div>
        <div class='tab'>새벽예배</div>
        <div class='tab'>기도수첩</div>
      </div>
      <VideoList />
    </div>
  )
}

export default Message;