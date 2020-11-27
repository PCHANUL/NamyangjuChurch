import React, {useState} from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

export default function SearchContent(props) {
  const appStore = useAppStore();
  const [searchInput, setSearchInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const { data, setData } = props;
  

  return useObserver(() => (
    <>
      <input placeholder='검색 키워드 추가' onChange={(e) => setSearchInput(e.target.value)}></input>
      <button onClick={() => {
        let searchKeywords = [...keywords, searchInput];
        let filterTarget = data[appStore.selectedCategory].details[appStore.selectedDetail].posts;

        setKeywords(searchKeywords);
        let filteredContent = filterContents(filterTarget, searchKeywords, 'title');
        data[appStore.selectedCategory].details[appStore.selectedDetail].posts = filteredContent;
        
        setData({ ...data });

      }}>검색</button>
      <button>초기화</button>
      <div id='keywords'>
        {
          keywords.length !== 0 &&
            keywords.map((keyword, idx) => {
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
