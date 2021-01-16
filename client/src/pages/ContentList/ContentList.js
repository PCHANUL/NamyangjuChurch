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
      // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      appStore.getContentList((result) => setData(result));
    }, [appStore.page, appStore.selectedCategory, appStore.selectedDetail, appStore.verse, appStore.createdAt, appStore.search, appStore.rowsPerPage])
  })
  
  return useObserver(() => (
    <div id='videoList'>
      <FilterContent
        value={{ data: appStore.data }}
        method={{ setData }}
      />

      {
        appStore.selectedCategory === 0 ? (
          dataList.map((data, i) => {
            return (
              <div className='videoDiv' key={i} >
                <div className='videoTitle'>
                  <Link to={`/content/${data.id}`}>{data.title}</Link>
                  <p>{(data.createdAt).replaceAll('-', '. ')}</p>
                </div>
                <BibleVerseViewer verse={data.verse} />
              </div>
            );
          })
        ) : (
          <div id='dataListDiv'>
            {dataList.map((data, i) => {
              return (
                <div className='pictureDiv' key={i}>
                  <div className='imgDiv'>
                    <img className='pictureImg' src={data.thumbnail} />
                  </div>
                  <div className='pictureTitle'>
                    <Link to={`/content/${data.id}`}>{data.title}</Link>
                    <p>{(data.createdAt).replaceAll('-', '. ')}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )
      }

      <div id='pageOptionDiv'>
        <PageSelect />
        
        <div id='dataNumberDiv'>
          <select id='dataNumber' defaultValue='10'
            onChange={(e) => appStore.rowsPerPage = e.target.value}
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
            <option value='20'>20</option>
          </select>
          <label id='selectUnit' for="dataNumber">줄씩 보입니다</label>
          <div id='dataArrowIcon'></div>
        </div>
      </div>
    </div>
  ))
}

function PageSelect() {
  const appStore = useAppStore();
  let pageNumberAmount = window.innerWidth < 400 ? 3 : 5;
  let centerPoint = Math.round(pageNumberAmount / 2);

  
  let curPages = appStore.pageNumbers.filter((ele) => {
    if (appStore.pageNumbers.length - centerPoint < appStore.page) {
      return (appStore.pageNumbers.length - pageNumberAmount < ele) ? true : false
    }

    if (appStore.page > centerPoint) {
      return (appStore.page - centerPoint < ele && appStore.page + centerPoint > ele) ? true : false;
    } 
    else if (appStore.page <= centerPoint) {
      return (pageNumberAmount >= ele) ? true : false;
    }
  })

  return useObserver(() => (
    <div id='pageSelectDiv'>
      {
        appStore.page !== 1 && (
          <Button className='pageArrowButton' onClick={() => appStore.page-- }>
            <div className='arrow left' />
          </Button>
        )
      }
      {
        curPages.map((num, i) => {
          return (
            <Button className={`pageButton ${appStore.page === num ? 'selectedPage' : ''}`} key={i} 
              onClick={() => appStore.page = num}
            >{num}</Button>
          )
        })
      }
      {
        appStore.page !== appStore.pageNumbers[appStore.pageNumbers.length - 1] && appStore.pageNumbers.length > 5 ? (
          <Button className='pageArrowButton' onClick={() => appStore.page++ }>
            <div className='arrow right' />
          </Button>
        ) : (
          <></>
        )
      }
    </div>
  ))
}






