import React, { useState } from 'react';
import AdminData from './AdminData';

export default function AdminDataList({ loading, data, tab }) {
  const [contents, setContent] = useState(data);

  const MakeDataList = () => {
    return (
      <>
        {
          contents[tab[0]].details[tab[1]].posts.length !== 0 ? (
            contents[tab[0]].details[tab[1]].posts.map((content, index) => {
              return <AdminData key={index} content={content} setContent={setContent}/>
            })
          ) : (
            <div className='dataBox'>
              <h3 className='dataTitle'>데이터가 없습니다.</h3>
            </div>
          )
        }
      </>
    )
  }

  return (
    <>
      {
        loading ? (
          <MakeDataList />
        ) : (
          <div className='dataBox'>
            <h3 className='dataTitle'>Loading...</h3>
          </div>
        )
      }
    </>
  )
}

