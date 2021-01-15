import React from 'react';

import { useObserver } from 'mobx-react-lite';
import { useAppStore } from '../../state/appContext';

export default function AdminAddBtn() {
  const appStore = useAppStore();

  return (
    <button id='addBtn' onClick={() => {
      appStore.setEditState(false);
      window.location = '/admin/edit';
    }}>
      <img id='addFileIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/add-file.png' />
    </button> 
  )
}