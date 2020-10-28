import React, { useEffect, useState, useCallback } from 'react';
import { commands } from './editCommands';
import './edit.css';

import { uploadImage } from './axiosRequest';

function Edit(props) {
  // useEffect(() => {
  //   document.
  // })
  let req = require.context('../images/editor', false, /.*\.png$/);

  return (
    <div id='edit'>
      <div id='toolbarDiv' />
      <div id='toolbar'>

        <div className="dropdown ">
          <button className="dropbtn editorIcon">
            <img src={req('./image.png').default} className='iconImg'></img>
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
          onChange={(e) => readImage(e)} 
        />

        <input type='button' id='youtube-upload'
          onClick={() => getYoutube()}
        />
          
        {
          commands.map((command, idx) => {
            return (
              <div key={idx} className='editorIcon tooltip' onClick={() => editFunc(command)}>
                <span className="tooltiptext">{command.icon}</span>
                {
                  command.src ? (
                    <img src={req(`./${command.src}.png`).default} className='iconImg'></img>
                  ) : (
                    <a>{command.icon}</a>
                  )
                }
              </div>
            )
          })
        }
      
      </div>
      <input id='selectCategory' placeholder='카테고리'></input>
      <input id='inputTitle' placeholder='제목'></input>

      <hr style={{width: '800px', height: '0', border: '0.5px solid rgb(0,0,0,0.1)'}}></hr>
      <div id="editFrame" contentEditable="true"></div>
      <hr style={{width: '800px', height: '0', border: '0.5px solid rgb(0,0,0,0.1)'}}></hr>

      <div id='bottombar'>
        <button onClick={() => props.history.push('/admin')}>취소</button>
        <button onClick={() => {
          document.getElementById('editFrame').insertAdjacentHTML("beforeend", '<img <div style="text-align: center;">굴림데굴데굴굴림</div><h1 style="text-align: center;">한번더 굴림데굴데굴굴림</h1>');
        }}>저장</button>

      </div>

  </div>
  )
}

function getIcons() {
  let icons = [];
  let req = require.context('../images/editor', false, /.*\.png$/);
  req.keys().forEach(function (key) {
    icons.push(req(key));
  });
  console.log(icons)

}

async function getYoutube() {
  let youtubeUrl = await navigator.clipboard.readText();
  let msg = '유튜브 영상 주소를 입력하세요.\n(주소를 복사한 상태라면 입력되어있습니다.)';
  let result = ''

  if (youtubeUrl.includes('youtube.com/watch?v=')) result = window.prompt(msg, youtubeUrl);
  else result = window.prompt(msg, '');

  let youtubeCode = result.split('watch?v=');
  if (!youtubeCode[1]) alert('잘못 입력하셨습니다.')

  let youtubeMovie = `<iframe src="https://www.youtube.com/embed/${youtubeCode[1]}"></iframe>`
  document.querySelector('#editFrame').insertAdjacentHTML('beforeend', youtubeMovie);
}

async function readImage(e) {
  const file = await e.target.files[0];
  uploadImage(file, (result) => {
    console.log('result.data: ', result);
    let img = `<img id='image' src=${result.data} style='width: 40vw'>`;
    document.querySelector('#editFrame').insertAdjacentHTML('beforeend', img);
    console.log(document.querySelector('#image').style.width)
  }); 
  
  // let img = `<img id='image' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/Adapter.jpg' style='width: 40vw'>`;
  // document.querySelector('#editFrame').insertAdjacentHTML('beforeend', img);
  // console.log(document.querySelector('#image').style.width)
}

function editFunc(cmd) {
  console.log(document.execCommand(cmd.cmd, false, cmd.val));
  let select = window.getSelection().getRangeAt(0)
  console.log('window.getSelection().getRangeAt(0).toString(): ', select);
}

export default Edit;