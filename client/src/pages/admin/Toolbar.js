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

        <select className="selectStyle" onChange={(e) => {
          editFunc({cmd: 'formatBlock', val: e.target.value})
          setFontSize(e.target.value)
        }}>
          <option value="P">본문</option>
          <option value="H1">제목</option>
          <option value="H3">부제목</option>
          <option value="H6">소제목</option>
        </select>

        <select className="selectStyle" onChange={(e) => {
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
    if (isSameArr(styles, prevStyles) === false) {
      clearTabStyle();
  
      console.log('styles: ', styles);

      styles.forEach((style) => {
        if (style.length > 4) {
          let keys = betweenTwoStr(style, '-', ':');
          let values = betweenTwoStr(style, ': ', ';');
          for (let i = 0; i < keys.length; i++) {
            if (keys[i] === 'align') changeTabStyle(commandPos[keys[i]][values[i]]);
          }
        } 
        else if (!excludedCommands[style]) changeTabStyle(commandPos[style]);


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
  console.log('tabs: ', tabs, pos);
  tabs[pos].className = 'editorIcon tooltip activeIcon';
}

const getStyle = (child, style = []) => {
  const parent = child.parentNode;
  console.log('parent: ', parent);

  if (['editFrame', 'edit'].includes(parent.id)) {
    return style;
  } else {
    if (parent.attributes.style) style.push(parent.attributes.style.value)
    style.push(parent.tagName);
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