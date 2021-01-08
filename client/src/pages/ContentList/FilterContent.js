import React, { useState, useEffect } from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './FilterContent.css';
import '../responsibleCSS/mobileFilterContent.css';

// components
import { Button } from './Button';
import SearchDiv from './SearchDiv';
import { OrderButton } from './OrderButton';

export default function FilterContent(props) {
  const appStore = useAppStore();
  const { data } = props.value;
  const { setData, initData } = props.method;

  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState(false);

  // sortButton 초기설정
  const sortOptions = [{name: '성경순', key: 'verse'}, {name: '날짜순', key: 'createdAt'}];
  const [sortStatus, setSortStatus] = useState({verse: 0, createdAt: 0});

  // keyword 초기설정
  const [keywords, setKeywords] = useState({})
  
  // localStorage 저장값 가져오기
  useEffect(() => {
    for (let option of sortOptions) appStore[option.key] = Number(localStorage.getItem(option.key));
    appStore.search = localStorage.getItem('search') === null ? '' : localStorage.getItem('search');
  }, [])

  const initOrderStatus = (targetKey) => {
    for (let option in sortStatus) {
      if (option !== targetKey) {
        sortStatus[option] = 0;
        localStorage.setItem(option, 0)
      }
    }
    setSortStatus(sortStatus);
  }
  
  return useObserver(() => (
      <div id='filterDiv'>
        {
          sortOptions.map((item, i) => (
            <OrderButton
              key={i}
              value={{ item, appStore }}
              method={{ initOrderStatus }}
            />
          ))
        }

        <SearchDiv 
          value={{ searchInput }} 
          method={{ setSearchInput }}
        />

        {
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
        }
      </div>
  ))
}



