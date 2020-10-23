import React, { useEffect, useState, useCallback } from 'react';
import { commands } from './editCommands';
import './edit.css';


function Edit(props) {
  let icons = [];
  let req = require.context('../images/editor', false, /.*\.png$/);
  req.keys().forEach(function (key) {
    icons.push(req(key));
  });
  console.log(icons)

  return (
    <div id='edit'>
      <h1>edit page</h1> 
        <div style={{width: '80vw', height: '60vw', border: '0px solid #000'}}>
            <label for="file-upload" className="custom-file-upload">
              <img src={icons[9].default} style={{width: '6vw', height: '6vw'}}></img>
            </label>
            <input type="file" name="reviewImg" id="file-upload" 
              accept="image/png, image/jpeg" 
              onChange={(e) => readImage(e)} 
            />
          {
            commands.map((command, idx) => {
              return (
                <div key={idx} className='editorIcon' onClick={() => editFunc(command)}>
                  <img src={icons[idx].default} style={{width: '2vw', height: '2vw'}}></img>
                </div>
              )
            })
          }
          <div 
            id="editFrame"
            style={{width: '80vw', height: '50vw', border: '2px solid #000', margin: '1vw'}}
            contentEditable="true"
          >
          </div>

          <button onClick={() => {
            document.getElementById('editFrame').insertAdjacentHTML("beforeend", '<img <div style="text-align: center;">굴림데굴데굴굴림</div><h1 style="text-align: center;">한번더 굴림데굴데굴굴림</h1>');

          }}>저장</button>
          <button onClick={() => props.history.push('/admin')}>나가기</button>
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

function readImage(e) {
  // let reader = new FileReader();
  // reader.onload = function(event) {
  //   var img = document.createElement("img"); 
  //   img.src = event.target.result;
  //   console.log(img);
  //   document.getElementById('edit').insertAdjacentHTML("beforeend", img);
  // }
  // reader.readAsDataURL(event.target.files[0]);

  const file = e.target.files[0];
  const img = document.createElement("img");
  img.classList.add("obj");
  img.file = file
  document.getElementById('edit').appendChild(img); 
  
  const reader = new FileReader();
  reader.onload = (function(aImg) { return function(e) { 
    // aImg.src = e.target.result; 
    aImg.src = '../images/close.png'; 

    // console.log(document.execCommand('insertImage', false, '/Users/CHANUL/Desktop/nSarang/client/src/images/add-file.png'))
    // console.log('e.target.result: ', '/Users/CHANUL/Desktop/nSarang/client/src/images/add-file.png');
  }; })(img);
  reader.readAsDataURL(file);


}

function editFunc(cmd) {
  console.log(document.execCommand(cmd.cmd, false, cmd.val));
}

export default Edit;