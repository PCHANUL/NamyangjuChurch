import React, { useState, useEffect } from 'react';

import DropdownContent from './DropdownContent';
import { betweenTwoStr, isSameArr } from '../Methods';
import { commands, commandPos, paragraphCommands } from '../editCommands';
import ParagraphSelect from './ParagraphSelect';

export default function Toolbar() {
  const [paragraph, setParagraph] = useState('본문');

  const activeTabStyle = markStyleTab();

  useEffect(() => {
    ['keyup', 'mouseup'].forEach((event) => {
      document.querySelector('#editFrame').addEventListener(event, (e) => {
        if ([37, 38, 39, 40].includes(e.keyCode) || e.type === 'mouseup') {
          const selected = document.getSelection().getRangeAt(0).commonAncestorContainer;
          activeTabStyle(getStyle(selected), setParagraph);
        }
      })
    })

  })

  return (
    <div id='toolbar'>
        <DropdownContent />
        <ParagraphSelect 
          paragraph={paragraph}
          setParagraph={setParagraph}
          paragraphCommands={paragraphCommands}
          editFunc={editFunc}
        />
        

        <div id="fontSelect" className="dropdown selectText" onChange={(e) => {
          editFunc({cmd: 'formatBlock', val: e.target.value})
          setFontSize(e.target.value)
        }}>
          <div className='curSelected'>기본서체</div>
          <div className='dropdown-content'>
            <a>본문</a>
            <a>제목</a>
            <a>부제목</a>
            <a>소제목</a>
          </div>
        </div>

        {
          Object.keys(commands).map((key) => {
            return (
              <div className='tabGroup'>
                {
                  commands[key].map((command, idx) => {
                    return (
                      <div key={idx} className='editorIcon tooltip' onClick={() => {
                        editFunc(command);
                        activeTabStyle(getStyle(selected), setParagraph);
                        const selected = document.getSelection().getRangeAt(0).commonAncestorContainer;
                      }}>
                        <span className="tooltiptext">{command.icon}</span>
                        <img src={`https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/editorTab/${command.src}.png`} className='iconImg'></img>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
  )
}


const markStyleTab = () => {
  let prevStyles = [];

  return (styles, setParagraph) => {
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
        if (paragraphCommands[key]) {
          setParagraph(paragraphCommands[key])
          isHeading = true;
        }
      })
      if (isHeading === false) setParagraph(paragraphCommands.P);
      if (normalize) changeTabStyle(0, false);
      // memo state
      prevStyles = styles;
    } else if (Object.keys(styles).length === 0) {
      setParagraph(paragraphCommands.P);
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