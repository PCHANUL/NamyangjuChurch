import React, { useState } from 'react';
import { bibleVerse } from './bibleVerse';

export default function BibleViewer(props) {
  const { data } = props;
  const [isOpenBible, setOpenBible] = useState(false);

  const getFirstVerse = (str) => {
    for (let i in str) {
      if (Number(str[i])) {
        return [str.slice(0, i), i];
      }
    }
  }

  let bookName = data.verse && getFirstVerse(data.verse)
  // console.log('bookName: ', bibleVerse[bookName][1]);

  return (
    <>
      {
        data.verse.length !== 0 &&
          <div className='bibleVerse' 
            onMouseEnter={() => setOpenBible(true)}
            onMouseLeave={() => setOpenBible(false)}
          >
            <div>{data.verse}</div>
            {
              isOpenBible && (
                <iframe id='bibleViewer' 
                  src={`http://ibibles.net/quote.php?kor-${bibleVerse[bookName[0]][1]}/${data.verse.slice(Number(bookName[1]))}`}
                >
                </iframe>
              )
            }
          </div>
      }
    </>
  )
}