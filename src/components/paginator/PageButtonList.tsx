import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setCurrentPage,
  setFirstAndLastPaginationPages,
  setPaginationFetchQuery,
} from '../../redux/paginator-slice/paginationStateSlice';
import { IFetchQueryVacancyRequest } from '../../types/requestTypes';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';

interface IProp {
  numIndex: number;
  totalVacancies: number;
  pagesAmmount: number;
}

export default function PageButtonList(props: IProp) {
  const dispatch = useAppDispatch();
  const { numIndex, pagesAmmount, totalVacancies } = props;
  const currentPage = useAppSelector((state) => state.paginationStateSlice.currentPage);
  const user = useAppSelector((state) => state.userSlice.user);
  const token = useAppSelector((state) => state.userSlice.access_token);
  const paginationData = useAppSelector((state) => state.paginationStateSlice.paginationFetchQuery);

  const allPagesNumber: number[] = [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const totalNumPagesArr: number[][] = [];
  const pageVisibleAmount = 3;

  for (let i = 0; i <= totalVacancies; i++) {
    allPagesNumber.push(i + 1);
  }
  const totalAmountPages = Math.ceil(allPagesNumber.length / 100);
  for (let j = 0; j <= totalAmountPages; j++) {
    totalNumPagesArr.push(allPagesNumber.splice(0, pageVisibleAmount));
  }

  const remainder = (numIndex + 1) * pageVisibleAmount - pagesAmmount;
  if (numIndex + 1 === totalAmountPages) {
    totalNumPagesArr[numIndex].splice(0 - remainder, remainder);
  }

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

    dispatch(setCurrentPage(Number(e.currentTarget.id)));
    dispatch(setPaginationFetchQuery(paginationQuery.paginationData));
    dispatch(fetchGetVacancy(paginationQuery));
  };

  useEffect(() => {
    const firstAndLastPaginationPages = {
      firstPaginationPage: Math.min(...totalNumPagesArr[numIndex]),
      lastPaginationPage: Math.max(...totalNumPagesArr[numIndex]),
    };

    dispatch(setFirstAndLastPaginationPages(firstAndLastPaginationPages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, numIndex]);

  return (
    <>
      {totalNumPagesArr[numIndex].map((item) => (
        <button
          className="btn-page"
          key={nanoid()}
          id={String(item)}
          disabled={item === currentPage ? true : false}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => createPaginationQueryForFetch(e)}
        >
          <span id={String(item)} className="btn-page-text">
            {item}
          </span>
        </button>
      ))}
    </>
  );
}
