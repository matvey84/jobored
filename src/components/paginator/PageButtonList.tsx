import { nanoid } from 'nanoid';
import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setCurrentPage,
  setPaginationFetchQuery,
} from '../../redux/paginator-slice/paginationStateSlice';
import { IFetchQueryVacancyRequest } from '../../types/requestTypes';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';

interface IProp {
  numIndex: number;
  totalVacancies: number;
  pagesAmmount: number;
  buttonCreate: () => number[][];
}

const PageButtonList = memo((props: IProp) => {
  const dispatch = useAppDispatch();
  const { numIndex, buttonCreate } = props;
  const currentPage = useAppSelector((state) => state.paginationStateSlice.currentPage);
  const user = useAppSelector((state) => state.userSlice.user);
  const token = useAppSelector((state) => state.userSlice.access_token);
  const paginationData = useAppSelector((state) => state.paginationStateSlice.paginationFetchQuery);

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

  return (
    <>
      {buttonCreate()[numIndex].map((item) => (
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
});
export default PageButtonList;
