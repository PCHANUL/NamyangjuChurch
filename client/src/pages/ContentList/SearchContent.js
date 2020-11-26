import React, {useState} from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

export default function SearchContent(props) {
  const appStore = useAppStore();
  const [searchInput, setSearchInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  console.log(props, appStore)

  return useObserver(() => (
    <>
      <input placeholder='검색 키워드 추가' 
        onChange={(e) => setSearchInput(e.target.value)}
      ></input>
      <button onClick={() => setKeywords([...keywords, searchInput])}>검색</button>
      <button>초기화</button>
      <div id='keywords'>
        {
          keywords.length !== 0 &&
            keywords.map((keyword, idx) => {
              console.log('keyword: ', keyword);
              return (
                <h1 key={idx}>
                  {keyword}
                </h1>
              )
            })
        }
      </div>
    </>
  ))
}

// const searchContent = (value) => {
//   console.log(value)
//   let keyword = document.createElement('div');


// }