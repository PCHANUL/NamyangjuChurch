import React from 'react'; 

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

// component
import { Button } from './Button';

export default function PageSelect() {
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