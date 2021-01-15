// 데이터 임시저장 관련 함수
export const saveTempData = async() => {
  const category = document.querySelector('#selectCategory').value;
  const title = document.querySelector('#inputTitle').value;
  const verse = document.querySelector('#inputVerse').value;
  const content = document.getElementById('editFrame').innerHTML;
  const contentDate = document.getElementById('inputDate').value;

  localStorage.setItem('category_edit', `${category}`);
  localStorage.setItem('title_edit', `${title}`);
  localStorage.setItem('contentDate_edit', `${contentDate}`);
  localStorage.setItem('content_edit', `${content}`);
  localStorage.setItem('time_edit', `${new Date()}`);
  localStorage.setItem('verse_edit', `${verse}`);

  console.log('내용이 자동으로 임시저장되었습니다.');
}

export const getTempData = () => {
  let category = localStorage.getItem('category_edit');
  let title = localStorage.getItem('title_edit');
  let verse = localStorage.getItem('verse_edit');
  let contentDate = localStorage.getItem('contentDate_edit');
  let content = localStorage.getItem('content_edit');
  let time = localStorage.getItem('time_edit');

  if (category || title || verse || content) {
    if (window.confirm(`${time}에 저장된 데이터를 가져오시겠습니까?`)) {
      document.querySelector('#selectCategory').value = category;
      document.querySelector('#inputTitle').value = title;
      document.querySelector('#inputVerse').value = verse;
      document.querySelector('#inputDate').value = contentDate;
      document.querySelector('#editFrame').insertAdjacentHTML('beforeend', content);
    }
  }
}

export const deleteTempData = () => {
  localStorage.removeItem('category');
  localStorage.removeItem('title');
  localStorage.removeItem('verse');
  localStorage.removeItem('content');
  localStorage.removeItem('time');
}

