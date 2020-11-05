import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getContent } from './axiosRequest';

import './video.css';
import { transData, transDate } from './Methods';

const opts = {
  height: '50%',
  width: '50%',
};

const category = ['', '주일예배', '수요예배', '금요예배', '새벽예배', '기도수첩'];

function Video() {
  const { id } = useParams();
  console.log('id: ', id);
  const [data, setData] = useState({
    title: '',
    selectedCategory: '',
    createdAt: '',
  })

  useEffect (() => {
    getContent(id, (result) => {
      console.log('result: ', result);
      setData({
        title: result.title,
        selectedCategory: category[result.detailId],
        createdAt: transDate(result.createdAt),
      })
      document.querySelector('#contentBody').insertAdjacentHTML('beforeend', result.content.content)
    }) 
  }, [])
  

  return (
    <div id='video'>
      <h1>{data.title}</h1>
      <p>{data.selectedCategory} / {data.createdAt}</p>
      <div id='contentBody'></div>
    </div>
  )
}

export default Video;