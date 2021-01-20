import React, { useContext, useState } from 'react';
import { Link, withRouter } from 'react-router';

import { getDataList, deleteData } from "../axiosRequest";
import { transDate } from '../Methods';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react-lite';

function AdminData(props) {
  const appStore = useAppStore();
  const [ishover, setHover] = useState(false);
  const { 
    // value
    content, history,
    // method
    setContent,
  } = props;
  
  return useObserver (() => (
    <div className='dataBox' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className='textBox'>
        <div className='title'>
          <h3>{ content.title }</h3>
        </div>
        <div className='verse'>
          <h5>{ content.verse }</h5>
        </div>
        <p className='date'>{ content.createdAt.replace(/-/g, '. ') }</p>
      </div>
      {
        ishover &&
        <div className='buttonBox'>
          <button id='deleteBtn' className='dataButton' onClick={() => deleteDataBox(content.id, setContent, appStore.selectedCategory, appStore.selectedDetail)}>
            <img className='buttonIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/delete.png'></img>
          </button>
          <button id='updateBtn' className='dataButton' onClick={() => history.push(`/admin/edit/${content.id}`)}>
            <img className='buttonIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/edit.png'></img>
          </button>
        </div>
      }
    </div>
  ))
}

function deleteDataBox(id, setContent, category, datail) {
  if (window.confirm('삭제하시겠습니까?')) {
    deleteData(id, (result) => {
      if (result) {
        getDataList(category, datail, async(resultData) => {
          await setContent(resultData);
        })
      }
    })
  }
}

export default withRouter(AdminData);