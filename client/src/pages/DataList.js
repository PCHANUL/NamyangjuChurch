import React from 'react';
import ContentData from './ContentData';

function DataList({ loading, data, tab }) {

  return (
    <>
      {
        loading ? (
          data[tab[0]].details[tab[1]].posts.map((data, index) => {
            return <ContentData key={index} data={data}/>
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

export default DataList;