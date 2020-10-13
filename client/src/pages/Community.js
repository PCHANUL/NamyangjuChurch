import React from 'react';

import './community.css'
import thumbnail from '../images/main3.jpg'

function Community() {
  return (
    <div id='community'>
      <div class='comContent'>
        <img class='image' src={thumbnail} alt="..."></img>
        <h1>title / date</h1>
      </div>
      <div class='comContent'>
        <img class='image' src={thumbnail} alt="..."></img>
        <h1>title / date</h1>
      </div>
      <div class='comContent'>
        <img class='image' src={thumbnail} alt="..."></img>
        <h1>title / date</h1>
      </div>
      <div class='comContent'>
        <img class='image' src={thumbnail} alt="..."></img>
        <h1>title / date</h1>
      </div>
      <div class='comContent'>
        <img class='image' src={thumbnail} alt="..."></img>
        <h1>title / date</h1>
      </div>
    </div>
  )
}

export default Community;