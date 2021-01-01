import React, { useState, useEffect } from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './FilterContent.css';
import '../responsibleCSS/mobileSearchContent.css';

// components
import SearchDiv from './SearchDiv';
import { OrderButton } from './OrderButton';

// object 
import { bibleVerse } from './bibleVerse';



export default function FilterContent(props) {
  const appStore = useAppStore();
  const { data, loading } = props.value;
  const { setData, initData } = props.method;

  // sortButton 초기설정
  const sortOptions = [{name: '성경순', key: 'verse'}, {name: '날짜순', key: 'createdAt'}];
  const [sortStatus, setSortStatus] = useState({verse: 0, createdAt: 0});

  const initOrderStatus = (target) => {
    for (let option in sortStatus) {
      if (option !== target) {
        sortStatus[option] = 0;
        localStorage.setItem(option, 0)
      }
    }
    setSortStatus(sortStatus);
  }

  // keyword 초기설정
  const [keywords, setKeywords] = useState({})
  
  // localStorage에 저장된 값 불러오기
  useEffect(() => {
    const initSort = {};
    for (let option of sortOptions) initSort[option.key] = localStorage.getItem(option.key);
    const initSearch = localStorage.getItem('search');
    setKeywords({
      search: initSearch,
      sort: initSort
    })
  }, [])

  const [searchInput, setSearchInput] = useState('');
  const [searchError, setsearchError] = useState(false);

  // localStorage에서 불러온 옵션적용
  useEffect(() => {
    if (loading) {
      if (keywords.search) searchKeywords();
      for (let key in keywords.sort) {
        if (keywords.sort[key]) orderContents(key, keywords.sort[key]);
      }
    }
    
  }, [loading, appStore.selectedDetail])
  
  const deleteFilter = (filterName) => {
    if (filterName === 'search') localStorage.removeItem('search');

    delete keywords[filterName];
    setKeywords(keywords);
    initData();
  }

  const searchKeywords = () => {
    const searchValue = searchInput !== '' ? searchInput : keywords.search;
    setsearchError(false);
    if (searchInput !== '') {
      localStorage.setItem('search', searchInput);
      setKeywords({
        ...keywords,
        search: searchInput
      })
    } 
    // else if (searchInput === '') {
      
      // }
      

    if (searchValue) {
      // 현재 페이지 컨텐츠를 필터링
      let filterTarget = data[appStore.selectedCategory].details[appStore.selectedDetail].posts;
      let filteredData = JSON.parse(JSON.stringify(data));
      let result = filterContents(filterTarget, searchValue, 'title');

      // 검색 결과가 아무것도 없는 경우
      if (result.length === 0) {
        console.log('검색결과가 없습니다.')
        setsearchError(true)
      }

      filteredData[appStore.selectedCategory].details[appStore.selectedDetail].posts = result;
      setData(filteredData);
      setSearchInput('');
    }
  }

  const filterContents = (data, word, ...objKeys) => {
    return data.filter((ele) => {
      for (let key of objKeys) {
        if (ele[key].includes(word)) {
          return ele;
        }
      }
    })
  }

  

  const orderContents = (sortObjKey, sortBy) => {
    if (sortBy === 0) return initData();
    let orderedData = JSON.parse(JSON.stringify(data));
    orderedData[appStore.selectedCategory].details[appStore.selectedDetail].posts.sort((a, b) => {
      // 날짜순 정렬
      if (sortObjKey === 'createdAt') {
        // sortBy(-1, 0, 1)를 곱하여 정렬순서변경
        return (Date.parse(a.createdAt) - Date.parse(b.createdAt)) * sortBy
      }
      // 성경순 정렬
      if (sortObjKey === 'verse') {
        
      }


    })
    setData(orderedData)
  }

  return useObserver(() => (
      <>
        <div id='filterDiv'>
          {
            sortOptions.map((item, i) => (
              <OrderButton
                key={i}
                value={{ item, sortStatus }}
                method={{ orderContents, setSortStatus, initOrderStatus }}
              />
            ))
          }
          <SearchDiv 
            value={{ keywords, searchInput, searchError }} 
            method={{ setSearchInput, searchKeywords, deleteFilter }}
          />
        </div>
    </>
  ))
}



