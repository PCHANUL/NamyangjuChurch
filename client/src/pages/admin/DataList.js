import React from 'react';
import ContentData from './ContentData';

function DataList({ loading, data, tab }) {
  console.log('data: ', loading, data, tab);

  if (loading === 'success') {
    console.log(data[tab[0]].details[tab[1]].posts);
  }

  const MakeDataList = () => {
    return (
      <>
        {
          data[tab[0]].details[tab[1]].posts.length !== 0 ? (
            data[tab[0]].details[tab[1]].posts.map((data, index) => {
              return <ContentData key={index} data={data}/>
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

export default DataList;