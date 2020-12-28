import React from 'react';

import { Button } from './Button';
import './OrderOfTimeButton.css';

export function OrderOfTimeButton() {
  return (
    <Button 
      className='orderbtn' 
      onClick={() => console.log('asdf')}
    >
      <span className='label'>시간순</span>
      <div className='arrow down'/>
    </Button>
  )
}