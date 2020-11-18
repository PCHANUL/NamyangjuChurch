export const commandPos = {
  B: 0,
  I: 1,
  U: 2,
  align: {
    left: 3,
    center: 4,
    right: 5,
  },
  UL: 6,
  OL: 7,
  H1: 0,
  H3: 0,
  H6: 0
}

export const paragraphCommands = {
  P: '본문',
  H1: '제목', 
  H3: '부제목', 
  H6: '소제목', 
}

export const commands = [
  // {
  //   cmd: 'insertOrderedList',
  //   icon: '서체',
  //   style: 'font-family'
  // },
  // {
  //   cmd: 'increaseFontSize',
  //   icon: '크기',
  //   style: 'font-size'
  //   // val: 3,
  // },
  {
    cmd: 'bold',
    icon: '굵게',
    src: 'bold',
    style: 'B'
  },
  {
    cmd: 'italic',
    icon: '이텔릭체',
    src: 'italic',
    style: 'I'
  },
  {
    cmd: 'underline',
    icon: '밑줄',
    src: 'underline',
    style: 'U'
  },
  {
    cmd: 'justifyLeft',
    icon: '좌측정렬',
    src: 'align-left',
    style: 'text-align: left;'
  },
  {
    cmd: 'justifycenter',
    icon: '가운데정렬',
    src: 'align-center',
    style: 'text-align: center;'
  },
  {
    cmd: 'justifyRight',
    icon: '우측정렬',
    src: 'align-right',
    style: 'text-align: right;'
  },
  {
    cmd: 'insertUnorderedList',
    icon: '목록',
    src: 'dotList',
    style: 'UL'
  },
  {
    cmd: 'insertOrderedList',
    icon: '숫자목록',
    src: 'numList',
    style: 'OL'
  },
  
  {
    cmd: 'createLink',
    icon: '링크',
    src: 'link',
  },
  // {
  //   cmd: 'insertImage',
  //   icon: '이미지추가',
  //   val: 'client/src/images/add-file.png'
  // },
  // {
  //   cmd: 'fontSize',
  //   icon: '크기',
  //   val: '10',
  //   src: 'format-size',
  // },
  // {
  //   cmd: 'formatBlock',
  //   icon: '제목',
  //   val: 'H1',
  //   src: 'header-1',
  // },
  // {
  //   cmd: 'formatBlock',
  //   icon: '제목',
  //   val: 'H2',
  //   src: 'header-2',
  // },
  // {
  //   cmd: 'formatBlock',
  //   icon: '부제목',
  //   val: 'H3',
  //   src: 'header-3',
  // },

 
 
  
 
]