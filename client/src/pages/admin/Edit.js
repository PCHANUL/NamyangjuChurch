import React, { useEffect } from 'react';
import './edit.css';

import { useAppStore } from '../../state/appContext';

// methods
import { transDate } from '../Methods';
import { addData, getContent, updateData, uploadImage } from '../axiosRequest';
import { saveTempData, getTempData, deleteTempData } from './tempDataFunc';
import { handleImg, setDropEvent, changeImgToIframe, changeDataToImage, changeImgTagSrc } from './EditFunc';

// components
import EditToolbar from './EditToolbar';


export default function Edit(props) {
  const appStore = useAppStore();
  const contentId = window.location.pathname.split('edit/')[1];
  window.scrollTo(0,0);

  useEffect (() => {
    // 편집화면이 아니라면 임시저장데이터 확인
    if (contentId) setContent(contentId);
    else getTempData();
    
    if (!document.querySelector('#inputDate').value) setDateNow();
    
    setDropEvent();
    const click = handleImg();
    window.addEventListener('click', click, true);
    let autoSave = window.setInterval(saveTempData, 50000);
    return () => {
      window.removeEventListener('click', click, true);
      window.clearInterval(autoSave);
    }
  }, [])

  return (
    <div id='edit'>
      <div id='toolbarDiv' />

      <div id="drop-area">
        파일을 내려놓으면 업로드됩니다
      </div>

      <EditToolbar />

      <div id='inputDiv'>
        <select id='selectCategory'>
          <option value="">카테고리</option>
          <optgroup label="예배">
            <option value="1">주일</option>
            <option value="2">수요일</option>
            <option value="3">금요일</option>
            <option value="4">새벽</option>
            <option value="5">기도수첩</option>
          </optgroup>
          <optgroup label="소식">
            <option value="6">사진</option>
          </optgroup>
        </select>
        <input id='inputDate' type="date"></input>
      </div>
      
      <div>
        <input id='inputTitle' placeholder='제목을 입력하세요'></input>
        <input id='inputVerse' placeholder='성경 구절을 입력하세요'></input>
      </div>

      <hr style={{width: '800px', height: '0', border: '0.5px solid rgb(0,0,0,0.1)'}}></hr>
      <div id="editFrame" contentEditable="true"></div>
      <hr style={{width: '800px', height: '0', border: '0.5px solid rgb(0,0,0,0.1)'}}></hr>

      <div id='bottombar'>
        <button onClick={() => props.history.push('/admin')}>취소</button>
        <button id='saveBtn' onClick={async() => {
          let title = document.querySelector('#inputTitle');
          if (title.value.indexOf('(') !== -1) {
            window.confirm('제목의 성경구절을 옯깁니다.') && checkVerseInput(title);
            return
          }
          console.log('save')
          let isSaved = await saveData(contentId, props);
          if (isSaved) {
            deleteTempData();
            window.location = '/admin';
          }
        }}>저장</button>
        <button id='saveBtn' onClick={() => {
          saveTempData();
        }}>임시저장</button>
      </div>

      {/* imageTool */}
      <div id='imageTool'>
        <img className='ToolIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/editorTab/resize.png'/>
        <input id='resizeInput' type='text' />
      </div>

      {/* resize handle */}
      <div id='handle1' className='resizeHandle' >
        <img className='ToolIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/editorTab/resizeArrow.png'/>
      </div>
  </div>
  )
}


const setContent = (id) => {
  getContent(id, (data) => {
    document.querySelector('#selectCategory').value = data.detailId;
    document.querySelector('#inputTitle').value = data.title;
    document.querySelector('#inputVerse').value = data.verse;
    document.querySelector('#inputDate').value = data.createdAt;
    document.querySelector('#editFrame').insertAdjacentHTML('beforeend', data.content.content);
  })
}

const setDateNow = () => {
  transDate(Date.now(), (result) => {
    document.querySelector('#inputDate').value = `${result.year}-${result.month}-${result.day}`
  })
}



const saveData = async(contentId, props) => {
  const category = document.querySelector('#selectCategory').value;
  let title = document.querySelector('#inputTitle').value;
  
  if (category && title) {
    const dateNow = document.querySelector('#inputDate').value;
    let verse = document.querySelector('#inputVerse').value;

    // youtube
    changeImgToIframe();
    
    // image
    const imgTargets = document.getElementsByClassName('image');
    uploadImage(changeDataToImage(imgTargets), (newUrls) => changeImgTagSrc(newUrls, imgTargets));
    const thumbnail = imgTargets.length !== 0 ? imgTargets[0].src : undefined;

    // content
    const content = document.getElementById('editFrame').innerHTML.replace(/"/g, "'"); 
    title = title.replace(/"/g, "'");

    if (contentId) return updateData(contentId, category, title, content, dateNow, verse, thumbnail);
    else {
      let result = await addData(category, title, content, dateNow, verse, thumbnail);
      if (result.statusText === 'OK') {
        alert('저장되었습니다.');
        return result;
      }
    }
  }
  else alert('카테고리와 제목을 작성해주세요');
}

const checkVerseInput = (title) => {
  let splitedTitle = title.value.split('(');
  title.value = splitedTitle[0];
  document.querySelector('#inputVerse').value = splitedTitle[1].slice(0, -1);
  window.alert('입력된 내용을 확인하고 다시 저장을 클릭하세요.')
}
