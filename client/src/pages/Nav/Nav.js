import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './nav.css';
import '../responsibleCSS/mobileNav.css';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

function isScrollDown() {
  let pos = window.scrollY;
  
  return function() {
    // console.log('window.scrollY: ', window.scrollY);
    // console.log('document.body.scrollHeight: ', document.body.scrollHeight);
    // console.log('document.body.scrollHeight - window.innerHeight: ', document.body.scrollHeight - window.innerHeight);
    
    if (window.scrollY <= 100) {
      return true;
    } else if (window.scrollY > document.body.scrollHeight - window.innerHeight) {
      return false;
    } else {
      if (pos < window.scrollY) {
        pos = window.scrollY;
        return false;
      } else if (pos > window.scrollY){
        pos = window.scrollY;
        return true;
      }
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
      if (window.location.href.includes('/contentlist')) {
        if (window.innerWidth > 648) document.querySelector('#nav').className = '';
        let checked = scroll();
        if (checked !== undefined) {
          if (checked === true) {
            document.getElementsByClassName('tabList')[0].className = 'tabList';
            if (window.innerWidth <= 648) document.querySelector('#nav').className = '';
          } else {
            document.getElementsByClassName('tabList')[0].className = 'tabList hiddenDrawer';
            if (window.innerWidth <= 648) document.querySelector('#nav').className = 'hiddenDrawer';

          }
        }
      }
    }, 500)
    return () => {
      clearInterval(checkScroll);
    }
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
      {/* content tab */}
      {
        location.pathname === '/contentlist' && 
          <NavTabs appStore={appStore} />
      }
      {/* menu */}
      <div id='drawerMenuBtn' onClick={openMemu}></div>
      <div id='drawerBack' className='background hidden'></div>
      <div id='drawerMenu' className='drawerMenuOpen'>
        {/* <h4>남양주 사랑교회</h4> */}
        <Link to="/" className='menuBtn'>
          홈
        </Link>
        <Link to="/contentlist" className='menuBtn' onClick={() => appStore.setVideoList(1, 0)}>
          교회소식
        </Link>
        <Link to="/contentlist" className='menuBtn' onClick={() => appStore.setVideoList(0, 0)}>
          말씀보기
        </Link>
        <h4>검색</h4>
      </div>
    </nav>
  ))
}

function openMemu() {
  let target = document.querySelector('#drawerMenu');
  let targetBackground = document.querySelector('#drawerBack');
  target.className = target.className === 'drawerMenuOpen' ? '' : 'drawerMenuOpen';
  targetBackground.className = targetBackground.className === 'background hidden' ? 'background' : 'background hidden';
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

