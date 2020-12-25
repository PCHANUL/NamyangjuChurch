import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';

import { getDataList } from "../axiosRequest";
import { transDate } from '../Methods';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react-lite';

function ContentData(props) {
  const contentIdStore = useAppStore();
  const [ishover, setHover] = useState(false);
  const { data, history } = props;

  return useObserver (() => (
    <div className='dataBox' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className='textBox'>
        <h3 className='title'>{ data.title }
        &nbsp;
        <p className='date'>{ (data.createdAt).replaceAll('-', '. ') }</p>
        </h3>
      </div>
      {
        ishover &&
        <div className='buttonBox'>
          <button className='dataButton' onClick={() => deleteDataBox(data.id, setData)}>
            <img className='deleteIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/delete.png'></img>
          </button>
          <button className='dataButton' onClick={() => {
            contentIdStore.setEditState(true, data.id);
            history.push('/admin/edit');
          }}>
            <img className='updateIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/edit.png'></img>
          </button>
        </div>
      }
    </div>
  ))
}

function deleteDataBox(id, setData) {
  if (window.confirm('삭제하시겠습니까?')) {
    deleteData(id, (result) => {
      if (result) {
        getDataList(async (getData) => {
          await setData(getData);
        })
      }
    })
  }
}

export default withRouter(ContentData);