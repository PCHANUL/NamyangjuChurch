import React from 'react';

import VideoList from './VideoList';

import './message.css';

function Message() {
  return (
    <div id='message'>
      <div id='tabList'>
        <div className='tab'>주일예배</div>
        <div className='tab'>수요예배</div>
        <div className='tab'>금요예배</div>
        <div className='tab'>새벽예배</div>
        <div className='tab'>기도수첩</div>
      </div>
      <VideoList />
    </div>
  )
}

export default Message;