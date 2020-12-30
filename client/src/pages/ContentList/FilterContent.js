import React, {useState} from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './FilterContent.css';
import '../responsibleCSS/mobileSearchContent.css';

import { OrderButton } from './OrderButton';
import { Button } from './Button';

export default function FilterContent(props) {
  const appStore = useAppStore();
  const [searchInput, setSearchInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const { data, setFiltered } = props;

  const initKeywords = () => {
    setFiltered([]);
    setKeywords([]);
  }

  const deleteKeyword = async(keyword) => {
    let deleted = keywords.filter((ele) => ele !== keyword && ele)
    if (deleted.length === 0) {
      initKeywords();
    } else {
      setKeywords([...deleted]);
      searchKeywords(deleted);
    } 
  }

  const searchKeywords = (e, paraKeywords = []) => {
    let keywordsArr = paraKeywords.length === 0 ? keywords : paraKeywords;
 
    if (keywords.length === 0 && searchInput === '') {
      return setFiltered([]);
    } else if (searchInput !== '') {
      initInput();
      keywordsArr = [...keywords, searchInput];
    }

    let filterTarget = data[appStore.selectedCategory].details[appStore.selectedDetail].posts;
    setKeywords(keywordsArr);
    let filteredContent = filterContents(filterTarget, keywordsArr, 'title');
    let filteredArr = JSON.parse(JSON.stringify(data))
    filteredArr[appStore.selectedCategory].details[appStore.selectedDetail].posts = filteredContent;
    setFiltered(filteredArr);
  }
  
  const initInput = () => {
    document.querySelector('#inputKeyword').value = '';
    setSearchInput('');
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
    <>
      <div id='searchKeyword'>

        <div id='searchDiv'>
          {/* <Button className='keywordBtn' onClick={initKeywords}>초기화</Button> */}
          <Button className='keywordBtn' onClick={searchKeywords}>
            <span>검색</span>
            <img id='searchIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/loupe.png'/>
          </Button>
          {/* <input id='inputKeyword' placeholder='검색어를 입력하세요' 
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.keyCode === 13 && searchKeywords()}  
          ></input> */}
          <OrderButton name={'성경순'} status={'default'} />
          <OrderButton name={'날짜순'} status={'default'} />
        </div>

        {/* <div id='keywordDiv'>
          {
            keywords.length !== 0 &&
              keywords.map((keyword, idx) => {
                return (
                  <div key={idx} className='keyword'>
                    <p>{keyword}</p>
                    <button className='deleteKeyword' onClick={() => deleteKeyword(keyword)}>
                      <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/close-button.png' className='closeIcon' />
                    </button>
                  </div>
                )
              })
          }
        </div> */}
      </div>
    </>
  ))
}


function filterContents(data, conditions, ...objKeys) {
  let filtered = data.filter((ele) => {
    for (let key of objKeys) {
      for (let word of conditions) {
        if (ele[key].includes(word)) {
          return ele;
        }
      }
    }
  })
  return filtered;
}
