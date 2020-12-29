import React from 'react';

import { Button } from './Button';
import './OrderOfTimeButton.css';

export function OrderButton(props) {
  const { name } = props;
  return (
    <Button 
      className='orderbtn' 
      onClick={() => console.log('asdf')}
    >
      <span className='label'>{name}</span>
      <div className='arrow down'/>
    </Button>
  )
}