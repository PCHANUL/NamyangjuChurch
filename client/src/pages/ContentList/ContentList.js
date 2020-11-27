import React, { useEffect, useState, useContext } from 'react';
import { uselocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// component
import SearchContent from './SearchContent';

// methods
import { getDataList } from '../axiosRequest';
import { transDate } from '../Methods';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './videoList.css';
import '../responsibleCSS/mobileVideoList.css';

const ContentList = () => {
  const appStore = useAppStore();
  const [loading, setLoading] = useState(false);
  const [filteredArr, setFiltered] = useState([]);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    getDataList((getData) => {
      setData(getData);
      setLoading(true);
    });
  }, [])

  return useObserver(() => (
    <div id='videoList'>
      <SearchContent 
        data={data}
        setData={setData}
        setFiltered={setFiltered}
      />
      {
        loading &&
        ( filteredArr.length === 0 
          ? data[appStore.selectedCategory].details[appStore.selectedDetail].posts
          : filteredArr[appStore.selectedCategory].details[appStore.selectedDetail].posts
        ).map((data, i) => {
          return (
            <div className='video' key={i} >
              <div className='videoTitle'>
                <Link to={`/contentlist/${data.id}`}>{data.title}</Link>
                <p>{transDate(data.createdAt)}</p>
              </div>
              <div className='videoContent'>
                <div>{data.gender}</div>
                {/* <Link className='videoButton' to={`/contentlist/${data.id}`}>영상보기</Link> */}
              </div>
            </div>
          );
        })
      }
    </div>
  ))
}



export default ContentList;
