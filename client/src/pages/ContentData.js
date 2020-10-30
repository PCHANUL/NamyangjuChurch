import React, { useContext, useState } from 'react';
import updateIcon from '../images/edit.png';
import deleteIcon from '../images/delete.png';
import { withRouter } from 'react-router';

import { getDataList } from "./axiosRequest";
import { storeContext } from '../state/appStore';

function ContentData(props) {
  const contentIdStore = useContext(storeContext);
  const [ishover, setHover] = useState(false);
  const { data, history } = props;

  let createdDate = transDate(data.createdAt);

  return (
    <div className='dataBox' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className='textBox'>
        <h3 className='title'>{ data.title }
        &nbsp;
        <p className='date'>{ createdDate }</p>
        </h3>
      </div>
      {
        ishover &&
        <div className='buttonBox'>
          <button className='dataButton' onClick={() => deleteDataBox(data.id, setData)}>
            <img className='deleteIcon' src={deleteIcon}></img>
          </button>
          <button className='dataButton' onClick={() => {
            contentIdStore.setEditState(true, data.id);
            history.push('/admin/edit');
          }}>
            <img className='updateIcon' src={updateIcon}></img>
          </button>
        </div>
      }
    </div>
  )
}

function transDate(date) {
  let rawDate = new Date(JSON.parse(date));
  let year = rawDate.getFullYear();
  let month = rawDate.getMonth() + 1;
  let day = rawDate.getDate();
  
  return `${year}. ${month}. ${day}`
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