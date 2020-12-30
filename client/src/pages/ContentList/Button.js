import React from 'react';
import './Button.css';

export function Button(props) {
  const { children, className, onClick } = props;

  const onMouseDown = (e) => {
    e.persist();
    console.log('target: ', e.target);
    let target = findRoot(e.target);
    // 클릭위치
    console.log('target: ', e.target.parentNode, e.target.innerText);

    let mouseX, mouseY;
    if (e.target.className.includes('buttonDefault') || e.target.innerText) {
      mouseX = e.nativeEvent.offsetX;
      mouseY = e.nativeEvent.offsetY;
    } else {
      mouseX = e.target.offsetLeft + (e.target.offsetWidth / 2);
      mouseY = e.target.offsetTop + (e.target.offsetHeight / 2);
    }
    console.log('mouseX, mouseY: ', mouseX, mouseY);
    clickAction(target, mouseX, mouseY);
  }
  
  const clickAction = (target, x, y) => {
    let targetElement = target.getBoundingClientRect()
    console.log('targetElement: ', targetElement);
    let div = document.createElement('div');
    div.className = 'clickMotion';
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    target.appendChild(div);
    
    setTimeout(() => {
      div.className = div.className + ' clickMotion_visible';
      div.style.transform = `scale(${targetElement.width / 5})`;
      setTimeout(() => {
        div.className = 'clickMotion';
        if (onClick !== undefined) onClick();
        div.parentNode.removeChild(div)
      }, 500)
    }, 0);
  }
  
  const findRoot = (target) => {
    if (target.className.includes('buttonDefault')) return target.childNodes[1];
    else return findRoot(target.parentNode);
  }

  return (
    <div className={`buttonDefault ${className}`} onMouseDown={onMouseDown}>
      <span className='label'>{children}</span>
      <span className='root'></span>
    </div>
  )
}


export function GobackButton() {
  // const clickFunc = () => {
  //   let target = document.getElementsByClassName('goback')[0].childNodes[1];
  //   clickMotion(target);
  // }

  // const clickMotion = (target) => {
  //   let div = document.createElement('div');
  //   div.className = 'clickMotion';
  //   let rect = target.getBoundingClientRect();
  //   div.style.top = `${rect.height / 2 - rect.height / 7}px`;
  //   div.style.left = `${rect.width / 2 - rect.width / 9}px`;
  //   target.appendChild(div);

  //   setTimeout(() => {
  //     div.className = div.className + ' clickMotion_visible';
  //     setTimeout(() => {
  //       div.className = 'clickMotion';
  //       window.history.back();
  //       div.parentNode.removeChild(div)
  //     }, 200)
  //   }, 0);
  // }
  return (
    <Button className='goback' onClick={() => window.history.back()}>
      <div className='gobackIcon gobackIcon_top'></div>
      <div className='gobackIcon gobackIcon_bot'></div>
    </Button>
  )
}