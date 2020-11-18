import React, { useEffect } from 'react';

export default function ParagraphSelect(props) {
  const { paragraph, setParagraph, paragraphCommands, editFunc } = props;

  const selecteOptions = () => {
    Object.keys(paragraphCommands).map((key) => {
      console.log('key: ', key);
      let button = document.createElement('button');
      let child = document.createElement(key);
      child.innerText = paragraphCommands[key];
      button.appendChild(child);
      button.addEventListener('click', () => {
        editFunc({cmd: 'formatBlock', val: key});
        setParagraph(paragraphCommands[key])
      })
      document.querySelector('#paragraphOption').appendChild(button);
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

