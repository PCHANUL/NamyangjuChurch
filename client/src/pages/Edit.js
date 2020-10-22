import React, { useEffect, useState, useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';

import { commands } from './editCommands';



const Add_Data = gql`
  mutation AddData($name: String!, $age: Int!, $gender: String!) {
    addUser(name: $name, age: $age, gender: $gender) {
      id
      name
    }
  }
`;

const Single_Upload = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

function Edit(props) {
  const singleUploadMutation = useCallback(useMutation(Single_Upload), []);
  // const multiUploadMutation = useCallback(useMutation(Multi_Upload), []);
  
  const [frameElement, getFrameElement] = useState({});
  const [addUser, { data }] = useMutation(Add_Data);

  const [fileUpload, { filedata }] = useMutation(Single_Upload);


  return (
    <div id='edit'>
      <h1>edit page</h1> 
        <div style={{width: '80vw', height: '30vw', border: '2px solid #000'}}>
          <input type="file" name="reviewImg" id="reviewImageFileOpenInput" accept="image/png, image/jpeg" onChange={(e) => {
            console.log(e.target.files)
            readImage(e)
          }} />
          {
            commands.map((command) => {
              return <button onClick={() => editFunc(command)}>{command.icon}</button>
            })
          }
          
          <div 
            id="editFrame"
            style={{width: '80vw', height: '20vw', border: '2px solid #000'}}
            contentEditable="true"
          >
            {/* {JSON.parse('굴림데굴데굴굴림<br><h1>한번더 굴림데굴데굴굴림</h1>')} */}
          </div>

          <button onClick={() => {
            console.log('asdf')
            console.log(document.getElementById('editFrame').innerHTML)
            document.getElementById('editFrame').insertAdjacentHTML("beforeend", '<img <div style="text-align: center;">굴림데굴데굴굴림</div><h1 style="text-align: center;">한번더 굴림데굴데굴굴림</h1>');

            addUser({ variables: { name: '과연', age: 10, gender: 'AAA'}})
          }}>저장</button>
          <button onClick={() => props.history.push('/admin')}>나가기</button>
        </div>
    </div>
  )
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
    console.log('e.target.result: ', '/Users/CHANUL/Desktop/nSarang/client/src/images/add-file.png');
  }; })(img);
  reader.readAsDataURL(file);


}

function editFunc(cmd) {
  console.log(document.execCommand(cmd.cmd, false, cmd.val));
}

export default Edit;