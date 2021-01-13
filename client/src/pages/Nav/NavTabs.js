import React from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

export default function NavTabs() {
  const appStore = useAppStore();
  const worships = [
    {
      category: 'video',
      arr: ['주일예배', '수요예배', '금요예배', '새벽예배', '기도수첩']
    },
    {
      category: 'community',
      arr: ['교회사진']
    }
  ];


  return useObserver(() => (
    <div id={`${worships[appStore.selectedCategory].category}TabList`} className='tabList'>
      {
        worships[appStore.selectedCategory].arr.map((word, idx) => {
          return (
            <div key={idx} className={`tab${appStore.selectedDetail === idx ? ' selectedTab' : ''}`}
            onClick={() => appStore.setVideoList(appStore.selectedCategory, idx)}>
              {word}
            </div>
          )
        })
      }
    </div>
  ))
}