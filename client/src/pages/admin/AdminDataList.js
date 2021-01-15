import React, { useEffect, useState } from 'react';
import AdminData from './AdminData';

export default function AdminDataList({ loading, data }) {
  const [contents, setContent] = useState(data);
  
  useEffect(() => {
    setContent(data);
  }, [data])

  return (
    <>
      {
        loading ? (
          <MakeDataList contents={contents} setContent={setContent} />
        ) : (
          <div className='dataBox'>
            <h3 className='dataTitle'>Loading...</h3>
          </div>
        )
      }
    </>
  )
}

const MakeDataList = (props) => {
  const { contents, setContent } = props;

  return (
    <>
      {
        contents.length !== 0 ? (
          contents.map((content, index) => {
            return <AdminData key={index} content={content} setContent={setContent} />
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

