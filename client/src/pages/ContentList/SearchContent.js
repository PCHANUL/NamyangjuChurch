import React, {useState} from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './searchContent.css';

export default function SearchContent(props) {
  const appStore = useAppStore();
  const [searchInput, setSearchInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const { data, setFiltered, setData } = props;

  console.log('keywords: ', keywords);

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

  const searchKeywords = (paraKeywords = []) => {
    let keywordsArr = paraKeywords;

    if (keywords.length === 0 && searchInput === '') {
      setFiltered([]);
      return
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

  return useObserver(() => (
    <>
      <input id='inputKeyword' placeholder='검색 키워드 추가' onChange={(e) => setSearchInput(e.target.value)}></input>
      <button onClick={searchKeywords}>검색</button>
      <button onClick={initKeywords}>초기화</button>
      <div id='keywords'>
        {
          keywords.length !== 0 &&
            keywords.map((keyword, idx) => {
              return (
                <div key={idx} className='keyword' onClick={() => deleteKeyword(keyword)}>
                  <p>{keyword}</p>
                </div>
              )
            })
        }
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
