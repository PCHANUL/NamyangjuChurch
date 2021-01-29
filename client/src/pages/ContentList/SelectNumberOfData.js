import React from 'react'; 

import { useAppStore } from '../../state/appContext';

export default function SelectNumberOfData() {
  const appStore = useAppStore();

  return (
    <div id='dataNumberDiv'>
      <select id='dataNumber' defaultValue='10'
        onChange={(e) => appStore.setNumberOfData(e.target.value)}
      >
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='15'>15</option>
        <option value='20'>20</option>
      </select>
      <label id='selectUnit' htmlFor="dataNumber">{appStore.selectedCategory === 0 ? '줄' : '개'}씩 보입니다</label>
      <div id='dataArrowIcon'></div>
    </div>
  )
}