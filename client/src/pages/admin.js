import React from 'react';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';


function Admin(props) {
  

  return (
    <div>
      <h1>admin page</h1> 
      <div style={{width: '80vw', height: '20vw', border: '2px solid #000'}}>
        <button style={{width: '15vw', height: '15vw'}} onClick={() => props.history.push('/admin/edit')}>추가하기</button> 
      </div>
      <div style={{width: '80vw', height: '5vw', border: '2px solid #000'}}>
        <div style={{width: '30vw', height: '3vw', border: '2px solid #000', fontSize:'2vw', float: 'left'}}>message</div>
        <div style={{width: '30vw', height: '3vw', border: '2px solid #000', fontSize:'2vw', float: 'left'}}>community</div>
      </div>
      <div style={{width: '80vw', height: '70vw', border: '2px solid #000'}}>
        <h1>List</h1>
        {
          [1,2,3,4,5].map(() => {
            return (
              <div style={{width: '70vw', height: '10vw', border: '2px solid #000', fontSize:'2vw', float: 'left'}}>
                <h1 style={{float:'left'}}>Title / Date</h1>
                <div style={{width: '10vw', height: '3vw', border: '2px solid #000', fontSize:'2vw', float: 'left'}}>수정하기</div>
                <div style={{width: '10vw', height: '3vw', border: '2px solid #000', fontSize:'2vw', float: 'left'}}>삭제하기</div>
              </div>
            )
          })
        }
        
      </div>
    </div>
  )
}

export default Admin;