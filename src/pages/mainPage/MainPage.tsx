import React, { useEffect } from 'react';
import './mainPage.scss';
import MainPageSearchForm from '../../components/main-page-search-form/MainPageSearchForm';
import VacancyList from '../../components/vacancy-list/VacancyList';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';

function MainPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice);
  useEffect(() => {
    dispatch(fetchGetVacancy(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
