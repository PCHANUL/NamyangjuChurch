import React, { useEffect, useState, useContext } from 'react';
import { uselocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// component
import FilterContent from './FilterContent';
import BibleVerseViewer from './BibleVerseViewer';
import { Button } from './Button';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './contentList.css';
import '../responsibleCSS/mobileContentList.css';

export default function ContentList() {
  const appStore = useAppStore();
  const [dataList, setData] = useState([]);

  
  useObserver(() => {
    useEffect(() => {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      appStore.getContentList((result) => setData(result));
    }, [appStore.page, appStore.selectedCategory, appStore.selectedDetail, appStore.verse, appStore.createdAt, appStore.search])
  })

  const setPageNumber = () => {
    let pageArr = [];
    for (let i = 1; i < (appStore.dataLength / 15) + 1; i++) pageArr.push(i);
    return pageArr
  }
  
  return useObserver(() => (
    <div id='videoList'>
      <FilterContent
        value={{ data: appStore.data }}
        method={{ setData }}
      />
      {
        // set content list
        dataList.map((data, i) => {
          return (
            <div className='video' key={i} >
              <div className='videoTitle'>
                <Link to={`/content/${data.id}`}>{data.title}</Link>
                <p>{(data.createdAt).replaceAll('-', '. ')}</p>
              </div>
              <BibleVerseViewer value={{ data }} />
            </div>
          );
        })
      }
      <div id='pageSelectDiv'>
        {
          setPageNumber().map((num, i) => {
            return (
              <Button className={`pageButton ${appStore.page === num && 'selectedPage'}`} key={i} 
                onClick={() => appStore.page = num}
              >{num}</Button>
            )
          })
        }
      </div>
    </div>
  ))
}






