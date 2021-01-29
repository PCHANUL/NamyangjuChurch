import React from 'react';

import { useObserver } from 'mobx-react';

// component
import PageSelect from './PageSelect';
import FilterContent from './FilterContent';
import SelectNumberOfData from './SelectNumberOfData';
import ContentList from './ContentList';

import './contentListPage.css';
import '../responsibleCSS/mobileContentListPage.css';

export default function ContentListPage() {
  return (
    <div id='contentListPage'>
      <FilterContent />
      <ContentList />
      <PageOption />
    </div>
  )
}

function PageOption() {
  return (
    <div id='pageOptionDiv'>
      <PageSelect />
      <SelectNumberOfData />
    </div>
  )
}
















