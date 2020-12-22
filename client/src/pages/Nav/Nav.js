import React, { useState, useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './nav.css';
import '../responsibleCSS/mobileNav.css';

// component
import MobileMenuButton from './MobileMenuButton';

export default function Nav() {
  const appStore = useAppStore();
  const location = useLocation();

  const scroll = isScrollDown();

  const rootScroll = () => {
    if (window.innerWidth / window.scrollY > 3.5) {
      document.querySelector('#home').className = 'hiddenHome';
      document.querySelector('#nav').removeAttribute('style');
    } else {
      document.querySelector('#home').removeAttribute('class');
      document.querySelector('#nav').style.borderBottom = '1px solid #000';
    }
  }

  let checkScroll;  // interval
  useEffect(() => {
    if (window.location.href.includes('/contentlist')) {
      checkScroll = setInterval(() => {
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
      }, 500)
    } 
    
    let scrollEvent = false;
    if (window.location.pathname === '/') {
      window.addEventListener('scroll', rootScroll);
      scrollEvent = true;
    }

    return () => {
      clearInterval(checkScroll);
      if (scrollEvent) {
        window.removeEventListener('scroll', rootScroll);
        document.querySelector('#home').removeAttribute('class');
        document.querySelector('#nav').style.borderBottom = '1px solid #000';
      }
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
          <a id='home' className={window.location.pathname === '/' ? 'hiddenHome' : ''} onClick={() => window.location = '/'}>
            남양주 사랑교회
          </a>
          <Link to="/contentlist" className='button' onClick={() => appStore.setVideoList(1, 0)}>
            교회소식
          </Link>
          <Link to="/contentlist" className='button' onClick={() => appStore.setVideoList(0, 0)}>
            말씀보기
          </Link>
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

function GobackButton() {
  const clickFunc = () => {
    let target = document.getElementsByClassName('goback')[0].childNodes[1];
    clickMotion(target);
    
  }

  const clickMotion = (target) => {
    let div = document.createElement('div');
    div.className = 'clickMotion';
    let rect = target.getBoundingClientRect();
    console.log('rect: ', rect);
    div.style.top = `${rect.height / 2 - rect.height / 7}px`;
    div.style.left = `${rect.width / 2 - rect.width / 9}px`;
    target.appendChild(div);

    setTimeout(() => {
      div.className = div.className + ' clickMotion_visible';
      setTimeout(() => {
        div.className = 'clickMotion';
        window.history.back();
        div.parentNode.removeChild(div)
      }, 200)
    }, 0);
  }

  return (
    <button className='goback' onMouseDown={clickFunc}>
      <div className='label'>
        <div className='gobackIcon gobackIcon_top'></div>
        <div className='gobackIcon gobackIcon_bot'></div>
      </div>
      <div className='root'></div>
    </button>
  )
}
