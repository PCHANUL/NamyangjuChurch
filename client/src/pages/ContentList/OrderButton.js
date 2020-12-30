import React from 'react';

import { Button } from './Button';
import './OrderButton.css';

export function OrderButton(props) {
  const { 
    name, status,
    onClick } = props;
  return (
    <Button className='orderbtn' onClick={onClick}>
      <span className='label'>{name}</span>
      <div className={`arrow ${status}`}/>
    </Button>
  )
}