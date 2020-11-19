import React from 'react';

import { readImage } from '../axiosRequest';


export default function DropdownContent() {
  return (
    <>
      <div className="dropdown">
        <button className="dropbtn">
          <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/editorTab/insert-picture-icon.png' className='iconImg'></img>
        </button>
        <div className="dropdown-content">
          <a href="#">
            <label htmlFor="file-upload">
              <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/editorTab/insert-picture-icon.png' className='iconImg'></img>
              이미지
            </label>
          </a>
          <a href="#">
            <label htmlFor="youtube-upload">
              <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/editorTab/youtubeIcon.png' className='iconImg'></img>
              동영상
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
    youtubeVideo.innerHTML = `<img class='image youtubeThumnail' src="https://img.youtube.com/vi/${youtubeCode[1]}/hqdefault.jpg" style='width: 20vw;'>`;
    document.getElementById(targetId).appendChild(youtubeVideo);
  }
}

