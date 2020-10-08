import React, { useEffect, useState } from 'react';

function Edit() {
  const [frameElement, getFrameElement] = useState({});

  const commands = [
    {
      cmd: 'bold',
      icon: '굵게',
    },
    {
      cmd: 'fontSize',
      icon: '크기',
      val: '10',
    }
  ]

  function editFunc(cmd) {
    document.execCommand(cmd.cmd, false, cmd.val);
  }

  return (
    <>
      <h1>edit page</h1> 
        <div style={{width: '80vw', height: '30vw', border: '2px solid #000'}}>
          {
            commands.map((command) => {
              return <button onClick={() => editFunc(command)}>{command.icon}</button>
            })
          }
          
          <div 
            id="editFrame"
            style={{width: '50vw', height: '20vw', border: '2px solid #000'}}
            contentEditable="true"
          >
            굴림데굴데굴굴림
            <br />
            한번더 굴림데굴데굴굴림
          </div>
        </div>
    </>
  )
}

export default Edit;