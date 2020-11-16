import React from 'react';

import { uploadImage } from '../axiosRequest';


export default function DropdownContent() {
  return (
    <>
      <div className="dropdown">
        <button className="dropbtn editorIcon">
          <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/editorTab/image.png' className='iconImg'></img>
        </button>
        <div className="dropdown-content">
          <a href="#">
            <label htmlFor="file-upload" className="">
              사진 업로드
            </label>
          </a>
          <a href="#">
            <label htmlFor="youtube-upload" className="">
              유튜브 업로드
            </label>
          </a>
        </div>
      </div>

      <input multiple='multiple' name='filename[]'
      type="file" id="file-upload"
      accept="image/png, image/jpeg" 
      onChange={(e) => readImage(e.target.files, 'editFrame')} 
      />

      <input type='button' id='youtube-upload'
      onClick={() => getYoutube('editFrame')}
      />
    </>
  )
}

const getYoutube = async(targetId) => {
  const queryOpts = { name: 'clipboard-read', allowWithoutGesture: false };
  const permissionStatus = await navigator.permissions.query(queryOpts);
  // Will be 'granted', 'denied' or 'prompt':
  console.log(permissionStatus.state);


  // console.log(await navigator.clipboard.readText())
  let youtubeUrl = '';
  let msg = '유튜브 영상 주소를 입력하세요.\n(주소를 복사한 상태라면 입력되어있습니다.)';
  let result;

  if (youtubeUrl.includes('youtube.com/watch?v=')) result = window.prompt(msg, youtubeUrl);
  else result = window.prompt(msg, '');

  if (result) {
    let youtubeCode = result.split('watch?v=');
    if (!youtubeCode[1]) alert('잘못 입력하셨습니다.');
  
    let youtubeVideo = document.createElement('div');
    youtubeVideo.style.textAlign = 'center';
    youtubeVideo.innerHTML = `<img class='image youtubeThumnail' src="https://img.youtube.com/vi/${youtubeCode[1]}/hqdefault.jpg" style='width: 20vw;'></img>`;
    document.getElementById(targetId).appendChild(youtubeVideo);
  }
}

const readImage = async(files, targetId) => {

  for (let file of files) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async(event) => {
      let preview = document.createElement('div');
      preview.style.textAlign = 'center';
      preview.innerHTML = `<img class='loading' src="${event.target.result}">`;
      await document.getElementById(targetId).appendChild(preview);
      let previews = document.getElementsByClassName('loading');
      let targetPreview = previews[previews.length -1];
      let pos = targetPreview.getBoundingClientRect();
      let top = pos.top + pos.height / 2 - 25 + window.scrollY;
      let left = pos.left + pos.width / 2 - 25;
  
      let loadingIcon = `
        <img class='loadingIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/loading.gif' 
        style='top: ${top}px; left: ${left}px;' />
      `;
      targetPreview.insertAdjacentHTML('afterend', loadingIcon);
    }
  }

  for (let file of files) {
    uploadImage(file, (result) => {
      let loadings = document.getElementsByClassName('loading');
      let img = document.createElement('img');
      img.className = 'image';
      img.src = result.data;
      img.style.width = '20vw';
      let wrapperDiv = document.createElement('div');
      wrapperDiv.style.textAlign = 'center';
      wrapperDiv.appendChild(img)

      loadings[0].parentElement.replaceChild(wrapperDiv, loadings[0]);
      document.getElementsByClassName('loadingIcon')[0].remove();
    }); 
  }

}