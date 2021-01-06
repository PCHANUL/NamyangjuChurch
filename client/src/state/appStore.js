import { getContent, getDataList, getBibleVerse } from '../pages/axiosRequest';
import { bibleVerse } from '../pages/ContentList/bibleVerse';

const getbibleBook = (str) => {
  for (let i in str) {
    if (Number(str[i])) {
      return [str.slice(0, i), i];
    }
  }
}

export function createStore() {
  return {
    isEdit: false,
    selected: -1,
    
    // data
    dataLength: 0,

    // content option
    selectedCategory: 0,
    selectedDetail: 0,
    page: 1,

    // filter
    search: '',
    searchError: false,

    // sort
    verse: 0,
    createdAt: 0,
    

    setVideoList(category, detail) {
      this.selectedCategory = category
      this.selectedDetail = detail
      this.page = 1;
    },
    setEditState(boolean, id) {
      this.isEdit = boolean;
      this.selectedId = id ? id : this.selectedId;
    },

    deleteSearch() {
      localStorage.removeItem('search');
      this.search = '';
    },

    filterContentList(data) {
      let filtered = 
      data
      .filter((ele) => ele.title.includes(this.search))
      .sort((a, b) => {                                  
        if (this.createdAt !== 0) {  // 날짜순
          return (Date.parse(a.createdAt) - Date.parse(b.createdAt)) * this.createdAt
        } else if (this.verse !== 0) {  // 성경순
          if (!a.verse || !b.verse) return 1;
            let verseA = getbibleBook(a.verse);
            let verseB = getbibleBook(b.verse);
            if (verseA[0] !== verseB[0]) {
              return (bibleVerse[verseA[0]] - bibleVerse[verseB[0]]) * this.verse;
            } else {
              return (a.verse.slice(Number(verseA[1]), a.verse.indexOf(':')) - b.verse.slice(Number(verseB[1]), b.verse.indexOf(':'))) * this.verse;
            }
          }
        }
      ); 
      
      // 검색어가 있고, data가 없다면 검색에러이다.
      if (this.search !== '' && filtered.length === 0) this.searchError = true;
      else this.searchError = false;
      
      this.dataLength = filtered.length;
      return filtered.filter((_, i) => (this.page - 1) * 15 <= i && i <= this.page * 15);
    },

    getContentList(callback) {
      getDataList(
        this.selectedCategory,
        this.selectedDetail,
        (result) => {
          this.dataLength = result.length;
          callback(this.filterContentList(result));
        }
      )
    }
  }
}