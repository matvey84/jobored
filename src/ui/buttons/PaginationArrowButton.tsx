import React, { useEffect, useState } from 'react';
import PaginationArrowSVG from '../PaginationArrowSVG';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';
import { setFetchQuery } from '../../redux/data-slice/dataSlice';
import { queryString2 } from '../../redux/handlers/handlers';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setNumIndexFavoritePage,
  setNumIndex,
  setCurrentPageForFavoritePage,
  setCurrentPage,
} from '../../redux/paginator-slice/paginationStateSlice';
import { IFetchQuery } from '../../types/requestTypes';
interface IProp {
  id: string;
  contexClass: string;
  numIndex: number;
  // pagesAmmount: number;
  // totalVacancies: number;
  disabled: boolean;
}
const PaginationArrowButton = (props: IProp) => {
  const { id, contexClass, numIndex, disabled } = props;

  const dispatch = useAppDispatch();
  const location = useLocation();
  // const pageCounter = useAppSelector((state) => state.dataSlice.pageCount);
  // const [disabledLeftArrow, setDisabledLeftArrow] = useState<boolean>(true);
  // const [disabledRightArrow, setDisabledRightArrow] = useState<boolean>(false);
  const firstAndLastPaginationPages = useAppSelector(
    (state) => state.paginationStateSlice.firstAndLastPaginationPages
  );
  const [_, setSearchParams] = useSearchParams();
  const fetchQuery = useAppSelector((state) => state.dataSlice.fetchQuery);

  const arrowButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fetchQueryData: IFetchQuery = {
      ...fetchQuery,
    };

    if (e.currentTarget.id === 'right-arrow') {
      location.pathname.includes('favorite')
        ? dispatch(setNumIndexFavoritePage(numIndex + 1))
        : dispatch(setNumIndex(numIndex + 1));

      fetchQueryData.page = firstAndLastPaginationPages.lastPaginationPage + 1;
    }

    if (e.currentTarget.id === 'left-arrow') {
      location.pathname.includes('favorite')
        ? dispatch(setNumIndexFavoritePage(numIndex - 1))
        : dispatch(setNumIndex(numIndex - 1));

      fetchQueryData.page = firstAndLastPaginationPages.firstPaginationPage - 1;
    }

    !location.pathname.includes('favorite') &&
      dispatch(fetchGetVacancy(queryString2(fetchQueryData)));
    dispatch(setFetchQuery(fetchQueryData));

    location.pathname.includes('favorite')
      ? dispatch(setCurrentPageForFavoritePage(Number(fetchQueryData.page)))
      : dispatch(setCurrentPage(Number(fetchQueryData.page)));

    setSearchParams(queryString2(fetchQueryData));
  };

  // useEffect(() => {
  //   setDisabledLeftArrow(firstAndLastPaginationPages.firstPaginationPage - 1 <= 1);
  //   setDisabledRightArrow(
  //     (firstAndLastPaginationPages.lastPaginationPage - 1) * Number(pageCounter) >=
  //       totalVacancies - Number(pageCounter)
  //   );
  // }, [
  //   totalVacancies,
  //   firstAndLastPaginationPages.lastPaginationPage,
  //   location.pathname,
  //   numIndex,
  //   pageCounter,
  //   firstAndLastPaginationPages.firstPaginationPage,
  // ]);

  return (
    <button
      className={`btn-arrow ${contexClass}`}
      id={id}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => arrowButtonHandler(e)}
      disabled={disabled}
    >
      <PaginationArrowSVG disabled={disabled} />
    </button>
  );
};

export default PaginationArrowButton;
