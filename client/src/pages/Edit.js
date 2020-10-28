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
            <a href="#">유튜브 업로드</a>
          </div>
        </div>

        <input type="file" id="file-upload"
          accept="image/png, image/jpeg" 
          onChange={(e) => readImage(e)} 
        />
          
        {
          commands.map((command, idx) => {
            return (
              <div key={idx} className='editorIcon tooltip' onClick={() => editFunc(command)}>
                <span class="tooltiptext">{command.icon}</span>
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

async function readImage(e) {
  // document.execCommand('insertImage', true, 'https://nsarang.s3.ap-northeast-2.amazonaws.com/Adapter.jpg')

  // const file = await e.target.files[0];
  // uploadImage(file, (result) => {
  //   console.log('result.data: ', result);
  //   let img = `<img id='image' src=${result.data} style='width: 40vw'>`;
  //   document.querySelector('#editFrame').insertAdjacentHTML('beforeend', img);
  //   console.log(document.querySelector('#image').style.width)
  // }); 

  let img = `<img id='image' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/Adapter.jpg' style='width: 40vw'>`;
  document.querySelector('#editFrame').insertAdjacentHTML('beforeend', img);
  console.log(document.querySelector('#image').style.width)
}

function editFunc(cmd) {
  console.log(document.execCommand(cmd.cmd, false, cmd.val));
  let select = window.getSelection().getRangeAt(0)
  console.log('window.getSelection().getRangeAt(0).toString(): ', select);
}

export default Edit;