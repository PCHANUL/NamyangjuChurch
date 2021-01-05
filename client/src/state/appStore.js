import { getContent, getDataList, getBibleVerse } from '../pages/axiosRequest';

export function createStore() {
  return {
    isEdit: false,
    selected: -1,

    // content option
    selectedCategory: 0,
    selectedDetail: 0,
    page: 1,
    dataLength: 0,
    

    setVideoList(category, detail) {
      this.selectedCategory = category
      this.selectedDetail = detail
    },
    setEditState(boolean, id) {
      this.isEdit = boolean;
      this.selectedId = id ? id : this.selectedId;
    },

    filterContentList(data) {
      let filtered = data.filter((_, i) => this.page * 15 > i && (this.page - 1) * 15 < i);
      return filtered;
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