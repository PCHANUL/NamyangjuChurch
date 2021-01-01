import React, { useState, useEffect } from 'react';

import { Button } from './Button';
import './OrderButton.css';

export function OrderButton(props) {
  const { name, key } = props.value.item;
  const { sortStatus } = props.value;
  const { orderContents, setSortStatus, initOrderStatus } = props.method;
  const status = {
    '-1': 'Down',
    '0': 'Default',
    '1': 'Up'
  }

  useEffect(() => {
    let prevStatus = Number(localStorage.getItem(key));
    if (prevStatus !== null) {
      sortStatus[key] = prevStatus;
      setSortStatus(sortStatus);
    }
  },[])

  const clickFunc = () => {
    if (sortStatus[key] === 0) initOrderStatus(key);

    // 버튼 상태 변경
    sortStatus[key] = sortStatus[key] === 1 ? -1 : sortStatus[key] + 1
    setSortStatus(sortStatus);

    localStorage.setItem(key, sortStatus[key]);

    // 상태값과 함께 메서드 실행
    orderContents(key, sortStatus[key]);
  }

  return (
    <Button className={`orderbtn btn${status[sortStatus[key]]}`} onClick={clickFunc}>
      <span className='label'>{name}</span>
      <div className={`arrow ${status[sortStatus[key]]}`}/>
    </Button>
  )
}