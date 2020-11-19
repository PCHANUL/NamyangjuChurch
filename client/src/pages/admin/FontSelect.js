import React, { useEffect } from 'react';

export default function FontSelect(props) {
  const { fontFamily, setFontFamily, editFunc, fontCommands } = props;

  const fontSelectOptions = () => {
    let target = document.querySelector('#fontOption');
    Object.keys(fontCommands).map((key) => {
      let button = document.createElement('button');
      button.style.fontFamily = key;
      button.innerText = fontCommands[key];
      button.addEventListener('click', () => {
        editFunc({cmd: 'fontName', val: key});
        setFontFamily(fontCommands[key])
      })
      target.appendChild(button);
    })
  }

  useEffect(() => {
    fontSelectOptions();
  }, [])

  return (
    <div id="fontSelect" className="dropdown selectText" onChange={(e) => {
      editFunc({cmd: 'formatBlock', val: e.target.value})
      setFontSize(e.target.value)
    }}>
      <div className='curSelected'>{fontFamily}</div>
      <div id='fontOption' className='dropdown-content' style={{width: "100px"}}></div>
    </div>
  )
}