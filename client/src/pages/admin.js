import React, { useState, useEffect } from 'react';

import addIcon from '../images/add-file.png';
import updateIcon from '../images/wrench.png';
import deleteIcon from '../images/delete.png';
import './admin.css';

import { getData } from './axiosRequest';


function Admin(props) {
  const [tab, setTab] = useState(0);
  const [subTab, setSubTab] = useState(0);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState()
  
  useEffect(() => {
    window.scroll(0,0);
    getData(async (getData) => {
      await setData(getData);
      setLoading(true);
      console.log('asdf')
    })
  }, [tab, subTab])



  return (
    <div id='admin'>
      <div id='addBox'>
        <h2 style={{fontSize: '2vw'}}>관리자 페이지</h2> 
      </div>
      <Tab 
        tab={tab}
        setTab={setTab}
        subTab={subTab}
        setSubTab={setSubTab}
      />
      <button id='addBtn' onClick={() => props.history.push('/admin/edit')}>
        <img id='addFileIcon' src={addIcon} />
      </button> 
      <>
        {
          loading &&
          data[tab].details[subTab].posts.map((data) => {
            let createdDate = new Date(JSON.parse(data.createdAt))
            console.log(data)
            return (
              <div id={data.id} className='dataBox'>
                <h3 className='dataTitle' >{`${data.title} / ${createdDate}`}</h3>
                <button className='dataButton' onClick={() => window.confirm('삭제하시겠습니까?')}>
                  <img className='deleteIcon' src={deleteIcon}></img>
                </button>
                <button className='dataButton' onClick={() => props.history.push('/admin/edit')} >
                  <img className='updateIcon' src={updateIcon}></img>
                </button>
              </div>
            )
          })
        }
      </>
    </div>
  )
}

function Tab({ tab, setTab, subTab, setSubTab }) {
  return (
    <div id='tabContainer'>
      <div id='adminTabBox'>
        {
          ['말씀', '소식'].map((ele, idx) => {
            return idx === tab
          ? <div class='adminTab selected' onClick={() => setTab(idx)}>{ele}</div>
          : <div class='adminTab' onClick={() => setTab(idx)}>{ele}</div>
          })
        }
      </div>
      { tab === 0 &&
        <div id='subTabBox'>
          {
            ['주일', '수요', '금요', '새벽', '기도수첩'].map((ele, idx) => {
              return idx === subTab 
              ? <div class='subTab selected' onClick={() => setSubTab(idx)}>{ele}</div>
              : <div class='subTab' onClick={() => setSubTab(idx)}>{ele}</div>
            })
          }
        </div>
      }
    </div>
  )
}

export default Admin;