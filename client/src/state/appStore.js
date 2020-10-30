// import { createContext } from 'react';
// import { observable, computed, action } from 'mobx';


// export default class createStore {
//   @observable isEdit = false;
//   @observable selectedId = -1;
//   @observable selectedCategory = 0;
//   @observable selectedDetail = 0;

//   @action 
// setEditState = (boolean, id) => {
//     this.isEdit = boolean;
//     this.selectedId = id ? id : this.selectedId;
//   }
  // @action 
  // setVideoList = (category, detail) => {
  //   this.selectedCategory = category
  //   this.selectedDetail = detail
  //   console.log('set', this.selectedCategory, this.selectedDetail)
  // }
// }

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