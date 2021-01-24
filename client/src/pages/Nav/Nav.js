import React, { useState, useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './nav.css';
import '../responsibleCSS/mobileNav.css';

// component
import MobileMenuButton from './MobileMenuButton';
import NavTabs from './NavTabs';
import { GobackButton } from '../ContentList/Button';

export default function Nav() {
  const appStore = useAppStore();
  const location = useLocation();

  const scroll = isScrollDown();

  let checkScroll;  // interval
  useEffect(() => {
    if (window.location.href.includes('/contentlist')) {
      checkScroll = setInterval(() => {
        if (window.innerWidth > 648) document.querySelector('#nav').className = '';
        let checked = scroll();
        if (checked !== undefined) {
          if (checked === true) {
            document.querySelector('#tabListOuter').className = '';
            if (window.innerWidth <= 648) document.querySelector('#nav').className = '';
          } else {
            document.querySelector('#tabListOuter').className = 'hiddenDrawer';
            if (window.innerWidth <= 648) document.querySelector('#nav').className = 'hiddenDrawer';
          }
        }
      }, 500)
    } 
    
    return () => {
      clearInterval(checkScroll);
    }
  })
  
  return useObserver(() => (
    <nav>
      {
        // 모바일 화면에서 컨텐츠를 볼 때 nav 제외
        location.pathname.includes('/content/') === true && window.innerWidth < 648 
        ? (
          <GobackButton />
        ) : (
          <div id='nav' style={{borderBottom: window.location.pathname !== '/' && '1px solid #000'}}>
            <a id='home' onClick={() => window.location = '/'}>
              남양주 사랑교회
            </a>
            <div id='NavButtonDiv'>
              <Link to="/contentlist" className='button' onClick={() => appStore.setVideoList(1, 0)}>
                교회소식
              </Link>
              <Link to="/contentlist" className='button' onClick={() => appStore.setVideoList(0, 0)}>
                말씀보기
              </Link>
            </div>
          </div>
        )
      }

      {
        // 리스트 화면에서만 탭 생성
        location.pathname === '/contentlist' && 
          <NavTabs appStore={appStore} />
      }
      {/* 모바일 메뉴 */}
      <MobileMenuButton />
    </nav>
  ))
}

function isScrollDown() {
  let pos = window.scrollY;
  
  return function() {
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




