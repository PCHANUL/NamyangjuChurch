import React from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

// component
import PageSelect from './PageSelect';
import FilterContent from './FilterContent';
import SelectNumberOfData from './SelectNumberOfData';
import ContentList from './ContentList';

import './contentListPage.css';
import '../responsibleCSS/mobileContentListPage.css';

export default function ContentListPage() {
  const appStore = useAppStore();
  
  return useObserver(() => (
    <div id='contentListPage'>
      <FilterContent />
      <ContentList />

      <div id='pageOptionDiv'>
        <PageSelect />
        <SelectNumberOfData 
          changeMethod={appStore.setNumberOfData} 
        />
      </div>
    </div>
  ))
}
















