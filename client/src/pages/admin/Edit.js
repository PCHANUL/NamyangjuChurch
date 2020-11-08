import React, { useEffect, useState, useContext } from 'react';
import { commands } from '../editCommands';
import './edit.css';

import { uploadImage, addData, getContent, updateData } from '../axiosRequest';
import { useAppStore } from '../../state/appContext';

import { isEmptyObject } from '../Methods';



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

function Edit(props) {
  const contentIdStore = useAppStore();
  
  useEffect (() => {
    console.log('enter');
    if (contentIdStore.isEdit) {
      getContent(contentIdStore.selectedId, (data) => {
        document.querySelector('#selectCategory').value = data.detailId;
        document.querySelector('#inputTitle').value = data.title;
        document.querySelector('#editFrame').insertAdjacentHTML('beforeend', data.content.content);
      })
    }
    
    const click = handleImg();
    window.addEventListener('click', click, true)
    return () => {
      console.log('leave');
      window.removeEventListener('click', click, true)
    }
  }, [])

  return (
    <div id='edit'>
      <div id='toolbarDiv' />
      <div id='toolbar'>
        <div className="dropdown">
          <button className="dropbtn editorIcon">
            <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/editorTab/image.png' className='iconImg'></img>
          </button>
          <div className="dropdown-content">
            <a href="#">
              <label htmlFor="file-upload" className="">
                사진 업로드
              </label>
            </a>
            <a href="#">
              <label htmlFor="youtube-upload" className="">
                유튜브 업로드
              </label>
            </a>
          </div>
        </div>

        <input type="file" id="file-upload"
          accept="image/png, image/jpeg" 
          onChange={(e) => readImage(e, 'editFrame')} 
        />

        <input type='button' id='youtube-upload'
          onClick={() => getYoutube('editFrame')}
        />
          
        {
          commands.map((command, idx) => {
            return (
              <div key={idx} className='editorIcon tooltip' onClick={() => editFunc(command)}>
                <span className="tooltiptext">{command.icon}</span>
                {
                  command.src ? (
                    <img src={`https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/editorTab/${command.src}.png`} className='iconImg'></img>
                  ) : (
                    <a>{command.icon}</a>
                  )
                }
              </div>
            )
          })
        }
      
      </div>

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
      <div id="editFrame" contentEditable="true"></div>
      <hr style={{width: '800px', height: '0', border: '0.5px solid rgb(0,0,0,0.1)'}}></hr>

      <div id='bottombar'>
        <button onClick={() => props.history.push('/admin')}>취소</button>
        <button id='saveBtn' onClick={() => {
          saveData(contentIdStore);
          // alert('저장되었습니다.');
          // props.history.push('/admin');
        }}>저장</button>
      </div>

      {/* imageTool */}
      <div id='imageTool'>
        <img className='imageToolIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/editorTab/resize.png'/>
        <input id='resizeInput' type='text' />
      </div>

  </div>
  )
}



const getYoutube = async(targetId) => {
  console.log(navigator.clipboard)
  let youtubeUrl = isEmptyObject(navigator.clipboard) ? await navigator.clipboard.readText() : '';
  let msg = '유튜브 영상 주소를 입력하세요.\n(주소를 복사한 상태라면 입력되어있습니다.)';
  let result;

  if (youtubeUrl.includes('youtube.com/watch?v=')) result = window.prompt(msg, youtubeUrl);
  else result = window.prompt(msg, '');

  if (result) {
    let youtubeCode = result.split('watch?v=');
    if (!youtubeCode[1]) alert('잘못 입력하셨습니다.');
  
    let youtubeVideo = `<img class='image youtubeThumnail' src="https://img.youtube.com/vi/${youtubeCode[1]}/hqdefault.jpg" style='width: 20vw'></img>`;
    document.getElementById(targetId).insertAdjacentHTML('beforeend', youtubeVideo);
  }
}

const readImage = async(e, targetId) => {
  const file = await e.target.files[0];
  uploadImage(file, (result) => {
    let img = `<img class='image' src=${result.data} style='width: 20vw'>`;
    document.getElementById(targetId).insertAdjacentHTML('beforeend', img);
  }); 
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

const saveData = (contentState) => {
  const category = document.querySelector('#selectCategory').value;
  const title = document.querySelector('#inputTitle').value;

  changeYoutubeImg();
  const content = document.getElementById('editFrame').innerHTML.replace(/"/g, "'");

  console.log('contentState.selectedId, category, title, content: ', contentState.selectedId, category, title, content);

  // if (category && title) {
  //   console.log('contentState.isEdit: ', contentState.isEdit);
  //   if (contentState.isEdit) updateData(contentState.selectedId, category, title, content);
  //   else addData(category, title, content);
  // }
  // else alert('카테고리와 제목을 작성해주세요');
}

const editFunc = (cmd) => {
  console.log(document.execCommand(cmd.cmd, false, cmd.val));
  let select = window.getSelection().getRangeAt(0)
}

export default Edit;