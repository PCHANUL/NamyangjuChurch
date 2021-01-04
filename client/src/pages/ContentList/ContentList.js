import React, { useEffect, useState, useContext } from 'react';
import { uselocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// component
import FilterContent from './FilterContent';
import BibleVerseViewer from './BibleVerseViewer';
import { Button } from './Button';

// methods
import { getDataList } from '../axiosRequest';
import { transDate } from '../Methods';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './contentList.css';
import '../responsibleCSS/mobileContentList.css';

export default function ContentList() {
  const appStore = useAppStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [contents, setContents] = useState([]);
  const curContents = loading && data[appStore.selectedCategory].details[appStore.selectedDetail].posts;

  useEffect(() => {
    window.scroll(0, 0);
    getDataList((getData) => {
      setData(getData);
      setLoading(true);
    });
  }, [])

  // set contents
  useEffect(() => {
    if (loading) {
      let filtered = curContents.filter((item, i) => page * 15 > i && (page - 1) * 15 < i)
      setContents(filtered)
    }
  }, [loading, appStore.selectedDetail, page])

  const initData = () => {
    getDataList((getData) => {
      setData(getData);
      setLoading(true);
    });
  }

  const setPageNumber = () => {
    let pageArr = [];
    for(let i=1; i<(curContents.length/15)+1; i++) pageArr.push(i);
    return pageArr
  }

  return useObserver(() => (
    <div id='videoList'>
      <FilterContent
        value={{ data, loading }}
        method={{ setData, initData }}
      />
      {
        // set content list
        loading &&
          contents.map((data, i) => {
              return (
                <div className='video' key={i} >
                  <div className='videoTitle'>
                    <Link to={`/content/${data.id}`}>{data.title}</Link>
                    <p>{(data.createdAt).replaceAll('-', '. ')}</p>
                  </div>
                  <BibleVerseViewer value={{ data, appStore }} />
                </div>
              );
            }
          )
      }
      <div id='pageSelectDiv'>
        {
          setPageNumber().map((num, i) => {
            return (
              <Button className={`pageButton ${page === num && 'selectedPage'}`} key={i} onClick={() => setPage(num)}>{num}</Button>
            )
          })
        }
      </div>
    </div>
  ))
}






