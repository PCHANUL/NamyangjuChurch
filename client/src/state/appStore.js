import { makeObservable, observable, action } from 'mobx';
import { createContext } from 'react';

class createStore {
  @observable 
  selectedId = -1;
  isEdit = false;

  @action
  setEditState(boolean, id) {
    this.isEdit = boolean;
    this.selectedId = id ? id : this.selectedId;
  }

}

export const storeContext = createContext(new createStore());

