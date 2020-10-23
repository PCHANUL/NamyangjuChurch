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
      setTimeout(setLoading(true), 2000);
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
     
      <DataBox
        data={data}
        loading={loading}
        tab={tab}
        subTab={subTab}
      />
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

function DataBox({ loading, data, tab, subTab }) {
  return (
    <>
      {
        loading ? (
          data[tab].details[subTab].posts.map((data, index) => {
            let createdDate = transDate(data.createdAt)
            return (
              <div key={`data_${index}`} className='dataBox'>
                <div className='textBox'>
                  <h3 className='title'>{ data.title }</h3>
                  <p className='date'>{ createdDate }</p>
                </div>
                <div className='buttonBox'>
                  <button className='dataButton' onClick={() => window.confirm('삭제하시겠습니까?')}>
                    <img className='deleteIcon' src={deleteIcon}></img>
                  </button>
                  <button className='dataButton' onClick={() => props.history.push('/admin/edit')} >
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

function Tab({ tab, setTab, subTab, setSubTab }) {
  return (
    <div id='tabContainer'>
      <div id='adminTabBox'>
        {
          ['말씀', '소식'].map((ele, idx) => {
            return idx === tab
          ? <div key={`tab_${idx}`} class='adminTab selected' onClick={() => setTab(idx)}>{ele}</div>
          : <div key={`tab_${idx}`} class='adminTab' onClick={() => setTab(idx)}>{ele}</div>
          })
        }
      </div>
      { tab === 0 &&
        <div id='subTabBox'>
          {
            ['주일', '수요', '금요', '새벽', '기도수첩'].map((ele, idx) => {
              return idx === subTab 
              ? <div key={`subTab_${idx}`} class='subTab selected' onClick={() => setSubTab(idx)}>{ele}</div>
              : <div key={`subTab_${idx}`} class='subTab' onClick={() => setSubTab(idx)}>{ele}</div>
            })
          }
        </div>
      }
      <div className='extraDiv left'/>
      <div className='extraDiv right'/>
    </div>
  )
}

export default Admin;