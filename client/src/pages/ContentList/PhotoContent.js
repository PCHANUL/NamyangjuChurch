import React from 'react';
import { Link } from 'react-router-dom';

export default function PhotoContent(props) {
  const { data } = props;

  return (
    <div className='pictureDiv'>
      <div className='imgDiv'>
        <img className='pictureImg' src={data.thumbnail} />
      </div>
      <div className='pictureTitle'>
        <Link to={`/content/${data.id}`}>{data.title}</Link>
        <p>{(data.createdAt).replace(/-/g, '. ')}</p>
      </div>
    </div>
  )
}
