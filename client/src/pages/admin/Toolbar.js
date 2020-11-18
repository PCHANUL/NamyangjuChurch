import React, { useState, useEffect } from 'react';

import DropdownContent from './DropdownContent';
import { betweenTwoStr, isSameArr } from '../Methods';
import { commands, commandPos, excludedCommands } from '../editCommands';

export default function Toolbar() {
  const [fontSize, setFontSize] = useState(8);
  const activeTabStyle = markStyleTab();

  useEffect(() => {
    ['keyup', 'mouseup'].forEach((event) => {
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

        <div id="paragraphSelect" className="dropdown selectText" >
          <div>본문</div>
          <div className='dropdown-content' onClick={(e) => {
            e.persist();
            console.log(e.target.tagName)
            // editFunc({cmd: 'formatBlock', val: e.target.value})
            // setFontSize(e.target.value)
          }}>
            <a value='P'><p>본문</p></a>
            <a value='H1'><h1>제목</h1></a>
            <a value='H3'><h3>부제목</h3></a>
            <a value='H6'><h6>소제목</h6></a>
          </div>
        </div>

        <div id="fontSelect" className="dropdown selectText" onChange={(e) => {
          editFunc({cmd: 'formatBlock', val: e.target.value})
          setFontSize(e.target.value)
        }}>
          <div>기본서체</div>
          <div className='dropdown-content'>
            <a>본문</a>
            <a>제목</a>
            <a>부제목</a>
            <a>소제목</a>
          </div>
        </div>

        {/* <select id="paragraphSelect" className="selectTab" onChange={(e) => {
          editFunc({cmd: 'formatBlock', val: e.target.value})
          setFontSize(e.target.value)
        }}>
          <option value="P">본문</option>
          <option value="H1">제목</option>
          <option value="H3">부제목</option>
          <option value="H6">소제목</option>
        </select> */}

        {/* <select id="fontSelect" className="selectTab" onChange={(e) => {
          editFunc({cmd: 'formatBlock', val: e.target.value})
          setFontSize(e.target.value)
        }}>
          <option value="P">기본서체</option>
          <option value="H1">제목</option>
          <option value="H3">부제목</option>
          <option value="H6">소제목</option>
        </select> */}
          
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
  
      let objKeys = Object.keys(styles);
      let isHeading = false;
      let normalize = false;
      objKeys.forEach((key) => {
        if (styles[key] !== 'none') {
          let keys = betweenTwoStr(styles[key], '-', ':');
          let values = betweenTwoStr(styles[key], ': ', ';');
          for (let i = 0; i < keys.length; i++) {
            if (keys[i] === 'align') changeTabStyle(commandPos[keys[i]][values[i]]);
            else if (keys[i] === 'weight' && values[i] === 'normal') normalize = true;
          }
        } 
        if (key !== 'P') changeTabStyle(commandPos[key]);
        if (excludedCommands[key]) {
          document.querySelector('#paragraphSelect').value = key;
          isHeading = true;
        }
      })
      if (isHeading === false) document.querySelector('#paragraphSelect').value = 'P';
      if (normalize) changeTabStyle(1, false);
      // memo state
      prevStyles = styles;
    } else if (Object.keys(styles).length === 0) {
      document.querySelector('#paragraphSelect').value = 'P';
    }
  }
}


const clearTabStyle = () => {
  let tabs = document.getElementsByClassName('editorIcon')
  for (let i = 1; i < tabs.length; i++) {
    tabs[i].className = 'editorIcon tooltip';
  }
}

const changeTabStyle = (pos, toggle = true) => {
  let tabs = document.getElementsByClassName('editorIcon');
  if (pos !== undefined) tabs[pos].className = 'editorIcon tooltip activeIcon';
  if (pos !== undefined && !toggle) tabs[pos].className = 'editorIcon tooltip';
}

const getStyle = (child, style = {}) => {
  const parent = child.parentNode;

  if ({editFrame: '', edit: ''}[parent.id] !== undefined) {
    return style;
  } else {
    if ({LI: ''}[parent.tagName] === undefined) {
      style[parent.tagName] = 'none';
      if (parent.attributes.style) style[parent.tagName] = parent.attributes.style.value;
    }
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