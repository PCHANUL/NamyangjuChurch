import React, { useState, useEffect, useContext } from 'react';

import addIcon from '../images/add-file.png';
import updateIcon from '../images/edit.png';
import deleteIcon from '../images/delete.png';
import './admin.css';

import { getDataList, deleteData } from './axiosRequest';

import { observer } from 'mobx-react';
import { storeContext } from '../state/appStore';



const Admin = observer((props) => {
  const contentIdStore = useContext(storeContext);
  const [tab, setTab] = useState([0, 0]);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState()
  
  useEffect(() => {
    window.scroll(0,0);
    getDataList(async (getData) => {
      await setData(getData);
      setTimeout(setLoading(true), 2000);
    })

  }, [tab])


  return (
    <div id='admin'>
      <div id='addBox'>
        <h2 style={{fontSize: '2vw'}}>관리자 페이지</h2> 
      </div>

      <Tab tab={tab} setTab={setTab} />

      <button id='addBtn' onClick={() => {
        contentIdStore.setEditState(false);
        props.history.push('/admin/edit');
      }}>
        <img id='addFileIcon' src={addIcon} />
      </button> 
      <DataBox data={data} loading={loading} tab={tab} setData={setData} history={props.history}/>
    </div>
  )
})

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

function DataBox({ loading, data, tab, setData, history }) {
  const contentIdStore = useContext(storeContext);

  return (
    <>
      {
        loading ? (
          data[tab[0]].details[tab[1]].posts.map((data, index) => {
            let createdDate = transDate(data.createdAt)
            return (
              <div key={`data_${index}`} className='dataBox'>
                <div className='textBox'>
                  <h3 className='title'>{ data.title }</h3>
                  <p className='date'>{ createdDate }</p>
                </div>
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
              </div>
            )
          })
        ) : (
          <div className='dataBox'>
            <h3 className='dataTitle' >Loading...</h3>
          </div>
        )
      }
    </>
  )
}

function Tab({ tab, setTab }) {
  return (
    <div id='tabContainer'>
      <div id='adminTabBox'>
        {
          ['말씀', '소식'].map((ele, idx) => {
            return idx === tab[0]
          ? <div key={`tab_${idx}`} className='adminTab selected' onClick={() => setTab([idx, tab[1]])}>{ele}</div>
          : <div key={`tab_${idx}`} className='adminTab' onClick={() => {
              if (idx === 1) setTab([idx, 0])
              else setTab([idx, tab[1]])
            }}>{ele}</div>
          })
        }
      </div>
      { tab[0] === 0 ? (
        <div id='subTabBox'>
          {
            ['주일', '수요', '금요', '새벽', '기도수첩'].map((ele, idx) => {
              return idx === tab[1] 
              ? <div key={`subTab_${idx}`} className='subTab selected' onClick={() => setTab([tab[0], idx])}>{ele}</div>
              : <div key={`subTab_${idx}`} className='subTab' onClick={() => setTab([tab[0], idx])}>{ele}</div>
            })
          }
        </div>
        ) : (
          ['교회 사진'].map((ele, idx) => {
            return idx === tab[1] 
            ? <div key={`subTab_${idx}`} className='subTab selected' onClick={() => setTab([tab[0], idx])}>{ele}</div>
            : <div key={`subTab_${idx}`} className='subTab' onClick={() => setTab([tab[0], idx])}>{ele}</div>
          })
        )
      }
      <div className='extraDiv left'/>
      <div className='extraDiv right'/>
    </div>
  )
}

export default Admin;