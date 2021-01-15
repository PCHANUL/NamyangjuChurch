import React from 'react';


export default function AdminTab({ tab, setTab }) {
  return (
    <div id='tabContainer'>
      <div id='adminTabBox'>
        {
          ['말씀', '소식'].map((ele, idx) => {
            return idx === tab[0]
          ? <div key={`tab_${idx}`} className='adminTab selected'>{ele}</div>
          : <div key={`tab_${idx}`} className='adminTab' onClick={() => {
              if (idx === 1) setTab([idx, 5])
              else setTab([idx, 0])
            }}>{ele}</div>
          })
        }
      </div>
      { tab[0] === 0 ? (
        <div id='subTabBox'>
          {
            ['주일', '수요', '금요', '새벽', '기도수첩'].map((ele, idx) => {
              return idx === tab[1] 
              ? <div key={`subTab_${idx}`} className='subTab selected'>{ele}</div>
              : <div key={`subTab_${idx}`} className='subTab' onClick={() => setTab([tab[0], idx])}>{ele}</div>
            })
          }
        </div>
        ) : (
          ['교회 사진'].map((ele, idx) => {
            return idx === tab[1] 
            ? <div key={`subTab_${idx}`} className='subTab selected'>{ele}</div>
            : <div key={`subTab_${idx}`} className='subTab' onClick={() => setTab([tab[0], 5 + idx])}>{ele}</div>
          })
        )
      }
    </div>
  )
}