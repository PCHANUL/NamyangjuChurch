import React, {useState} from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './searchContent.css';
import '../responsibleCSS/mobileSearchContent.css';

export default function SearchContent(props) {
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

  const searchKeywords = (paraKeywords = []) => {
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

  return useObserver(() => (
    <>
      <div id='searchKeyword'>
        <div id='searchDiv'>
          <input id='inputKeyword' placeholder='검색 키워드 추가' 
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.keyCode === 13 && searchKeywords()}  
          ></input>
          <Button className='keywordBtn leftBtn' onClick={searchKeywords}>검색</Button>
          <Button className='keywordBtn rightBtn' onClick={initKeywords}>초기화</Button>
        </div>

        <div id='keywordDiv'>
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
        </div>
      </div>
    </>
  ))
}

function Button(props) {
  const { children, className, onClick } = props;

  const onMouseDown = (e) => {
    let target = findRoot(e.target);
    
    let mouseX = e.nativeEvent.layerX
    let mouseY = e.nativeEvent.layerY

    onClick();
    clickAction(target, mouseX, mouseY);
  }

  const findRoot = (target) => {
    if (target.className === 'label') return target.parentNode.childNodes[1];
    if (target.className === 'clickMotion clickMotion_visible') return target.parentNode.parentNode.childNodes[1];
    else return target.childNodes[1];
  }

  const clickAction = (target, x, y) => {
    let div = document.createElement('div');
    div.className = 'clickMotion';
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    target.appendChild(div);

    setTimeout(() => {
      div.className = div.className + ' clickMotion_visible';
      setTimeout(() => {
        div.className = 'clickMotion';
          div.parentNode.removeChild(div)
      }, 500)
    }, 0);
  }

  return (
    <div className={className} onClick={onMouseDown}>
        <span className='label'>{children}</span>
        <span className='root'></span>
    </div>
  )
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
