export const transDate = (date, callback) => {
  let rawDate = new Date(JSON.parse(date));

  let year = String(rawDate.getFullYear());
  let month = rawDate.getMonth() + 1;
  let day = rawDate.getDate();

  // 날짜 형식 맞추기
  month = month < 10 ? `0${String(month)}` : String(month);
  day = day < 10 ? `0${String(day)}` : String(day);

  if (callback) callback({year, month, day});
  else return `${year}. ${month}. ${day}`
}

export const isEmptyObject = async (param) => {
  console.log('param: ', await param);
  return Object.keys(param).length === 0 && param.constructor === Object;
}

export const betweenTwoStr = (string, target1, target2, result = [], start = 0) => {
  if (string.indexOf(target1, start) !== -1) {
    let t1 = string.indexOf(target1, start);
    let t2 = string.indexOf(target2, t1 + 1);
    result.push(string.substring(t1 + 1, t2).trim());
    return betweenTwoStr(string, target1, target2, result, t2 + 1);
  } else {
    return result;
  }
}

export const isSameArr = (obj, prevObj) => {
  let objKeys = Object.keys(obj)
  let prevObjKeys = Object.keys(prevObj)
  
  if (objKeys.length !== prevObjKeys.length) return false;
  for (let i = 0; i < objKeys.length; i++) {
    if (obj[objKeys[i]] !== prevObj[prevObjKeys[i]]) return false;
  }
  return true;
}


export const scrollFunc = (movingTarget, interactTarget, cardNums, cardWidth, cardClass, callback) => {
  let curPos = 0;
  let initCurPos = 0;
  let cardPos = 0;
  let isMoved = false;
  let isMouse = false;
  
  const scroll = (e) => { 
    // 이벤트가 마우스인지 확인
    if (e.type[0] === 'm') isMouse = true;
    else isMouse = false;
    
    // 마우스나 터치가 시작되면
    if (e.type === 'touchstart' || e.type === 'mousedown') {
      // 카드 위치 초기설정
      movingTarget.style.left = `-${cardPos * cardWidth}px`;
      // 초기 위치설정
      curPos = isMouse ? e.clientX : e.touches[0].clientX;
      initCurPos = curPos;
    } 

    // 마우스나 터치가 끝나면
    else if (e.type === 'touchend' || e.type === 'mouseup') {
      let screenCenter = window.innerWidth / 2;

      // 움직였으면 스와이프이고, 아니면 클릭 처리
      if (isMoved === false) {
        if (curPos <= screenCenter - 20 && cardPos > 0) cardPos += -1;
        else if (curPos >= screenCenter + 20 && cardPos < cardNums - 1) cardPos += 1;
      } else {
        if (curPos <= initCurPos - 20 && cardPos < cardNums - 1) cardPos += 1;
        else if (curPos >= initCurPos + 20 && cardPos > 0) cardPos += -1;
      }

      movingTarget.style.left = null;  // style 제거 후 className 설정
      movingTarget.className = `${cardClass}${cardPos}`;
      callback(cardPos);
      curPos = 0;  // 위치 초기화
      initCurPos = 0;  
      isMoved = false;  // move 토글 초기화
    } 
    
    // 마우스나 터치가 움직이면
    else if (e.type === 'touchmove' || e.type === 'mousemove') {
      isMoved = true;
      let m = (isMouse ? e.clientX : e.touches[0].clientX) - curPos;  // 움직인 거리
      let scrollPos = movingTarget.style.left.slice(0, -2);  // 기존 카드 위치

      if (scrollPos > 0 && Math.sign(m) === 1) return;
      else if (scrollPos < -1 * (window.innerWidth) && Math.sign(m) === -1) return;
      else {
        movingTarget.style.left = `${Number(scrollPos) + m}px`
        curPos = isMouse ? e.clientX : e.touches[0].clientX;
      }
    }
  }

  const mousedown = (e) => {
    interactTarget.addEventListener('mousemove', scroll, false);
    scroll(e);
  }

  const mouseup = (e) => {
    scroll(e);
    interactTarget.removeEventListener('mousemove', scroll, false);
  }

  const addScrollEvent = () => {
    if ('ontouchstart' in window) {
      // touch
      interactTarget.addEventListener('touchmove', scroll, false);
      interactTarget.addEventListener('touchend', scroll, false);
      interactTarget.addEventListener('touchstart', scroll, false);
    } else {
      // click
      interactTarget.addEventListener('mousedown', mousedown, false);
      interactTarget.addEventListener('mouseup', mouseup, false);
    }
  }

  const removeScrollEvent = () => {
    if ('ontouchstart' in window) {
      // touch
      interactTarget.removeEventListener('touchmove', scroll, false);
      interactTarget.removeEventListener('touchend', scroll, false);
      interactTarget.removeEventListener('touchstart', scroll, false);
    } else {
      // click
      interactTarget.removeEventListener('mousedown', mousedown, false);
      interactTarget.removeEventListener('mouseup', mouseup, false);
    }
  }

  return {
    addScrollEvent,
    removeScrollEvent
  }
}

const calcPassedTime = (now, past) => {
  return (now - past) / 60000;
}

export function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}