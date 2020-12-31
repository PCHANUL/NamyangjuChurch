import React, { useState, useEffect } from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './FilterContent.css';
import '../responsibleCSS/mobileSearchContent.css';

// components
import SearchDiv from './SearchDiv';
import { OrderButton } from './OrderButton';



export default function FilterContent(props) {
  const appStore = useAppStore();
  const { data, loading } = props.value;
  const { setData, initData } = props.method;

  const initSearch = localStorage.getItem('search');
  
  const [searchError, setsearchError] = useState(false);
  const [isFiltered, setFiltered] = useState(initSearch ? true : false);
  const [searchInput, setSearchInput] = useState('');
  const [keywords, setKeywords] = useState({
    search: initSearch
  });

  useEffect(() => {
    // 저장된 필터옵션 적용
    if (loading && isFiltered) searchKeywords();
  }, [loading, appStore.selectedDetail])


  const initKeywords = () => {
    setFiltered([]);
    setKeywords([]);
  }

  const deleteFilter = (filterName) => {
    if (filterName === 'search') localStorage.removeItem('search');

    delete keywords[filterName];
    setKeywords(keywords);
    initData();
  }

  const searchKeywords = async() => {
    const searchValue = searchInput !== '' ? searchInput : keywords.search;
    setsearchError(false);

    if (searchInput !== '') {
      localStorage.setItem('search', searchInput);
      await setKeywords({
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
      setFiltered(true);
      setSearchInput('');
    }

  }

  function filterContents(data, word, ...objKeys) {
    let filtered = data.filter((ele) => {
      for (let key of objKeys) {
        if (ele[key].includes(word)) {
          return ele;
        }
      }
    })
    return filtered;
  }

  return useObserver(() => (
      <>
        <div id='filterDiv'>
          <OrderButton 
            value={{ name: '성경순' }}
          />
          <OrderButton 
            value={{ name: '날짜순' }}
          />
          <SearchDiv 
            value={{ keywords, searchInput, searchError }} 
            method={{ setSearchInput, searchKeywords, deleteFilter }}
          />
        </div>
    </>
  ))
}



