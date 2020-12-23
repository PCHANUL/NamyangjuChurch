import React from 'react';



function GetClosestTime() {
  let result = '1';
  let date = new Date()
  let now = {
    day: date.getDay(),
    hours: date.getHours(),
    mins: date.getMinutes(),
  }
  console.log(now);

  // 시간계산
  // 

  for (let i in worshipTimes) {
    console.log(worshipTimes[i][1], now.hours)
  }

  return (
    <h1>{'생방송 유튜브'}</h1>
  )
}

function TimeTable() {

  return (
    <div id='timetableDiv'>
      <h1>예배시간</h1>
      <table>
        <tr>
          <td>주일 학교</td>
          <td>오전 09시 30분</td>
        </tr>
        <tr>
          <td>주일 대예배</td>
          <td>오전 11시 00분</td>
        </tr>
        <tr>
          <td>주일 오후예배</td>
          <td>오후 02시 00분</td>
        </tr>
      </table>

      <table>
        <tr>
          <td>수요예배</td>
          <td>오후 07시 30분</td>
        </tr>
        <tr>
          <td>금요예배</td>
          <td>오후 08시 00분</td>
        </tr>
        <tr>
          <td>새벽예배</td>
          <td>오전 05시 20분</td>
        </tr>
      </table>
    </div>
  )
}

export default TimeTable;