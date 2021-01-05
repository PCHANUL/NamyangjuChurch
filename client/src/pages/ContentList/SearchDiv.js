import React, { useState } from 'react';
import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

// components
import { Button } from './Button';

export default function SearchDiv(props) {
  const appStore = useAppStore();
  const { searchInput } = props.value;
  const { setSearchInput } = props.method;

  const searchKeywords = () => {
    appStore.search = searchInput !== '' ? searchInput : appStore.search;
    if (searchInput !== '') localStorage.setItem('search', searchInput);
    setSearchInput('');
  }

  return useObserver(() => (
    <>
      <div id='searchDiv'>
        <Button className='keywordBtn' onClick={searchKeywords}>
          <span>검색</span>
          <img id='searchIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/loupe.png'/>
        </Button>
        <input id='inputKeyword' placeholder='검색어를 입력하세요' 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.keyCode === 13 && searchKeywords()}  
        ></input>
      </div>
      <div id='keywordDiv'>
        {
          appStore.search &&
            <>
              <button className={`deleteKeyword ${appStore.searchError && 'errorButton'}`} onClick={appStore.deleteSearch}>
                취소
              </button>
              <div className={`keyword ${appStore.searchError && 'errorInput'}`}>
                <p>{`"${appStore.search}" 검색결과${appStore.searchError ? '가 없습니다' : '입니다'}`}</p>
              </div>
            </>
        }
      </div>
    </>
  ))
}

