import React from 'react';

import DropdownContent from './DropdownContent';
import { betweenTwoStr, isSameArr } from '../Methods';
import { commands, commandPos } from '../editCommands';

export default function Toolbar() {
  const activeTabStyle = markStyleTab();


  return (
    <div id='toolbar'>
        <DropdownContent />

        <div className="dropdown">
          <button className="dropbtn editorIcon">
            서체
          </button>
          <div className="dropdown-content">
            <input type='number' />
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn editorIcon">
            크기
          </button>
          <div className="dropdown-content">
            <input type='number' />
          </div>
        </div>
          
        {
          commands.map((command, idx) => {
            return (
              <div key={idx} className='editorIcon tooltip' onClick={() => {
                editFunc(command);
                const selected = document.getSelection().getRangeAt(0).commonAncestorContainer;
                activeTabStyle(getStyle(selected));
              }}>
                <span className="tooltiptext">{command.icon}</span>
                <img src={`https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/editorTab/${command.src}.png`} className='iconImg'></img>
              </div>
            )
          })
        }
      </div>
  )
}

const markStyleTab = () => {
  let prevStyles = [];

  return (styles) => {
    if (isSameArr(styles, prevStyles) === false) {
      clearTabStyle();
  
      styles.forEach((style) => {
        if (style.length > 4) {
          let keys = betweenTwoStr(style, '-', ':');
          let values = betweenTwoStr(style, ': ', ';');
          for (let i = 0; i < keys.length; i++) {
            if (keys[i] === 'align') changeTabStyle(commandPos[keys[i]][values[i]]);
          }
        } else if (style !== 'LI') {
          changeTabStyle(commandPos[style]);
        }
      })
      prevStyles = styles;
    }
  }
}

const clearTabStyle = () => {
  let tabs = document.getElementsByClassName('editorIcon')
  for (let i = 3; i < tabs.length; i++) {
    tabs[i].className = 'editorIcon tooltip';
  }
}

const changeTabStyle = (pos) => {
  let tabs = document.getElementsByClassName('editorIcon');
  tabs[pos].className = 'editorIcon tooltip activeIcon';
}

const editFunc = (cmd) => {
  document.execCommand(cmd.cmd, false, cmd.val)

  // let select = window.getSelection().getRangeAt(0)
  // let newNode = document.createElement('div');
  // newNode.setAttribute('style', cmd.cmd);
  // select.surroundContents(newNode)
}