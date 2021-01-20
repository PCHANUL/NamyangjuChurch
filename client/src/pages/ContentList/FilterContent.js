import React, { useState, useEffect } from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './FilterContent.css';
import '../responsibleCSS/mobileFilterContent.css';

// components
import SearchDiv from './SearchDiv';
import { OrderButton } from './OrderButton';

export default function FilterContent() {
  const appStore = useAppStore();
  const [searchInput, setSearchInput] = useState('');

  // sortButton 초기설정
  const sortOptions = [{name: '성경순', key: 'verse'}, {name: '날짜순', key: 'createdAt'}];
  
  // localStorage 저장값 가져오기
  useEffect(() => {
    for (let option of sortOptions) appStore[option.key] = Number(localStorage.getItem(option.key));
    appStore.search = localStorage.getItem('search') === null ? '' : localStorage.getItem('search');
  }, [])

  
  return useObserver(() => (
      <div id='filterDiv'>
        {
          sortOptions.map((item, i) => 
            <OrderButton key={i} value={{ item, appStore }} />)
        }

        <SearchDiv value={{ searchInput }} method={{ setSearchInput }} />
      </div>
  ))
}

/* {
  JSON.stringify(sortStatus) !== '{"verse":0,"createdAt":0}' ?
  keywords.search ? (
  <Button className='initFilter' onClick={() => {
    appStore.deleteSearch();
    for (let i in keywords.sort) initOrderStatus(i)
  }}>모두 취소</Button>
  ) : (
  <Button className='initFilter' onClick={() => {
    appStore.deleteSearch();
    for (let i in keywords.sort) initOrderStatus(i)
  }}>취소</Button>
  ) : <></>
} */



