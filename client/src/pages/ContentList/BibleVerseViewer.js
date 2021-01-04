import React, { useEffect, useState } from 'react';
import { bibleVerse } from './bibleVerse';

import { getBibleVerse } from '../axiosRequest';

export default function BibleVerseViewer(props) {
  const { data, appStore } = props.value;
  const [isOpenBible, setOpenBible] = useState(false);
  const [verse, setVerse] = useState('');

  useEffect(() => {
    if (data.verse) {
      let bookName = getFirstVerse(data.verse);
      let result = []
      bookName[1].split('-').map((item) => {
        item.split(':').forEach(element => result.push(Number(element)));
      });

      console.log(result)

      // getBibleVerse(book, chapterA, verseA, chapterB, verseB, callback)
      getBibleVerse(
        bibleVerse[bookName[0]],     
        result[0], 
        result[1],
        result.length === 4 ? result[2] : result[0], 
        result[result.length - 1], 
        (result) => setVerse(result)
      )
    }
  }, [appStore.selectedDetail])
 
  return (
    <>
      {
        data.verse.length !== 0 &&
          <div className='bibleVerse' 
            // onClick={() => setOpenBible(!isOpenBible)}
            onMouseEnter={() => setOpenBible(true)}
            onMouseLeave={() => setOpenBible(false)}
          >
            <div>{data.verse}</div>
            {
              isOpenBible && (
                <BibleViewer verse={verse}/>
              )
            }
          </div>
      }
    </>
  )
}

const getFirstVerse = (str) => {
  for (let i in str) {
    if (Number(str[i])) {
      return [str.slice(0, i), str.slice(i)];
    }
  }
}

const BibleViewer = (props) => {
  const { verse } = props;

  return (
    <div className='bibleViewer'>
      {
        verse.map((item) => {
          return <p>{`${item.chapter}:${item.verse} ${item.content}`}</p>
        })
      }
    </div>
  )
}