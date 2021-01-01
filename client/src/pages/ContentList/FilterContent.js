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
      // sortBy(-1, 0, 1)를 곱하여 순서변경
      return (Date.parse(a[sortObjKey]) * sortBy) - (Date.parse(b[sortObjKey]) * sortBy)
    })
    setData(orderedData)
  }

  return useObserver(() => (
      <>
        <div id='filterDiv'>
          {
            [{name: '성경순', key: 'verse'}, {name: '날짜순', key: 'createdAt'}].map((item, i) => (
              <OrderButton
                key={i}
                value={item}
                method={{ orderContents }}
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



