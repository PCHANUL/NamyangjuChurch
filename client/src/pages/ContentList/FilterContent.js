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
  
  const [isFiltered, setFiltered] = useState(
    initSearch ? true : false
  );
  const [searchInput, setSearchInput] = useState('');
  const [keywords, setKeywords] = useState({
    search: initSearch
  });

  useEffect(() => {
    console.log('loading: ', loading);
    // 저장된 필터옵션 적용
    if (loading && isFiltered) searchKeywords();
  }, [loading])


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

  const searchKeywords = () => {
    if (searchInput !== '') {
      localStorage.setItem('search', searchInput);
      setKeywords({
        ...keywords,
        search: searchInput
      })
      setSearchInput('');
    } 
    // else if (searchInput === '') {
      
      // }
      
    console.log(keywords);

    if (keywords.search) {
      console.log('searched')
      // 현재 페이지 컨텐츠를 필터링
      let filterTarget = data[appStore.selectedCategory].details[appStore.selectedDetail].posts;
      let filteredData = JSON.parse(JSON.stringify(data));
      filteredData[appStore.selectedCategory].details[appStore.selectedDetail].posts = filterContents(filterTarget, keywords.search, 'title');
      setData(filteredData);
      setFiltered(true);
    }
  }

  function filterContents(data, word, ...objKeys) {
    let filtered = data.filter((ele) => {
      for (let key of objKeys) {
        if (ele[key].includes(word)) {
          console.log('ele: ', ele, word);
          return ele;
        }
      }
    })
    return filtered;
  }

  return useObserver(() => (
      <>
        <div id='filterDiv'>
          <OrderButton name={'성경순'} status={'default'} />
          <OrderButton name={'날짜순'} status={'default'} />
          <SearchDiv value={{ keywords }} method={{ setSearchInput, searchKeywords, deleteFilter }}/>
        </div>
    </>
  ))
}



