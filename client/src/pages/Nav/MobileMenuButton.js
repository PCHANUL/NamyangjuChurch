import React, { useState, useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

export default function MobileMenuButton() {
  const appStore = useAppStore();

  return (
    <>
      <MenuButton />
      <div id='drawerBackground' className='background hidden'></div>
      <div id='drawerMenu' className='drawerMenuOpen'>
        <Link to="/" className='menuBtn'>
          홈
        </Link>
        <Link to="/contentlist" className='menuBtn' onClick={() => {
          appStore.setVideoList(1, 0);
          clickFunction()
        }}>
          교회소식
        </Link>
        <Link to="/contentlist" className='menuBtn' onClick={() => {
          appStore.setVideoList(0, 0);
          clickFunction()
        }}>
          말씀보기
        </Link>
      </div>
    </>
  )
}

const MenuButton = () => {

  return (
    <div id='drawerMenuBtn' onClick={clickFunction}>
      <div className='menuBtnIcon'></div>
      <div className='menuBtnIcon'></div>
      <div className='menuBtnIcon'></div>
    </div>
  )
}

const clickFunction = () => {
  let children = document.querySelector('#drawerMenuBtn').childNodes;
  children[0].className = 'menuBtnIcon icon_top';
  children[2].className = 'menuBtnIcon icon_bot';

  if (openMemu() === true) {
    setTimeout(() => {
      children[0].className = 'menuBtnIcon';
      children[1].className = 'menuBtnIcon';
      children[2].className = 'menuBtnIcon';
    }, 200)
  } else {
    setTimeout(() => {
      children[0].className = 'menuBtnIcon icon_top closedIcon_top';
      children[1].className = 'menuBtnIcon icon_mid';
      children[2].className = 'menuBtnIcon icon_bot closedIcon_bot';
    }, 200)
  }
}

const openMemu = () => {
  let target = document.querySelector('#drawerMenu');
  let targetBackground = document.querySelector('#drawerBackground');
  if (target.className === 'drawerMenuOpen') {
    target.className = '';
    targetBackground.className = 'background';
    return false;
  } else {
    target.className = 'drawerMenuOpen';
    targetBackground.className = 'background hidden';
    return true;
  }
}

