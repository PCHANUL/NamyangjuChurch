import React, { useEffect } from 'react';

export default function ParagraphSelect(props) {
  const { paragraph, setParagraph, paragraphCommands, editFunc } = props;

  const selecteOptions = () => {
    let target = document.querySelector('#paragraphOption');
    Object.keys(paragraphCommands).map((key) => {
      let button = document.createElement('button');
      let child = document.createElement(key);
      child.innerText = paragraphCommands[key];
      button.appendChild(child);
      button.addEventListener('click', () => {
        editFunc({cmd: 'formatBlock', val: key});
        setParagraph(paragraphCommands[key])
      })
      target.appendChild(button);
    })
  
  }
  
  useEffect(() => {
    selecteOptions();
  }, [])

  return (
    <div id="paragraphSelect" className="dropdown selectText" >
      <div className='curSelected'>{paragraph}</div>
      <div id='paragraphOption' className='dropdown-content'></div>
    </div>
  )
}

