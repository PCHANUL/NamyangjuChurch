import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './nav.css';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

function isScrollDown() {
  let pos = window.scrollY;

  return function() {
    if (pos < window.scrollY) {
      pos = window.scrollY;
      return false;
    } else if (pos > window.scrollY){
      pos = window.scrollY;
      return true;
    }
  }
}

export default function Nav() {
  const [scrollDown, setScrollDown] = useState(true);
  const appStore = useAppStore();
  const location = useLocation();

  const scroll = isScrollDown();

  useEffect(() => {
    const checkScroll = setInterval(() => {
      if (location.pathname === '/contentlist') {
        let checked = scroll();
        if (checked !== undefined) setScrollDown(checked);
      }
    }, 500)
  }, [])

  return useObserver(() => (
    <nav>
      <div id='nav'>
        <Link to="/" className='home'>
          남양주 사랑교회
        </Link>
        <Link to="/contentlist" className='button' onClick={() => appStore.setVideoList(1, 0)}>
          교회소식
        </Link>
        <Link to="/contentlist" className='button' onClick={() => appStore.setVideoList(0, 0)}>
          말씀보기
        </Link>
      </div>
      {
        location.pathname === '/contentlist' && scrollDown &&
          <NavTabs appStore={appStore} />
      }
    </nav>
  ))
}

function NavTabs({ appStore }) {
  if (appStore.selectedCategory === 0) {
    return useObserver(() => (
      <div id='videoTabList' className='tabList'>
        {
          ['주일예배', '수요예배', '금요예배', '새벽예배', '기도수첩'].map((word, idx) => {
            if (appStore.selectedDetail === idx) {
              return <div key={idx} className='tab selectedTab' onClick={() => appStore.setVideoList(0, idx)}>{word}</div>
            } else {
              return <div key={idx} className='tab' onClick={() => appStore.setVideoList(0, idx)}>{word}</div>
            }
          })
        }
      </div>
    ))
  } else if (appStore.selectedCategory === 1) {
    return useObserver(() => (
      <div id='communityTabList' className='tabList'>
        <div className='tab' onClick={() => appStore.setVideoList(1, 0)}>교회사진</div>
      </div>
    ))
  }
  return <div />
}

