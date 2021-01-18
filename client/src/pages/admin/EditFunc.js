import { preventDefaults } from '../Methods';
import { uploadImage } from '../axiosRequest';


// 이미지 크기 조절 핸들
export const handleImg = () => {
  let target, setToolbarPos, setHandlePos;
  let imageToolTarget = document.querySelector('#imageTool');
  let resizeHandle = document.getElementsByClassName('resizeHandle');
  
  
  const inputSize = (e) => {
    target.style.width = `${e.target.value}vw`;
  }

  const getToolbarPos = () => {
    const targetSize = target.getBoundingClientRect()
    imageToolTarget.style.visibility = 'visible';
    imageToolTarget.style.top = `${targetSize.y + window.scrollY - imageToolTarget.clientHeight - 10}px`;
    imageToolTarget.style.left = `${targetSize.x + targetSize.width/2 - imageToolTarget.clientWidth/2}px`;
  }
  
  const getHandlePos = () => {
    const targetSize = target.getBoundingClientRect();
    let handlePos = [
      {
        top : `${targetSize.y + targetSize.height + window.scrollY - 25}px`,
        left : `${targetSize.x + targetSize.width - 25}px`,
      },
    ]

    for (let i = 0; i < resizeHandle.length; i++) {
      resizeHandle[i].style.visibility = 'visible';
      resizeHandle[i].style.top = handlePos[i].top;
      resizeHandle[i].style.left = handlePos[i].left;
    }
  }

  return function(e) {
    const resizeImage = (eMouse) => {
      // (마우스 위치 - 타깃 이미지 왼쪽위치)
      target.style.width = `${(eMouse.pageX - target.getBoundingClientRect().left).toFixed(3)}px`
    }

    const resizeStart = (e, resizeHandleTarget) => {
      e.preventDefault()
      window.addEventListener('mousemove', resizeImage);
      window.addEventListener('mouseup', () => resizeStop(resizeHandleTarget));
    }

    const resizeStop = (resizeHandleTarget) => {
      window.removeEventListener('mousemove', resizeImage);
      window.removeEventListener('mouseup', () => resizeStop(resizeHandleTarget));
      resizeHandleTarget.removeEventListener('mousemove', (e) => resizeStart(e, resizeHandleTarget));
    }

    if (e.target.className.includes('image')) {
      if (target) {
        target.className = target.className.replace('selectedImg', 'image');  //change prev target class
        clearInterval(setToolbarPos);
        clearInterval(setHandlePos);
      }

      target = e.target;
      target.className = target.className.replace('image', 'selectedImg');
      
      // document.querySelector('#resizeInput').value = e.target.style.width.split('px')[0];
      // document.querySelector('#resizeInput').addEventListener('change', inputSize, true);
      // setToolbarPos = setInterval(() => getToolbarPos(), 500);

      // resize handle repositioning
      setHandlePos = setInterval(() => getHandlePos(), 500);

      for (let i = 0; i < resizeHandle.length; i++) {
        resizeHandle[i].addEventListener('mousedown', (e) => resizeStart(e, resizeHandle[i]));
      }
      
    } else if (target && e.target.tagName !== 'INPUT') {
      target.className = target.className.replace('selectedImg', 'image');
      
      // clear
      clearInterval(setToolbarPos);
      clearInterval(setHandlePos);
      document.querySelector('#resizeInput').removeEventListener('change', inputSize, true);
      imageToolTarget.style.visibility = 'hidden';
      handle1.style.visibility = 'hidden';
    }
  }
}

export const readImage = async(files, targetId) => {
  for (let file of files) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async(event) => {
      let img = document.createElement('img');
      img.className = 'image';
      img.src = event.target.result;
      img.style.width = '20vw';
      let wrapperDiv = document.createElement('div');
      wrapperDiv.style.textAlign = 'center';
      wrapperDiv.appendChild(img)

      await document.getElementById(targetId).appendChild(wrapperDiv);
    }
  }
}

// 이미지 드롭
export const setDropEvent = () => {
  const targetArea = document.querySelector('#drop-area');
  const targetFrame = document.querySelector('#editFrame');
  const dragEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];
  const handleDrop = (e) => {
    const files = e.dataTransfer.files;
    readImage(files, 'editFrame');
    document.querySelector('#drop-area').style.visibility = 'hidden';
  }

  targetArea.addEventListener('dragleave', () => targetArea.style.visibility = 'hidden');
  targetFrame.addEventListener('dragenter', () => targetArea.style.visibility = 'visible');

  dragEvents.forEach(eventName => targetArea.addEventListener(eventName, preventDefaults, false));
  targetArea.addEventListener('drop', handleDrop, false);
}

// 데이터 저장 전 처리함수

// 동영상 (이미지 => 영상)
export const changeImgToIframe = () => {
  const elements = document.getElementsByClassName('youtubeThumnail');
  while (elements.length !== 0) {
    const targetSize = elements[0].getBoundingClientRect();
    const youtubeIframe = document.createElement('iframe');
    youtubeIframe.src = `https://www.youtube.com/embed/${elements[0].src.split('/')[4]}`;
    youtubeIframe.style.width = elements[0].style.width;
    youtubeIframe.style.height = `${targetSize.height}px`;
    elements[0].parentElement.replaceChild(youtubeIframe, elements[0]);
  }
}

// 이미지 (데이터 => 이미지)
export const changeDataToImage = (targets) => {
  let result = [];
  for (let target of targets) {
    var arr = target.src.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    result.push(new File([u8arr], 'test.png', {type:mime}))
  }
  return result;
}

export const changeImgTagSrc = (newUrls, targets) => {
  for (let i=0; i<targets.length; i++) {
    targets[i].src = newUrls[i].data;
  }
}