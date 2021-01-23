import React from 'react';



// import React from 'react';

import './timeTable.css';
import '../responsibleCSS/mobileTimeTable.css';

function TimeTable() {
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
              <div className='timeCard'>
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

export default TimeTable;