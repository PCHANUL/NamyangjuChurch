import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';

import { Button } from './Button';
import './OrderButton.css';
import '../responsibleCSS/mobileOrderButton.css';

export function OrderButton(props) {
  const { name, key } = props.value.item;
  const { appStore } = props.value;
  const status = {
    '-1': 'Down',
    '0': 'Default',
    '1': 'Up'
  }

  const clickFunc = () => {
    appStore.initSort(key);
    appStore.setSort(key);
  }

  return useObserver(() => (
    <Button className={`orderbtn btn${status[appStore[key]]}`} onClick={clickFunc}>
      <p>
        {name}
        <div className={`arrow ${status[appStore[key]]}`}/>
      </p>
    </Button>
  ))
}