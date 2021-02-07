import React from 'react';

import { useObserver } from 'mobx-react-lite';
import { useAppStore } from '../../state/appContext';

export default function AdminTab() {
  const appStore = useAppStore();

  const tabs = {
    worships: ['말씀', '소식'],
    colors: ['rgb(90, 90, 90)', 'rgb(90, 90, 90)']
  }

  const subTabs = {
    worships: ['주일예배', '수요예배', '금요예배', '새벽예배', '기도수첩', '교회사진'],
    colors: ['rgb(248, 175, 72)', 'rgb(118, 192, 6)', 'rgb(1, 167, 200)', 'rgb(146, 74, 239)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)']
  }

  return useObserver (() => (
    <div id='tabContainer'>
      <TabBox 
        name={'admin'} infoObj={tabs} selected={appStore.selectedCategory} 
        onClick={(i) => appStore.setVideoList(i, 0)}
        />
      <TabBox 
        name={'sub'} infoObj={subTabs} selected={appStore.selectedDetail} 
        onClick={(i) => appStore.setVideoList(appStore.selectedCategory, i)}
        filter={(i) => {
          if (appStore.selectedCategory === 0 && i > 4) return true
          else if (appStore.selectedCategory === 1 && i <= 4) return true
          else false
        }}
      />
    </div>
  ))
}


const TabBox = (props) => {
  const { 
    name, infoObj, selected, 
    onClick, filter
  } = props;

  return (
    <div id={`${name}TabBox`}>
      {
        infoObj.worships.map((ele, idx) => {
          if (filter && filter(idx)) return

          return idx === selected
          ? <div key={`${name}_${idx}`} className={`${name}Tab selected`} style={{backgroundColor: infoObj.colors[idx]}}>{ele}</div>
          : <div key={`${name}_${idx}`} className={`${name}Tab`} onClick={() => onClick(idx)}>{ele}</div>
        })
      }
    </div>
  )
}

