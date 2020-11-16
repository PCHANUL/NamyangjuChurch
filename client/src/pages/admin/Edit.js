import React, { useEffect } from 'react';
import './edit.css';

import { addData, getContent, updateData } from '../axiosRequest';
import { useAppStore } from '../../state/appContext';

import Toolbar from './Toolbar';

function handleImg() {
  let target;
  let setToolbarPos
  let imageToolTarget = document.querySelector('#imageTool');

  const inputSize = (e) => {
    target.style.width = `${e.target.value}vw`;
  }

  const toolbarPos = () => {
    const targetSize = target.getBoundingClientRect()
    imageToolTarget.style.visibility = 'visible';
    imageToolTarget.style.top = `${targetSize.y + window.scrollY - imageToolTarget.clientHeight - 10}px`;
    imageToolTarget.style.left = `${targetSize.x + targetSize.width/2 - imageToolTarget.clientWidth/2}px`;
  }

  return function(e) {
    
    if (e.target.className.includes('image')) {
      if (target) {
        target.className = target.className.replace('selectedImg', 'image');  //change prev target class
        clearInterval(setToolbarPos);
      }

      target = e.target;
      target.className = target.className.replace('image', 'selectedImg');
      
      document.querySelector('#resizeInput').value = e.target.style.width.split('vw')[0];
      document.querySelector('#resizeInput').addEventListener('change', inputSize, true);
      setToolbarPos = setInterval(() => toolbarPos(), 300);
      
    } else if (target && e.target.tagName !== 'INPUT') {
      target.className = target.className.replace('selectedImg', 'image');
      
      // clear
      clearInterval(setToolbarPos);
      document.querySelector('#resizeInput').removeEventListener('change', inputSize, true);
      imageToolTarget.style.visibility = 'hidden';
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

  document.querySelector('#drop-area').style.visibility = 'hidden';
  readImage(files, 'editFrame')
}

function setDropEvent() {
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

function setPrevData(store) {
  if (store.isEdit) {
    getContent(store.selectedId, (data) => {
      document.querySelector('#selectCategory').value = data.detailId;
      document.querySelector('#inputTitle').value = data.title;
      document.querySelector('#editFrame').insertAdjacentHTML('beforeend', data.content.content);
    })
  }
}



const getStyle = (child, style = []) => {
  const parent = child.parentNode;

  if (parent.tagName === 'DIV') {
    if (parent.attributes.style) style.push(parent.attributes.style.value)
    return style;
  } else {
    style.push(parent.tagName);
    return getStyle(parent, style)
  }
}



function Edit(props) {
  const contentIdStore = useAppStore();
  
  useEffect (() => {
    setPrevData(contentIdStore);
    setDropEvent();

    ['keydown', 'mouseup'].forEach((event) => {
      document.querySelector('#editFrame').addEventListener(event, (e) => {
        if ([37, 38, 39, 40].includes(e.keyCode) || e.type === 'mouseup') {
          const selected = document.getSelection().getRangeAt(0).commonAncestorContainer;
          activeTabStyle(getStyle(selected));
        }
      })
    })
    
    const click = handleImg();
    window.addEventListener('click', click, true);
    return () => {
      window.removeEventListener('click', click, true);
    }
  }, [])

  return (
    <div id='edit'>
      <div id='toolbarDiv' />

      <div id="drop-area">
        파일을 내려놓으면 업로드됩니다
      </div>

      <Toolbar />
      

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

      <input id='inputTitle' placeholder='제목을 입력하세요'></input>

      <hr style={{width: '800px', height: '0', border: '0.5px solid rgb(0,0,0,0.1)'}}></hr>
      <div id="editFrame" contentEditable="true">
      </div>
      <hr style={{width: '800px', height: '0', border: '0.5px solid rgb(0,0,0,0.1)'}}></hr>

      <div id='bottombar'>
        <button onClick={() => props.history.push('/admin')}>취소</button>
        <button id='saveBtn' onClick={() => {
          saveData(contentIdStore, props);
        }}>저장</button>
      </div>

      {/* imageTool */}
      <div id='imageTool'>
        <img className='ToolIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/editorTab/resize.png'/>
        <input id='resizeInput' type='text' />
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

  changeYoutubeImg();
  const content = document.getElementById('editFrame').innerHTML.replace(/"/g, "'");
  if (category && title) {
    if (contentState.isEdit) return updateData(contentState.selectedId, category, title, content);
    else {
      let result = await addData(category, title, content);
      if (result.statusText === 'OK') {
        alert('저장되었습니다.');
        props.history.push('/admin');
      }
    }
  }
  else alert('카테고리와 제목을 작성해주세요');
}



export default Edit;