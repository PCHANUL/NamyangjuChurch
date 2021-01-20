import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getContent } from '../axiosRequest';

import './contentViewer.css';
import '../responsibleCSS/mobileViewer.css';
import { transDate } from '../Methods';

const category = ['', '주일예배', '수요예배', '금요예배', '새벽예배', '기도수첩', '교회사진'];

export default function ContentViewer() {
  const { id } = useParams();
  const [data, setData] = useState({
    title: '',
    selectedCategory: '',
    createdAt: '',
  })

  useEffect (() => {
    window.scroll(0, 0);
    getContent(id, (result) => {
      setData({
        title: result.title,
        selectedCategory: category[result.detailId],
        createdAt: (result.createdAt).replace(/-/g, '. '),
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
