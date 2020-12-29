import React, { useEffect, useState, useContext } from 'react';
import { uselocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// component
import FilterContent from './FilterContent';

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
  const [filteredArr, setFiltered] = useState([]);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    window.scroll(0, 0);
    getDataList((getData) => {
      setData(getData);
      setLoading(true);
    });
  }, [])

  return useObserver(() => (
    <div id='videoList'>

      <FilterContent
        data={data}
        setData={setData}
        setFiltered={setFiltered}
      />

      {
        // set content list
        loading &&
        ( filteredArr.length === 0 
          ? data[appStore.selectedCategory].details[appStore.selectedDetail].posts
          : filteredArr[appStore.selectedCategory].details[appStore.selectedDetail].posts
        ).map((data, i) => {
          console.log('data: ', data);
          return (
            <div className='video' key={i} >
              <div className='videoTitle'>
                <Link to={`/content/${data.id}`}>{data.title}</Link>
                <p>{(data.createdAt).replaceAll('-', '. ')}</p>
              </div>
              <div className='videoContent'>
                <div>{data.verse}</div>
              </div>
            </div>
          );
        })
      }
    </div>
  ))
}






