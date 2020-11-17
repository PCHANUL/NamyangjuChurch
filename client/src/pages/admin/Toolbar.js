import React, { useState, useEffect } from 'react';

import DropdownContent from './DropdownContent';
import { betweenTwoStr, isSameArr } from '../Methods';
import { commands, commandPos, excludedCommands } from '../editCommands';

export default function Toolbar() {
  const [fontSize, setFontSize] = useState(8);
  const activeTabStyle = markStyleTab();

  useEffect(() => {
    ['keydown', 'mouseup'].forEach((event) => {
      document.querySelector('#editFrame').addEventListener(event, (e) => {
        if ([37, 38, 39, 40].includes(e.keyCode) || e.type === 'mouseup') {
          const selected = document.getSelection().getRangeAt(0).commonAncestorContainer;
          activeTabStyle(getStyle(selected));
        }
      })
    })

  })

  return (
    <div id='toolbar'>
        <DropdownContent />

        <select id="paragraphSelect" className="selectTab" onChange={(e) => {
          editFunc({cmd: 'formatBlock', val: e.target.value})
          setFontSize(e.target.value)
        }}>
          <option value="P">본문</option>
          <option value="H1">제목</option>
          <option value="H3">부제목</option>
          <option value="H6">소제목</option>
        </select>

        <select id="fontSelect" className="selectTab" onChange={(e) => {
          editFunc({cmd: 'formatBlock', val: e.target.value})
          setFontSize(e.target.value)
        }}>
          <option value="P">기본서체</option>
          <option value="H1">제목</option>
          <option value="H3">부제목</option>
          <option value="H6">소제목</option>
        </select>
          
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
    console.log('styles: ', styles);
    if (isSameArr(styles, prevStyles) === false) {
      clearTabStyle();
  
      console.log('styles: ', styles);
      let objKeys = Object.keys(styles)
      objKeys.forEach((key) => {
        if (styles[key] !== 'none') {
          let keys = betweenTwoStr(styles[key], '-', ':');
          let values = betweenTwoStr(styles[key], ': ', ';');
          for (let i = 0; i < keys.length; i++) {
            if (keys[i] === 'align') changeTabStyle(commandPos[keys[i]][values[i]]);
          }
        } 
        if (!excludedCommands[key]) changeTabStyle(commandPos[key]);
      })
      prevStyles = styles;
    }
  }
}


const clearTabStyle = () => {
  let tabs = document.getElementsByClassName('editorIcon')
  for (let i = 1; i < tabs.length; i++) {
    tabs[i].className = 'editorIcon tooltip';
  }
}

const changeTabStyle = (pos) => {
  let tabs = document.getElementsByClassName('editorIcon');
  tabs[pos].className = 'editorIcon tooltip activeIcon';
}

const getStyle = (child, style = {}) => {
  const parent = child.parentNode;

  if ({editFrame: '', edit: ''}[parent.id] !== undefined) {
    return style;
  } else {
    if (parent.tagName !== 'LI') style[parent.tagName] = 'none';
    if (parent.attributes.style) style[parent.tagName] = parent.attributes.style.value;
    return getStyle(parent, style)
  }
}

const editFunc = (cmd) => {
  document.execCommand(cmd.cmd, false, cmd.val)

  // let select = window.getSelection().getRangeAt(0)
  // let newNode = document.createElement('div');
  // newNode.setAttribute('style', cmd.cmd);
  // select.surroundContents(newNode)
}