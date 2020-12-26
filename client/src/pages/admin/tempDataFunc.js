// 데이터 임시저장 관련 함수
export const saveTempData = async() => {
  const category = document.querySelector('#selectCategory').value;
  const title = document.querySelector('#inputTitle').value;
  const content = document.getElementById('editFrame').innerHTML;
  const contentDate = document.getElementById('inputDate').value;

  localStorage.setItem('category', `${category}`);
  localStorage.setItem('title', `${title}`);
  localStorage.setItem('contentDate', `${contentDate}`);
  localStorage.setItem('content', `${content}`);
  localStorage.setItem('time', `${new Date()}`);

  console.log('내용이 자동으로 임시저장되었습니다.');
}

export const getTempData = () => {
  let category = localStorage.getItem('category');
  let title = localStorage.getItem('title');
  let contentDate = localStorage.getItem('contentDate');
  let content = localStorage.getItem('content');
  let time = localStorage.getItem('time');

  if (category || title || content) {
    if (window.confirm(`${time}에 저장된 데이터를 가져오시겠습니까?`)) {
      document.querySelector('#selectCategory').value = category;
      document.querySelector('#inputTitle').value = title;
      document.querySelector('#inputDate').value = contentDate;
      document.querySelector('#editFrame').insertAdjacentHTML('beforeend', content);
    }
  }
}

export const deleteTempData = () => {
  localStorage.removeItem('category');
  localStorage.removeItem('title');
  localStorage.removeItem('content');
  localStorage.removeItem('time');
}

