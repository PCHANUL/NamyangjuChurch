import React, { useState, useEffect } from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './FilterContent.css';
import '../responsibleCSS/mobileSearchContent.css';

// components
import { Button } from './Button';
import SearchDiv from './SearchDiv';
import { OrderButton } from './OrderButton';

// object 
import { bibleVerse } from './bibleVerse';



export default function FilterContent(props) {
  const appStore = useAppStore();
  const { data, loading } = props.value;
  const { setData, initData } = props.method;

  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState(false);

  // sortButton 초기설정
  const sortOptions = [{name: '성경순', key: 'verse'}, {name: '날짜순', key: 'createdAt'}];
  const [sortStatus, setSortStatus] = useState({verse: 0, createdAt: 0});

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

  // localStorage에서 불러온 옵션적용
  useEffect(() => {
    setLocalStorageData();
  }, [loading, appStore.selectedDetail])
  
  const setLocalStorageData = async() => {
    let filtered
    if (loading) {
      if (keywords.search) filtered = await searchKeywords();
      for (let key in keywords.sort) {
        if (keywords.sort[key] !== "0") {
          await orderContents(key, keywords.sort[key], filtered);
        }
      }
    }
  }

  // order 초기화
  const initOrderStatus = (targetKey) => {
    for (let option in sortStatus) {
      if (option !== targetKey) {
        sortStatus[option] = 0;
        localStorage.setItem(option, 0)
      }
    }
    setSortStatus(sortStatus);
  }
  
  // filter 초기화
  const deleteFilter = (filterName) => {
    if (filterName === 'search') localStorage.removeItem('search');

    delete keywords[filterName];
    setKeywords(keywords);
    initData();
  }

  // filter 생성
  const searchKeywords = () => {
    const searchValue = searchInput !== '' ? searchInput : keywords.search;
    setSearchError(false);

    if (searchInput !== '') {
      localStorage.setItem('search', searchInput);
      setKeywords({
        ...keywords,
        search: searchInput
      })
    } 

    if (searchValue) {
      // 현재 페이지 컨텐츠를 필터링
      let filteredData = JSON.parse(JSON.stringify(data));
      let filterTarget = filteredData[appStore.selectedCategory].details[appStore.selectedDetail].posts;
      let result = filterContents(filterTarget, searchValue, 'title');

      // 검색 결과가 아무것도 없는 경우
      if (result.length === 0) setSearchError(true)

      filteredData[appStore.selectedCategory].details[appStore.selectedDetail].posts = result;
      setData(filteredData);
      setSearchInput('');
      return filteredData;
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

  const getFirstVerse = (str) => {
    for (let i in str) {
      if (Number(str[i])) {
        return [str.slice(0, i), i];
      }
    }
  }

  const orderContents = (sortObjKey, sortBy, targetData = data) => {
    let orderedData = JSON.parse(JSON.stringify(targetData));
    orderedData[appStore.selectedCategory].details[appStore.selectedDetail].posts.sort((a, b) => {
      // 날짜순 정렬
      if (sortObjKey === 'createdAt') {
        // sortBy(-1, 0, 1)를 곱하여 정렬순서변경
        return (Date.parse(a.createdAt) - Date.parse(b.createdAt)) * sortBy
      }
      // 성경순 정렬
      else if (sortObjKey === 'verse') {
        if (!a.verse || !b.verse) return 1;
        let verseA = getFirstVerse(a.verse);
        let verseB = getFirstVerse(b.verse);
        if (verseA[0] !== verseB[0]) {
          return (bibleVerse[verseA[0]] - bibleVerse[verseB[0]]) * sortBy;
        } else {
          return (a.verse.slice(Number(verseA[1]), a.verse.indexOf(':')) - b.verse.slice(Number(verseB[1]), b.verse.indexOf(':'))) * sortBy;
        }
      }
    })
    setData(orderedData)
  }

  console.log('JSON.stringify(keywords.sort): ', JSON.stringify(sortStatus));
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
          {
            JSON.stringify(sortStatus) !== '{"verse":0,"createdAt":0}' ?
            keywords.search ? (
            <Button className='initFilter' onClick={() => {
              console.log(keywords)
              deleteFilter('search');
              for (let i in keywords.sort) initOrderStatus(i)
            }}>모두 취소</Button>
            ) : (
            <Button className='initFilter' onClick={() => {
              console.log(keywords)
              deleteFilter('search');
              for (let i in keywords.sort) initOrderStatus(i)
            }}>취소</Button>
            ) : <></>
          }
        </div>
    </>
  ))
}



