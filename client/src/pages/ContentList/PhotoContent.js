import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function PhotoContent(props) {
  const { data, countLoading } = props;
  const history = useHistory();

  return (
    <div className='pictureDiv'>
      <div className='imgDiv' onClick={() => history.push(`/content/${data.id}`)}>
        <img className='pictureImg' src={data.thumbnail} onLoad={() => countLoading('photo')} />
      </div>
      <div className='pictureTitle'>
        <Link to={`/content/${data.id}`}>{data.title}</Link>
        <p>{(data.createdAt).replace(/-/g, '. ')}</p>
      </div>
    </div>
  )
}
