import React, { useState } from 'react';

export default function BibleViewer(props) {
  const { data } = props;

  const [isOpenBible, setOpenBible] = useState(false);

  return (
    <>
      <div className='bibleVerse' 
        onMouseEnter={() => setOpenBible(true)}
        onMouseLeave={() => setOpenBible(false)}
      >
        <div>{data.verse}</div>
      {
        isOpenBible && (
          <object className='bibleViewer' type="text/html" data=
          "http://ibibles.net/quote.php?kor-mat/5:3-12"
          width="800" height="100%"></object>
        )
      }
      </div>
    </>
  )
}