import React, { useCallback, useEffect } from 'react';
import './mainPage.scss';
import MainPageSearchForm from '../../components/main-page-search-form/MainPageSearchForm';
import VacancyList from '../../components/vacancy-list/VacancyList';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';
import Paginator from '../../components/paginator/Paginator';
import { IFetchQueryVacancyRequest } from '../../types/requestTypes';
import {
  setFirstAndLastPaginationPages,
  setPaginationFetchQuery,
} from '../../redux/paginator-slice/paginationStateSlice';
import Loader from '../../components/loader/Loader';
import { createAllButtonsNumberNote, queryString } from '../../redux/handlers/handlers';

function MainPage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.dataSlice.access_token);
  const user = useAppSelector((state) => state.userSlice.user);
  const pageCounter = useAppSelector((state) => state.dataSlice.pageCount);
  const paginationData = useAppSelector((state) => state.paginationStateSlice.paginationFetchQuery);
  const spinnerStatus = useAppSelector((state) => state.dataSlice.spinnerStatus);
  const vacancyData = useAppSelector((state) => state.dataSlice.data);
  const totalVacancies = useAppSelector((state) => state.dataSlice.totalVacancies);
  const numIndex = useAppSelector((state) => state.paginationStateSlice.numIndex);
  const pagesAmmount = useAppSelector((state) => state.dataSlice.pagesAmount);
  const searchVacancie = useAppSelector((state) => state.dataSlice.searchVacancie);

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

  useEffect(() => {
    const queryObject: IFetchQueryVacancyRequest = {
      x_api_app_id: user.client_secret,
      token,
      paginationData: !!paginationData
        ? paginationData
        : {
            page: 1,
            count: pageCounter,
          },
    };

    !!searchVacancie
      ? dispatch(
          fetchGetVacancy(
            queryString({
              keyword: searchVacancie,
              page: String(paginationData.page),
            })
          )
        )
      : dispatch(fetchGetVacancy(queryString(queryObject.paginationData)));
    dispatch(setPaginationFetchQuery(queryObject.paginationData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="page main-page">
      <div className="container main-page_container">
        <form className="main-page_form-block"></form>
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
