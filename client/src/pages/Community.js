import React from 'react';

import './community.css'
import thumbnail from '../images/main3.jpg'

function Community() {
  return (
    <div id='community'>
      <div className='comContent'>
        <img className='image' src={thumbnail} alt="..."></img>
        <h1>title / date</h1>
      </div>
      <div className='comContent'>
        <img className='image' src={thumbnail} alt="..."></img>
        <h1>title / date</h1>
      </div>
      <div className='comContent'>
        <img className='image' src={thumbnail} alt="..."></img>
        <h1>title / date</h1>
      </div>
      <div className='comContent'>
        <img className='image' src={thumbnail} alt="..."></img>
        <h1>title / date</h1>
      </div>
      <div className='comContent'>
        <img className='image' src={thumbnail} alt="..."></img>
        <h1>title / date</h1>
      </div>
    </div>
  )
}

export default Community;