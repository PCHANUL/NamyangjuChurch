import React, { useState } from 'react';

import { Button } from './Button';
import './OrderButton.css';

export function OrderButton(props) {
  const [clickNum, setClickNum] = useState(0);
  const { name, key } = props.value;
  const { orderContents } = props.method;

  const status = {
    '-1': 'Down',
    '0': 'Default',
    '1': 'Up'
  }


  const clickFunc = () => {
    // 버튼 상태 변경
    let buttonStatus = clickNum === 1 ? -1 : clickNum + 1
    setClickNum(buttonStatus);
    localStorage.setItem(name, buttonStatus);

    // 상태값과 함께 메서드 실행
    orderContents(key, buttonStatus);
  }


  return (
    <Button className={`orderbtn btn${status[clickNum]}`} onClick={clickFunc}>
      <span className='label'>{name}</span>
      <div className={`arrow ${status[clickNum]}`}/>
    </Button>
  )
}