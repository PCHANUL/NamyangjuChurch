import React, { useEffect } from 'react';
import './edit.css';

import { useAppStore } from '../../state/appContext';
import { addData, getContent, updateData, readImage } from '../axiosRequest';
import { transDate } from '../Methods';
import { saveTempData, getTempData, deleteTempData } from './tempDataFunc';

import Toolbar from './Toolbar';

function handleImg() {
  let target, setToolbarPos, setHandlePos;
  let imageToolTarget = document.querySelector('#imageTool');
  let resizeHandle = document.getElementsByClassName('resizeHandle');
  
  
  const inputSize = (e) => {
    target.style.width = `${e.target.value}vw`;
  }

  const getToolbarPos = () => {
    const targetSize = target.getBoundingClientRect()
    imageToolTarget.style.visibility = 'visible';
    imageToolTarget.style.top = `${targetSize.y + window.scrollY - imageToolTarget.clientHeight - 10}px`;
    imageToolTarget.style.left = `${targetSize.x + targetSize.width/2 - imageToolTarget.clientWidth/2}px`;
  }
  
  const getHandlePos = () => {
    const targetSize = target.getBoundingClientRect();
    let handlePos = [
      {
        top : `${targetSize.y + targetSize.height + window.scrollY - 25}px`,
        left : `${targetSize.x + targetSize.width - 25}px`,
      },
    ]

    for (let i = 0; i < resizeHandle.length; i++) {
      resizeHandle[i].style.visibility = 'visible';
      resizeHandle[i].style.top = handlePos[i].top;
      resizeHandle[i].style.left = handlePos[i].left;
    }
  }

  return function(e) {
    const resizeImage = (eMouse) => {
      console.log('e.target: ', e.target);
      // (마우스 위치 - 타깃 이미지 왼쪽위치)
      target.style.width = `${(eMouse.pageX - target.getBoundingClientRect().left).toFixed(3)}px`
    }

    const resizeStart = (e, resizeHandleTarget) => {
      console.log('resizeHandleTarget: ', resizeHandleTarget);
      e.preventDefault()
      window.addEventListener('mousemove', resizeImage);
      window.addEventListener('mouseup', () => resizeStop(resizeHandleTarget));
    }

    const resizeStop = (resizeHandleTarget) => {
      window.removeEventListener('mousemove', resizeImage);
      window.removeEventListener('mouseup', () => resizeStop(resizeHandleTarget));
      resizeHandleTarget.removeEventListener('mousemove', (e) => resizeStart(e, resizeHandleTarget));
    }

    if (e.target.className.includes('image')) {
      if (target) {
        target.className = target.className.replace('selectedImg', 'image');  //change prev target class
        clearInterval(setToolbarPos);
        clearInterval(setHandlePos);
      }

      target = e.target;
      target.className = target.className.replace('image', 'selectedImg');
      
      // document.querySelector('#resizeInput').value = e.target.style.width.split('px')[0];
      // document.querySelector('#resizeInput').addEventListener('change', inputSize, true);
      // setToolbarPos = setInterval(() => getToolbarPos(), 500);

      // resize handle repositioning
      setHandlePos = setInterval(() => getHandlePos(), 500);

      for (let i = 0; i < resizeHandle.length; i++) {
        resizeHandle[i].addEventListener('mousedown', (e) => resizeStart(e, resizeHandle[i]));
      }
      
    } else if (target && e.target.tagName !== 'INPUT') {
      target.className = target.className.replace('selectedImg', 'image');
      
      // clear
      clearInterval(setToolbarPos);
      clearInterval(setHandlePos);
      document.querySelector('#resizeInput').removeEventListener('change', inputSize, true);
      imageToolTarget.style.visibility = 'hidden';
      handle1.style.visibility = 'hidden';
    }

  }
}

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files
  console.log('files: ', files);

  document.querySelector('#drop-area').style.visibility = 'hidden';
  readImage(files, 'editFrame')
}

const setDropEvent = () => {
  document.querySelector('#drop-area').addEventListener('dragleave', (e) => {
    console.log('leave')
    document.querySelector('#drop-area').style.visibility = 'hidden';
  })
  document.querySelector('#editFrame').addEventListener('dragenter', (e) => {
    document.querySelector('#drop-area').style.visibility = 'visible';
    console.log('이미지를 놓으세요');
  })

  let dragEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];
  dragEvents.forEach(eventName => {
    document.querySelector('#drop-area').addEventListener(eventName, preventDefaults, false)
  })
  document.querySelector('#drop-area').addEventListener('drop', handleDrop, false);
}

const setContent = (store) => {
  if (store.isEdit) {
    getContent(store.selectedId, (data) => {
      document.querySelector('#selectCategory').value = data.detailId;
      document.querySelector('#inputTitle').value = data.title;
      document.querySelector('#inputDate').value = data.createdAt;
      document.querySelector('#editFrame').insertAdjacentHTML('beforeend', data.content.content);
    })
  }
}

const setDateNow = () => {
  transDate(Date.now(), (result) => {
    document.querySelector('#inputDate').value = `${result.year}-${result.month}-${result.day}`
  })
}



export default function Edit(props) {
  const contentIdStore = useAppStore();
  
  useEffect (() => {
    getTempData();
    setContent(contentIdStore);
    setDropEvent();
    setDateNow();
    
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

      <Toolbar />

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
      

      <input id='inputTitle' placeholder='제목을 입력하세요'></input>

      <hr style={{width: '800px', height: '0', border: '0.5px solid rgb(0,0,0,0.1)'}}></hr>
      <div id="editFrame" contentEditable="true"></div>
      <hr style={{width: '800px', height: '0', border: '0.5px solid rgb(0,0,0,0.1)'}}></hr>

      <div id='bottombar'>
        <button onClick={() => props.history.push('/admin')}>취소</button>
        <button id='saveBtn' onClick={async() => {
          let isSaved = await saveData(contentIdStore, props);
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



const changeYoutubeImg = () => {
  const elements = document.getElementsByClassName('youtubeThumnail');
  while (elements.length !== 0) {
    const youtubeIframe = document.createElement('iframe');
    youtubeIframe.src = `https://www.youtube.com/embed/${elements[0].src.split('/')[4]}`;
    youtubeIframe.style.width = elements[0].style.width;
    elements[0].parentElement.replaceChild(youtubeIframe, elements[0]);
  }
}
 
const saveData = async(contentState, props) => {
  const category = document.querySelector('#selectCategory').value;
  const title = document.querySelector('#inputTitle').value;
  const dateNow = document.querySelector('#inputDate').value;

  changeYoutubeImg();
  const content = document.getElementById('editFrame').innerHTML.replace(/"/g, "'"); 
  if (category && title) {
    if (contentState.isEdit) return updateData(contentState.selectedId, category, title, content, dateNow);
    else {
      let result = await addData(category, title, content, dateNow);
      if (result.statusText === 'OK') {
        alert('저장되었습니다.');
        return result;
      }
    }
  }
  else alert('카테고리와 제목을 작성해주세요');
}

