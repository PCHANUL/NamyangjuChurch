import React, { useEffect, useState, useContext } from 'react';
import { uselocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// component
import FilterContent from './FilterContent';
import BibleViewer from './bibleViewer';

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
  
  useEffect(() => {
    window.scroll(0, 0);
    getDataList((getData) => {
      setData(getData);
      setLoading(true);
    });
  }, [])

  const initData = () => {
    getDataList((getData) => {
      setData(getData);
      setLoading(true);
    });
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
          data[appStore.selectedCategory].details[appStore.selectedDetail].posts
          .map((data, i) => {
              return (
                <div className='video' key={i} >
                  <div className='videoTitle'>
                    <Link to={`/content/${data.id}`}>{data.title}</Link>
                    <p>{(data.createdAt).replaceAll('-', '. ')}</p>
                  </div>
                  <BibleViewer data={data} />
                </div>
              );
            }
          )
      }
    </div>
  ))
}






