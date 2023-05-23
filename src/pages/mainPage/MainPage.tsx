import React, { useCallback, useEffect } from 'react';
import './mainPage.scss';
import MainPageSearchForm from '../../components/main-page-search-form/MainPageSearchForm';
import VacancyList from '../../components/vacancy-list/VacancyList';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';
import Paginator from '../../components/paginator/Paginator';
import { IFetchQuery } from '../../types/requestTypes';
import { setFirstAndLastPaginationPages } from '../../redux/paginator-slice/paginationStateSlice';
import Loader from '../../components/loader/Loader';
import { createAllButtonsNumberNote, queryString2 } from '../../redux/handlers/handlers';
import FilterForm from '../../components/filter-form/FilterForm';

function MainPage() {
  const dispatch = useAppDispatch();
  const spinnerStatus = useAppSelector((state) => state.dataSlice.spinnerStatus);
  const vacancyData = useAppSelector((state) => state.dataSlice.data);
  const totalVacancies = useAppSelector((state) => state.dataSlice.totalVacancies);
  const numIndex = useAppSelector((state) => state.paginationStateSlice.numIndex);
  const pagesAmmount = useAppSelector((state) => state.dataSlice.pagesAmount);
  const fetchQueryData = useAppSelector((state) => state.dataSlice.fetchQuery);

  useEffect(() => {
    const fetchQueryMoc: IFetchQuery = {
      published: 1,
      page: 1,
      keyword: '',
    };
    !!fetchQueryData
      ? dispatch(fetchGetVacancy(queryString2(fetchQueryData)))
      : dispatch(fetchGetVacancy(queryString2(fetchQueryMoc)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buttonCreate = useCallback(() => {
    return createAllButtonsNumberNote(pagesAmmount, numIndex);
  }, [numIndex, pagesAmmount]);

  useEffect(() => {
    const firstAndLastPaginationPages = {
      firstPaginationPage: Math.min(...buttonCreate()[numIndex]),
      lastPaginationPage: Math.max(...buttonCreate()[numIndex]),
    };
    dispatch(setFirstAndLastPaginationPages(firstAndLastPaginationPages));
  }, [buttonCreate, dispatch, numIndex]);

  return (
    <section className="page main-page">
      <div className="main-page_container">
        <FilterForm />
        <section className="main-page_vacancy-block">
          {spinnerStatus && <Loader />}
          <MainPageSearchForm />
          <VacancyList vacancyData={vacancyData} />
          {!!vacancyData.length ? (
            <Paginator
              numIndex={numIndex}
              pagesAmmount={pagesAmmount}
              totalVacancies={totalVacancies}
            />
          ) : (
            <></>
          )}
        </section>
      </div>
    </section>
  );
}

export default MainPage;
