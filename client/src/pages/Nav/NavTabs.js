import React, { useEffect } from 'react';

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
    if (window.innerWidth < 640) {
      const scroll = scrollFunc(
        document.querySelector(`#${worships[appStore.selectedCategory].category}TabList`), 
        document.querySelector('#tabListOuter'),
        worships[appStore.selectedCategory].arr.length, 
        window.innerWidth / 100 * 17,
        'tabList',
        (pos) => moveTab(pos)
      );
      scroll.addScrollEvent();
    }

    return () => {
      if (window.innerWidth < 640) {
        scroll.removeScrollEvent();
      }
    }
  }, [])


  return useObserver(() => (
    <div id='tabListOuter'>
      {
        window.innerWidth < 640 ? (
          <>
            <button className='navTabButton buttonLeft'>{'<'}</button>
            <button className='navTabButton buttonRight'>{'>'}</button>
          </>
        ) : ( <></> )
      }
      
      <div id={`${worships[appStore.selectedCategory].category}TabList`} className='tabList'>
        {
          worships[appStore.selectedCategory].arr.map((word, idx) => {
            return (
              <div key={idx} className={`tab${appStore.selectedDetail === idx ? ' selectedTab' : ''}`}
              onClick={() => {
                if (window.innerWidth > 640) appStore.setVideoList(appStore.selectedCategory, idx);
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