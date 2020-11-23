import React, { useState, useEffect } from 'react';

import DropdownContent from './DropdownContent';
import { betweenTwoStr, isSameArr } from '../Methods';
import { commands, commandPos, paragraphCommands, fontCommands } from '../editCommands';
import ParagraphSelect from './ParagraphSelect';
import FontSelect from './FontSelect';



export default function Toolbar() {
  const [paragraph, setParagraph] = useState('본문');
  const [fontFamily, setFontFamily] = useState('기본서체');

  const checkCurrentStyle = (e) => {
    if ([37, 38, 39, 40].includes(e.keyCode) || e.type === 'mouseup') {
      const selected = document.getSelection().getRangeAt(0).commonAncestorContainer;
      markStyleTabClosure(getStyle(selected), setParagraph, setFontFamily);
    }
  }

  useEffect(() => {
    ['keyup', 'mouseup'].forEach((event) => {
      document.querySelector('#editFrame').addEventListener(event, checkCurrentStyle)
    })

    return () => {
      ['keyup', 'mouseup'].forEach((event) => {
        document.querySelector('#editFrame').removeEventListener(event, checkCurrentStyle)
      })
    }

  }, [])

  return (
    <div id='toolbar'>
        <DropdownContent />

        <ParagraphSelect 
          paragraph={paragraph}
          setParagraph={setParagraph}
          paragraphCommands={paragraphCommands}
          editFunc={editFunc}
        />
        
        <FontSelect 
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          fontCommands={fontCommands}
          editFunc={editFunc}
        />

        {
          Object.keys(commands).map((key, idx) => {
            return (
              <div key={idx} className='tabGroup'>
                {
                  commands[key].map((command, idx) => {
                    return ( 
                      <div key={idx} className='editorIcon tooltip' onClick={() => {
                        editFunc(command);
                        const selected = document.getSelection().getRangeAt(0).commonAncestorContainer;
                        markStyleTabClosure(getStyle(selected), setParagraph, setFontFamily);
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
  let prevStyles = {};

  return (styles, setParagraph, setFontFamily) => {
    if (isSameArr(styles, prevStyles) === false) {
      clearTabStyle();
      let objKeys = Object.keys(styles);
      let isHeading = false;
      let normalize = false;

      objKeys.forEach((key) => {
        if (key === 'FONT') setFontFamily(fontCommands[styles[key]]);
        else {
          if (styles[key] !== 'none') {
            let keys = betweenTwoStr(styles[key], '-', ':');
            let values = betweenTwoStr(styles[key], ': ', ';');
            for (let i = 0; i < keys.length; i++) {
              if (keys[i] === 'align') changeTabStyle(commandPos[keys[i]][values[i]]);
              else if (keys[i] === 'weight' && values[i] === 'normal') normalize = true;
            }
          } 
        }
        if (key !== 'P') changeTabStyle(commandPos[key]);
        if (paragraphCommands[key]) {
          setParagraph(paragraphCommands[key])
          isHeading = true;
        }

        // memo state
        prevStyles[key] = String(styles[key]);
      })

      if (isHeading === false) setParagraph(paragraphCommands.P);
      if (normalize) changeTabStyle(0, false);
      if (styles.FONT === undefined) setFontFamily('기본서체');

    } else if (Object.keys(styles).length === 0) {
      // init
      setParagraph(paragraphCommands.P);
      setFontFamily('기본서체');
    }
  }
}

const markStyleTabClosure = markStyleTab();

const clearTabStyle = () => {
  let tabs = document.getElementsByClassName('editorIcon')
  for (let i = 0; i < tabs.length; i++) {
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
      else if (parent.attributes.face) style[parent.tagName] = parent.attributes.face.value;
    }
    return getStyle(parent, style)
  }
}

const editFunc = (cmd) => {
  // document.execCommand(cmd.cmd, false);
  document.execCommand(cmd.cmd, false);

  // let select = window.getSelection().getRangeAt(0)
  // let newNode = document.createElement('div');
  // newNode.setAttribute('style', cmd.cmd);
  // select.surroundContents(newNode)
}