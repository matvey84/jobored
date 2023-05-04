import React from 'react';
import './mainPageSearchForm.scss';
import SearchFormInputGlass from '../../ui/SearchFormInputGlass';

function MainPageSearchForm() {
  return (
    <form className="main-page_search-form">
      <SearchFormInputGlass />
      <input className="main-page_search-form__input" type="text" />
      <button className="main-page_search-form__submit-button">Поиск</button>
    </form>
  );
}

export default MainPageSearchForm;
