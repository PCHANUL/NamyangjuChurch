import React from 'react';

import { Button } from './Button';
import './OrderOfTimeButton.css';

export function OrderButton(props) {
  const { name, onClick } = props;
  return (
    <Button className='orderbtn' onClick={onClick}>
      <span className='label'>{name}</span>
      <div className='arrow down'/>
    </Button>
  )
}