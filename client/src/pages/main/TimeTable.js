import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAppStore } from '../../state/appContext';

import './timeTable.css';
import '../responsibleCSS/mobileTimeTable.css';

function TimeTable(props) {
  console.log('props: ', props.history);
  const appStore = useAppStore();
  const history = useHistory();

  const cardInfo = {
    titles: ['주일 학교', '수요예배', '주일 대예배', '금요예배', '주일 오후예배', '새벽예배'],
    time: ['오전 09시 30분', '오후 07시 30분', '오전 11시 00분', '오후 08시 00분', '오후 02시 00분', '오전 05시 20분']
  }

  return (
    <div id='timeCardContainer'>
      <h1>예배시간</h1>
      <div className='timeCardDiv'>
        {
          cardInfo.titles.map((title, i) => {
            return (
              <div key={i} className='timeCard' onClick={() => clickTimeTable(title, appStore, history)}>
                <h2>{title}</h2>
                <span>{cardInfo.time[i]}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const clickTimeTable = (title, appStore, history) => {
  title = title.slice(0, 2);
  
  if (title === '주일') appStore.setVideoList(0, 0);
  if (title === '수요') appStore.setVideoList(0, 1);
  if (title === '금요') appStore.setVideoList(0, 2);
  if (title === '새벽') appStore.setVideoList(0, 3);

  history.push('/contentlist');
}

export default TimeTable;