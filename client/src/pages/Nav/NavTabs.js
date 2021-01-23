import React, { useEffect, useState } from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import { scrollFunc } from '../Methods';

export default function NavTabs() {
  const appStore = useAppStore();
  const worships = [
    {
      category: 'video',
      arr: ['주일예배', '수요예배', '금요예배', '새벽예배', '기도수첩'],
      color: ['rgb(248, 175, 72)', 'rgb(118, 192, 6)', 'rgb(1, 167, 200)', 'rgb(146, 74, 239)', 'rgb(90, 90, 90)']
    },
    {
      category: 'com',
      arr: ['교회사진']
    }
  ];

  const moveTab = (pos) => {
    appStore.setVideoList(appStore.selectedCategory, pos);
  }
  
  useObserver(() => (
    useEffect(() => {
      let scroll;
      if (appStore.windowWidth < 640) {
        scroll = scrollFunc(
          document.querySelector(`#${worships[appStore.selectedCategory].category}TabList`), 
          document.querySelector('#tabListOuter'),
          worships[appStore.selectedCategory].arr.length, 
          appStore.windowWidth / 100 * 17,
          'tabList',
          appStore.selectedDetail,
          (pos) => moveTab(pos),
        );
        scroll.addScrollEvent();
      }

      return () => {
        if (scroll) scroll.removeScrollEvent();
      }
    }, [appStore.windowWidth, appStore.selectedCategory])
  ))

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
      
      <div id={`${worships[appStore.selectedCategory].category}TabList`} className={`tabList${appStore.selectedDetail ? appStore.selectedDetail : ''}`}>
        {
          worships[appStore.selectedCategory].arr.map((word, idx) => {
            return (
              <div key={idx} 
              className={
                `tab ${appStore.selectedCategory === 1 ? (
                  appStore.selectedDetail === idx + 5 ? 'selectedTab' : ''
                  ) : (
                  appStore.selectedDetail === idx ? 'selectedTab' : ''
                )}`
              }
              style={{'backgroundColor': `${
                appStore.selectedDetail === idx ? (
                  worships[appStore.selectedCategory].color[idx]
                ) : ( '' )
              }`}}
              onClick={() => (appStore.windowWidth > 640) && appStore.setVideoList(appStore.selectedCategory, idx)}>
                {word}
              </div>
            )
          })
        }
      </div>
    </div>
  ))
}