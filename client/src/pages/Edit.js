import React, { useEffect, useState, useCallback } from 'react';
import { commands } from './editCommands';
import './edit.css';

import { uploadImage } from './axiosRequest';


function Edit(props) {
  let req = require.context('../images/editor', false, /.*\.png$/);

  return (
    <div id='edit'>
      <div id='toolbar'>
          <div className="dropdown">
            <button className="dropbtn">
              <img src={req('./image.png').default} className='iconImg'></img>
            </button>
            <div className="dropdown-content">
              <a href="#">
                <label htmlFor="file-upload" className="editorIcon">
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
              <div key={idx} className='editorIcon' onClick={() => editFunc(command)}>
                {
                  command.src ? (
                    <img src={req(`./${command.src}.png`).default} className='iconImg' ></img>
                  ) : (
                    <a>{command.icon}</a>
                  )
                }
              </div>
            )
          })
        }
      </div>

      <input placeholder='category'></input>
      <input placeholder='title'></input>

      <div id="editFrame" contentEditable="true"></div>

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
  // let reader = new FileReader();
  // reader.onload = function(event) {
  //   var img = document.createElement("img"); 
  //   img.src = event.target.result;
  //   console.log(img);
  //   document.getElementById('edit').insertAdjacentHTML("beforeend", img);
  // }
  // reader.readAsDataURL(event.target.files[0]);


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

  


  // const img = document.createElement("img");
  // img.classList.add("obj");
  // img.file = file
  // document.getElementById('edit').appendChild(img); 
  
  // const reader = new FileReader();
  // reader.onload = (function(aImg) { 
    
  //   return function(e) { 

  //   // aImg.src = e.target.result; 
  //   // aImg.src = '../images/close.png'; 

  //   // console.log(document.execCommand('insertImage', false, '/Users/CHANUL/Desktop/nSarang/client/src/images/add-file.png'))
  //   // console.log('e.target.result: ', '/Users/CHANUL/Desktop/nSarang/client/src/images/add-file.png');
  // }; })(img);
  // reader.readAsDataURL(file);


}

function editFunc(cmd) {
  console.log(document.execCommand(cmd.cmd, false, cmd.val));
}

export default Edit;