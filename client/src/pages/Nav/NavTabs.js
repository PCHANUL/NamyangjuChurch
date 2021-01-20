import React, { useEffect, useState } from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import { scrollFunc } from '../Methods';

export default function NavTabs() {
  const appStore = useAppStore();
  const worships = [
    {
      category: 'video',
      arr: ['주일예배', '수요예배', '금요예배', '새벽예배', '기도수첩']
    },
    {
      category: 'com',
      arr: ['교회사진']
    }
  ];

  const moveTab = (pos) => {
    console.log(pos);
    appStore.setVideoList(appStore.selectedCategory, pos);
  }
  
  useEffect(() => {
    let scroll;
    if (appStore.windowWidth < 640) {
      scroll = scrollFunc(
        document.querySelector(`#${worships[appStore.selectedCategory].category}TabList`), 
        document.querySelector('#tabListOuter'),
        worships[appStore.selectedCategory].arr.length, 
        appStore.windowWidth / 100 * 17,
        'tabList',
        (pos) => moveTab(pos)
      );
      scroll.addScrollEvent();
    }

    return () => {
      if (scroll) scroll.removeScrollEvent();
    }
  }, [appStore.windowWidth])


  return useObserver(() => (
    <div id='tabListOuter'>
      {
        appStore.windowWidth < 640 ? (
          <>
            <button className='navTabButton buttonLeft'>{'<'}</button>
            <button className='navTabButton buttonRight'>{'>'}</button>
          </>
        ) : ( <></> )
      }
      
      <div id={`${worships[appStore.selectedCategory].category}TabList`} className='tabList'>
        {
          worships[appStore.selectedCategory].arr.map((word, idx) => {
            console.log('word: ', word);
            return (
              <div key={idx} className={`tab${appStore.selectedDetail === idx ? ' selectedTab' : ''}`}
              onClick={() => {
                if (appStore.windowWidth > 640) appStore.setVideoList(appStore.selectedCategory, idx);
              }}>
                {word}
              </div>
            )
          })
        }
      </div>
    </div>
  ))
}