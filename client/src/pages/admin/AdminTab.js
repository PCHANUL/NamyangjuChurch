import React from 'react';

import { useObserver } from 'mobx-react-lite';
import { useAppStore } from '../../state/appContext';

export default function AdminTab() {
  const appStore = useAppStore();

  return useObserver (() => (
    <div id='tabContainer'>
      <div id='adminTabBox'>
        {
          ['말씀', '소식'].map((ele, idx) => {
            return idx === appStore.selectedCategory
          ? <div key={`tab_${idx}`} className='adminTab selected'>{ele}</div>
          : <div key={`tab_${idx}`} className='adminTab' onClick={() => appStore.setVideoList(idx, 0)}>{ele}</div>
          })
        }
      </div>
      { appStore.selectedCategory === 0 ? (
        <div id='subTabBox'>
          {
            ['주일', '수요', '금요', '새벽', '기도수첩'].map((ele, idx) => {
              return idx === appStore.selectedDetail 
              ? <div key={`subTab_${idx}`} className='subTab selected'>{ele}</div>
              : <div key={`subTab_${idx}`} className='subTab' onClick={() => {
                console.log('appStore.selectedCategory, idx: ', appStore.selectedCategory, idx);
                appStore.setVideoList(appStore.selectedCategory, idx)
              }}>{ele}</div>
            })
          }
        </div>
        ) : (
          ['교회 사진'].map((ele, idx) => {
            return idx === appStore.selectedDetail 
            ? <div key={`subTab_${idx}`} className='subTab selected'>{ele}</div>
            : <div key={`subTab_${idx}`} className='subTab' onClick={() => appStore.setVideoList(appStore.selectedCategory, idx)}>{ele}</div>
          })
        )
      }
    </div>
  ))
}