import React, { useState } from 'react';

import { Button } from './Button';
import './OrderButton.css';

export function OrderButton(props) {
  const [clickNum, setClickNum] = useState(0);
  const { name } = props.value;

  const status = ['Default', 'Up', 'Down']


  const clickFunc = () => {
    // 버튼 상태 변경
    setClickNum(clickNum === 2 ? 0 : clickNum + 1);


  }


  return (
    <Button className={`orderbtn btn${status[clickNum]}`} onClick={clickFunc}>
      <span className='label'>{name}</span>
      <div className={`arrow ${status[clickNum]}`}/>
    </Button>
  )
}