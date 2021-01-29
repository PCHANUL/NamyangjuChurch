import React from 'react'; 

export default function SelectNumberOfData(props) {
  const { changeMethod } = props;

  return (
    <div id='dataNumberDiv'>
      <select id='dataNumber' defaultValue='10'
        onChange={(e) => changeMethod(e.target.value)}
      >
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='15'>15</option>
        <option value='20'>20</option>
      </select>
      <label id='selectUnit' htmlFor="dataNumber">줄씩 보입니다</label>
      <div id='dataArrowIcon'></div>
    </div>
  )
}