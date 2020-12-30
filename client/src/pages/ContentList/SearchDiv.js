import React, { useState } from 'react';
import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

// components
import { Button } from './Button';

export default function SearchDiv(props) {
  const { keywords } = props.value;
  const { setSearchInput, searchKeywords, deleteFilter } = props.method;

  const initInput = () => {
    document.querySelector('#inputKeyword').value = '';
  }

  // function SearchButton() {
  //   return useObserver(() => (
  //     <>
  //       <input id='inputKeyword' placeholder='검색 키워드 입력' 
  //         onChange={(e) => setSearchInput(e.target.value)}
  //         onKeyDown={(e) => e.keyCode === 13 && searchKeywords()}  
  //       ></input>
  //       <Button className='keywordBtn' onClick={searchKeywords}>추가</Button>
  //       <Button className='keywordBtn' onClick={initKeywords}>초기화</Button>
  //     </>
  //   ))
  // }

  return useObserver(() => (
    <div id='searchDiv'>
      <Button className='keywordBtn' onClick={searchKeywords}>
        <span>검색</span>
        <img id='searchIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/loupe.png'/>
      </Button>
      <input id='inputKeyword' placeholder='검색어를 입력하세요' 
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && searchKeywords()}  
      ></input>

      <div id='keywordDiv'>
        {
          keywords.search &&
            <>
              <button className='deleteKeyword' onClick={() => deleteFilter('search')}>
                취소
              </button>
              <div className='keyword'>
                <p>{`"${keywords.search}" 검색결과입니다`}</p>
              </div>
            </>
        }
      </div>
    </div>
  ))
}

