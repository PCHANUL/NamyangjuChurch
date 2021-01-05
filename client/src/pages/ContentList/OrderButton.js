import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';

import { Button } from './Button';
import './OrderButton.css';

export function OrderButton(props) {
  const { name, key } = props.value.item;
  const { appStore } = props.value;
  const { initOrderStatus } = props.method;
  const status = {
    '-1': 'Down',
    '0': 'Default',
    '1': 'Up'
  }

  const clickFunc = () => {
    if (appStore[key] === 0) initOrderStatus(key);
    appStore[key] = appStore[key] === 1 ? -1 : appStore[key] + 1;
    localStorage.setItem(key, appStore[key]);
  }

  return useObserver(() => (
    <Button className={`orderbtn btn${status[appStore[key]]}`} onClick={clickFunc}>
      <span className='label'>{name}</span>
      <div className={`arrow ${status[appStore[key]]}`}/>
    </Button>
  ))
}