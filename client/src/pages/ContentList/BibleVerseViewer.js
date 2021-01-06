import React, { useEffect, useState } from 'react';
import { bibleVerse } from './bibleVerse';

import { getBibleVerse } from '../axiosRequest';

export default function BibleVerseViewer(props) {
  const { verse } = props;
  const [isOpenBible, setOpenBible] = useState(false);
  const [bibleContent, setBibleContent] = useState([]);

  useEffect(() => {
    if (verse) {
      let bookName = getFirstVerse(verse);
      let result = []
      bookName[1].split('-').map((item) => {
        item.split(':').forEach(element => result.push(Number(element)));
      });

      // getBibleVerse(book, chapterA, verseA, chapterB, verseB, callback)
      getBibleVerse (
        bibleVerse[bookName[0]],     
        result[0], 
        result[1],
        result.length === 4 ? result[2] : result[0], 
        result[result.length - 1], 
        (result) => setBibleContent(result)
      )
    }
  }, [verse])
 
  return (
    <>
      {
        verse.length !== 0 &&
          <div className='bibleVerse' 
            onClick={() => setOpenBible(!isOpenBible)}
            // onMouseEnter={() => setOpenBible(true)}
            // onMouseLeave={() => setOpenBible(false)}
          >
            <div>{verse}</div>
            {
              isOpenBible && (
                <BibleViewer bibleContent={bibleContent}/>
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
  const { bibleContent } = props;

  return (
    <div className='bibleViewer'>
      {
        bibleContent.map((item, i) => {
          return <p key={i}>{`${item.chapter}:${item.verse} ${item.content}`}</p>
        })
      }
    </div>
  )
}