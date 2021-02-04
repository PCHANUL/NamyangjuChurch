import React from 'react';
import { Link } from 'react-router-dom';

// component
import BibleVerseViewer from './BibleVerseViewer';

export default function VideoContent(props) {
  const { data, countLoading } = props;
  setTimeout(() => countLoading('video'), 0);

  return (
    <div className='videoDiv'>
      <div className='videoTitle'>
        <Link to={`/content/${data.id}`}>{data.title}</Link>
        <p>{(data.createdAt).replace(/-/g, '. ')}</p>
      </div>
      <BibleVerseViewer verse={data.verse} />
    </div>
  )
}