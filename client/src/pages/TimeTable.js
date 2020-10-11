import React from 'react';

let worshipTimes = {
  주일학교: [0, 9, 30],
  주일대예배: [0, 11],
  주일오후예배: [0, 14],
  수요예배: [3, 19, 30],
  금요예배: [5, 20],
  새벽예배: [0, 5, 20],
}

function GetCloseTime() {
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

  // if (now.day !== 0) {

  // }

  return (
    <h1>{result}</h1>
  )
}

function TimeTable() {

  return (
    <>
      <h1>    3일 후 수요예배 시작</h1>
      <h1>    5시간 후 수요예배 시작</h1>
      <h1>    잠시후 수요예배 시작</h1>
      <h1>    수요예배 중 (유튜브 라이브)</h1>
      <GetCloseTime />
      <table style={{width: '80%', fontSize: '2vw'}}>
        <tr>
          <td>주일 학교</td>
          <td>오전 9시 30분</td>
          <td>수요예배</td>
          <td>오후 7시 30분</td>
        </tr>
        <tr>
          <td>주일 대예배</td>
          <td>오전 11시</td>
          <td>금요예배</td>
          <td>오후 8시</td>
        </tr>
        <tr>
          <td>주일 오후예배</td>
          <td>오후 2시</td>
          <td>새벽예배</td>
          <td>오전 5시 20분</td>
        </tr>
      </table>
  </>
  )
}

export default TimeTable;