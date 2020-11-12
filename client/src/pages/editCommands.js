export const commandPos = {
  family: 1,
  size: 2,
  B: 3,
  I: 4,
  U: 5,
  align: {
    left: 6,
    center: 7,
    right: 8,
  },
  UL: 9,
  OL: 10
}

export const commands = [
  {
    cmd: 'insertOrderedList',
    icon: '서체',
    style: 'font-family'
  },
  {
    cmd: 'increaseFontSize',
    icon: '크기',
    style: 'font-size'
    // val: 3,
  },
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