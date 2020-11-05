export function createStore() {
  return {
    isEdit: false,
    selected: -1,
    selectedCategory: 0,
    selectedDetail: 0,
    
    setVideoList(category, detail) {
      this.selectedCategory = category
      this.selectedDetail = detail
    },
    setEditState(boolean, id) {
      this.isEdit = boolean;
      this.selectedId = id ? id : this.selectedId;
    }
  }
}