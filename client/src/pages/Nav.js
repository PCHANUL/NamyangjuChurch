import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './nav.css';

import { useAppStore } from '../state/appContext';
import { useObserver } from 'mobx-react';

function Nav() {
  let location = useLocation();
  const appStore = useAppStore();
  console.log('appStore: ', appStore);

  return useObserver(() => (
    <nav>
      <div id='nav'>
        <Link to="/" className='home'>
          남양주 사랑교회
        </Link>
        <Link to="/community" className='button' onClick={() => appStore.setVideoList(1, 0)}>
          교회소식
        </Link>
        <Link to="/videolist" className='button' onClick={() => appStore.setVideoList(0, 0)}>
          말씀보기
        </Link>
      </div>
      {
        location.pathname === '/videolist' &&
        <div id='tabList'>
          {
            ['주일예배', '수요예배', '금요예배', '새벽예배', '기도수첩'].map((word, idx) => {
              if (appStore.selectedDetail === idx) {
                return <div className='tab selectedTab' onClick={() => appStore.setVideoList(0, idx)}>{word}</div>
              } else {
                return <div className='tab' onClick={() => appStore.setVideoList(0, idx)}>{word}</div>
              }
            })
          }
        </div>
      }
    </nav>
  ))
}

export default Nav;
