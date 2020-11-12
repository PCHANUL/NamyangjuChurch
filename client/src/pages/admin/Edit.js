import React, { useEffect, useState, useContext } from 'react';
import { commands } from '../editCommands';
import './edit.css';

import { uploadImage, addData, getContent, updateData } from '../axiosRequest';
import { useAppStore } from '../../state/appContext';

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



const checkStyle = (child, style = []) => {
  console.log(child)
  const parent = child.parentNode;

  if (parent.tagName === 'DIV') {
    if (parent.attributes.style) style.push(parent.attributes.style.value)
    return style;
  } else {
    style.push(parent.tagName);
    return checkStyle(parent, style)
  }
}


function Edit(props) {
  const contentIdStore = useAppStore();
  
  useEffect (() => {
    setPrevData(contentIdStore);
    setDropEvent();


    ['keydown', 'mouseup'].forEach((event) => {
      document.querySelector('#editFrame').addEventListener(event, () => {
        const selected = document.getSelection().getRangeAt(0).commonAncestorContainer;
        console.log(checkStyle(selected))
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

        <input multiple='multiple' name='filename[]'
          type="file" id="file-upload"
          accept="image/png, image/jpeg" 
          onChange={(e) => readImage(e.target.files, 'editFrame')} 
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
      <div id="editFrame" contentEditable="true">
      </div>
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
        <img className='ToolIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/editorTab/resize.png'/>
        <input id='resizeInput' type='text' />
      </div>

  </div>
  )
}



const getYoutube = async(targetId) => {
  const queryOpts = { name: 'clipboard-read', allowWithoutGesture: false };
  const permissionStatus = await navigator.permissions.query(queryOpts);
  // Will be 'granted', 'denied' or 'prompt':
  console.log(permissionStatus.state);


  // console.log(await navigator.clipboard.readText())
  let youtubeUrl = '';
  let msg = '유튜브 영상 주소를 입력하세요.\n(주소를 복사한 상태라면 입력되어있습니다.)';
  let result;

  if (youtubeUrl.includes('youtube.com/watch?v=')) result = window.prompt(msg, youtubeUrl);
  else result = window.prompt(msg, '');

  if (result) {
    let youtubeCode = result.split('watch?v=');
    if (!youtubeCode[1]) alert('잘못 입력하셨습니다.');
  
    let youtubeVideo = document.createElement('div');
    youtubeVideo.style.textAlign = 'center';
    youtubeVideo.innerHTML = `<img class='image youtubeThumnail' src="https://img.youtube.com/vi/${youtubeCode[1]}/hqdefault.jpg" style='width: 20vw;'></img>`;
    document.getElementById(targetId).appendChild(youtubeVideo);
  }
}

const readImage = async(files, targetId) => {

  for (let file of files) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async(event) => {
      let preview = document.createElement('div');
      preview.style.textAlign = 'center';
      preview.innerHTML = `<img class='loading' src="${event.target.result}">`;
      await document.getElementById(targetId).appendChild(preview);
      let previews = document.getElementsByClassName('loading');
      let targetPreview = previews[previews.length -1];
      let pos = targetPreview.getBoundingClientRect();
      let top = pos.top + pos.height / 2 - 25 + window.scrollY;
      let left = pos.left + pos.width / 2 - 25;
  
      let loadingIcon = `
        <img class='loadingIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/loading.gif' 
        style='top: ${top}px; left: ${left}px;' />
      `;
      targetPreview.insertAdjacentHTML('afterend', loadingIcon);
    }
  }

  for (let file of files) {
    uploadImage(file, (result) => {
      let loadings = document.getElementsByClassName('loading');
      let img = document.createElement('img');
      img.className = 'image';
      img.src = result.data;
      img.style.width = '20vw';
      let wrapperDiv = document.createElement('div');
      wrapperDiv.style.textAlign = 'center';
      wrapperDiv.appendChild(img)

      loadings[0].parentElement.replaceChild(wrapperDiv, loadings[0]);
      document.getElementsByClassName('loadingIcon')[0].remove();
    }); 
  }

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

  if (category && title) {
    console.log('contentState.isEdit: ', contentState.isEdit);
    if (contentState.isEdit) updateData(contentState.selectedId, category, title, content);
    else addData(category, title, content);
  }
  else alert('카테고리와 제목을 작성해주세요');
}

const editFunc = (cmd) => {
  document.execCommand(cmd.cmd, false, cmd.val)


  // let select = window.getSelection().getRangeAt(0)


  // let newNode = document.createElement('div');
  // newNode.setAttribute('style', cmd.cmd);


  // select.surroundContents(newNode)


}

export default Edit;