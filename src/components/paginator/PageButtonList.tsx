import { nanoid } from 'nanoid';
import React, { memo, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setCurrentPageForFavoritePage,
  setCurrentPage,
  setPaginationFetchQuery,
} from '../../redux/paginator-slice/paginationStateSlice';
import { IFetchQueryVacancyRequest, ISearchQueryParams } from '../../types/requestTypes';
import { queryString } from '../../redux/handlers/handlers';

interface IProp {
  numIndex: number;
  pagesAmmount: number;
  buttonCreate: () => number[][];
}

const PageButtonList = memo((props: IProp) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { numIndex, buttonCreate } = props;
  const currentPage = useAppSelector((state) => state.paginationStateSlice.currentPage);
  const currentPageForFavoritePage = useAppSelector(
    (state) => state.paginationStateSlice.currentPageForFavoritePage
  );
  const user = useAppSelector((state) => state.userSlice.user);
  const token = useAppSelector((state) => state.userSlice.access_token);
  const paginationData = useAppSelector((state) => state.paginationStateSlice.paginationFetchQuery);
  const [hilightButton, setHiligthButton] = useState<number>(0);
  const [_, setSearchParams] = useSearchParams();
  const searchVacancie = useAppSelector((state) => state.dataSlice.searchVacancie);

  const createPaginationQueryForFetch = (e: React.MouseEvent<HTMLButtonElement>) => {
    const paginationQuery: IFetchQueryVacancyRequest = {
      x_api_app_id: user.client_secret,
      token,
      paginationData,
    };
    paginationQuery.paginationData = {
      ...paginationQuery.paginationData,
      page: e.currentTarget.id,
    };

    const searchQueryParams: ISearchQueryParams = {
      keyword: searchVacancie,
      page: String(paginationQuery.paginationData.page),
    };

    location.pathname.includes('favorite') &&
      dispatch(setCurrentPageForFavoritePage(Number(e.currentTarget.id)));

    !location.pathname.includes('favorite') && dispatch(setCurrentPage(Number(e.currentTarget.id)));
    dispatch(setPaginationFetchQuery(paginationQuery.paginationData));

    !!searchVacancie
      ? dispatch(fetchGetVacancy(queryString(searchQueryParams)))
      : dispatch(fetchGetVacancy(queryString(paginationQuery.paginationData)));
    setSearchParams(searchQueryParams);
  };
  useEffect(
    () =>
      location.pathname.includes('favorite')
        ? setHiligthButton(currentPageForFavoritePage)
        : setHiligthButton(currentPage),
    [currentPage, currentPageForFavoritePage, location.pathname]
  );
  return (
    <>
      {!!buttonCreate().length ? (
        buttonCreate()[numIndex].map((item) => (
          <button
            className="btn-page"
            key={nanoid()}
            id={String(item)}
            disabled={item === hilightButton ? true : false}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => createPaginationQueryForFetch(e)}
          >
            <span id={String(item)} className="btn-page-text">
              {item}
            </span>
          </button>
        ))
      ) : (
        <></>
      )}
    </>
  );
});
export default PageButtonList;
