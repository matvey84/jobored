import React from 'react';
import './mainPage.scss';
import MainPageSearchForm from '../../components/main-page-search-form/MainPageSearchForm';
import VacancyList from '../../components/vacancy-list/VacancyList';

function MainPage() {
  return (
    <section className="page main-page">
      <div className="container main-page_container">
        <form className="main-page_form-block"></form>
        <section className="main-page_vacancy-block">
          <MainPageSearchForm />
          <VacancyList />
        </section>
      </div>
    </section>
  );
}

export default MainPage;
