import { nanoid } from 'nanoid';
import React, { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setCurrentPageForFavoritePage,
  setCurrentPage,
} from '../../redux/paginator-slice/paginationStateSlice';
import { IFetchQuery } from '../../types/requestTypes';
import { queryString2 } from '../../redux/handlers/handlers';
import { setFetchQuery } from '../../redux/data-slice/dataSlice';

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

  const [hilightButton, setHiligthButton] = useState<number>(0);
  const fetchQuery = useAppSelector((state) => state.dataSlice.fetchQuery);

  const createPaginationQueryForFetch = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fetchQueryData: IFetchQuery = {
      ...fetchQuery,
    };

    fetchQueryData.page = Number(e.currentTarget.id);

    location.pathname.includes('favorite') &&
      dispatch(setCurrentPageForFavoritePage(Number(e.currentTarget.id)));

    !location.pathname.includes('favorite') && dispatch(setCurrentPage(Number(e.currentTarget.id)));

    dispatch(setFetchQuery(fetchQueryData));

    dispatch(fetchGetVacancy(queryString2(fetchQueryData)));
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
