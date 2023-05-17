import './paginator-style.scss';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';
import { createAllButtonsNumberNote, queryString } from '../../redux/handlers/handlers';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setNumIndexFavoritePage,
  setNumIndex,
  setPaginationFetchQuery,
  setCurrentPageForFavoritePage,
  setCurrentPage,
  setFirstAndLastPaginationPages,
} from '../../redux/paginator-slice/paginationStateSlice';
import { IFetchQueryVacancyRequest, ISearchQueryParams } from '../../types/requestTypes';
import PageButtonList from './PageButtonList';
interface IProp {
  numIndex: number;
  pagesAmmount: number;
  totalVacancies: number;
  buttonCreate?: () => number[][];
}

function Paginator(props: IProp) {
  const { numIndex, pagesAmmount, totalVacancies } = props;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pageCounter = useAppSelector((state) => state.dataSlice.pageCount);
  const [disabledLeftArrow, setDisabledLeftArrow] = useState<boolean>(true);
  const [disabledRightArrow, setDisabledRightArrow] = useState<boolean>(false);
  const user = useAppSelector((state) => state.userSlice.user);
  const token = useAppSelector((state) => state.userSlice.access_token);
  const paginationData = useAppSelector((state) => state.paginationStateSlice.paginationFetchQuery);
  const firstAndLastPaginationPages = useAppSelector(
    (state) => state.paginationStateSlice.firstAndLastPaginationPages
  );
  const [_, setSearchParams] = useSearchParams();
  const searchVacancie = useAppSelector((state) => state.dataSlice.searchVacancie);

  const arrowButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const paginationQuery: IFetchQueryVacancyRequest = {
      x_api_app_id: user.client_secret,
      token,
      paginationData,
    };

    if (e.currentTarget.id === 'right-arrow') {
      location.pathname.includes('favorite')
        ? dispatch(setNumIndexFavoritePage(numIndex + 1))
        : dispatch(setNumIndex(numIndex + 1));

      paginationQuery.paginationData = {
        ...paginationQuery.paginationData,
        page: firstAndLastPaginationPages.lastPaginationPage + 1,
      };
    }

    if (e.currentTarget.id === 'left-arrow') {
      location.pathname.includes('favorite')
        ? dispatch(setNumIndexFavoritePage(numIndex - 1))
        : dispatch(setNumIndex(numIndex - 1));

      paginationQuery.paginationData = {
        ...paginationQuery.paginationData,
        page: firstAndLastPaginationPages.firstPaginationPage - 1,
      };
    }

    !location.pathname.includes('favorite') &&
      dispatch(fetchGetVacancy(queryString(paginationQuery.paginationData)));

    dispatch(setPaginationFetchQuery(paginationQuery.paginationData));

    location.pathname.includes('favorite') &&
      dispatch(setCurrentPageForFavoritePage(Number(paginationQuery.paginationData.page)));

    !location.pathname.includes('favorite') &&
      dispatch(setCurrentPage(Number(paginationQuery.paginationData.page)));

    const searchQueryParams: ISearchQueryParams = {
      keyword: searchVacancie,
      page: String(paginationQuery.paginationData.page),
    };

    !!searchVacancie && dispatch(fetchGetVacancy(queryString(searchQueryParams)));
    setSearchParams(searchQueryParams);
  };

  const buttonCreate = useCallback(() => {
    return createAllButtonsNumberNote(pagesAmmount, numIndex);
  }, [numIndex, pagesAmmount]);

  useEffect(() => {
    const firstAndLastPaginationPages = {
      firstPaginationPage: Math.min(...buttonCreate()[numIndex]),
      lastPaginationPage: Math.max(...buttonCreate()[numIndex]),
    };

    dispatch(setFirstAndLastPaginationPages(firstAndLastPaginationPages));
  }, [buttonCreate, dispatch, location.pathname, numIndex]);

  useEffect(() => {
    setDisabledLeftArrow(firstAndLastPaginationPages.firstPaginationPage - 1 <= 1);
    setDisabledRightArrow(
      (firstAndLastPaginationPages.lastPaginationPage - 1) * Number(pageCounter) >=
        totalVacancies - Number(pageCounter)
    );
  }, [
    totalVacancies,
    firstAndLastPaginationPages.lastPaginationPage,
    location.pathname,
    numIndex,
    pageCounter,
    firstAndLastPaginationPages.firstPaginationPage,
  ]);

  return (
    <div className="paginator-wrapper">
      <div className="paginator">
        <button
          id="left-arrow"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => arrowButtonHandler(e)}
          className="btn-arrow left-arrow"
          disabled={disabledLeftArrow}
        >
          <span className={`btn-page-text`}>&larr;</span>
        </button>
        {buttonCreate().length ? (
          <PageButtonList
            numIndex={numIndex}
            pagesAmmount={pagesAmmount}
            buttonCreate={buttonCreate}
          />
        ) : (
          <></>
        )}
        <button
          id="right-arrow"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => arrowButtonHandler(e)}
          className="btn-arrow  right-arrow"
          disabled={disabledRightArrow}
        >
          <span className="btn-page-text">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
export default Paginator;
