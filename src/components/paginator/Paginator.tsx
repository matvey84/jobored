import './paginator-style.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import PageButtonList from './PageButtonList';
import { useCallback, useEffect, useState } from 'react';
import {
  setCurrentPage,
  setFirstAndLastPaginationPages,
  setNumIndex,
  setPaginationFetchQuery,
} from '../../redux/paginator-slice/paginationStateSlice';
import { IFetchQueryVacancyRequest } from '../../types/requestTypes';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';
import { createAllButtonsNumberNote } from '../../redux/handlers/handlers';

function Paginator() {
  const dispatch = useAppDispatch();
  const pagesAmmount = useAppSelector((state) => state.dataSlice.pagesAmount);
  const pageCounter = useAppSelector((state) => state.dataSlice.pageCount);
  const [disabledLeftArrow, setDisabledLeftArrow] = useState<boolean>(true);
  const [disabledRightArrow, setDisabledRightArrow] = useState<boolean>(false);
  const numIndex = useAppSelector((state) => state.paginationStateSlice.numIndex);
  const totalVacancies = useAppSelector((state) => state.dataSlice.totalVacancies);
  const user = useAppSelector((state) => state.userSlice.user);
  const token = useAppSelector((state) => state.userSlice.access_token);
  const paginationData = useAppSelector((state) => state.paginationStateSlice.paginationFetchQuery);
  const firstAndLastPaginationPages = useAppSelector(
    (state) => state.paginationStateSlice.firstAndLastPaginationPages
  );

  const arrowButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const paginationQuery: IFetchQueryVacancyRequest = {
      x_api_app_id: user.client_secret,
      token,
      paginationData,
    };

    if (e.currentTarget.id === 'right-arrow') {
      dispatch(setNumIndex(numIndex + 1));

      paginationQuery.paginationData = {
        ...paginationQuery.paginationData,
        page: firstAndLastPaginationPages.lastPaginationPage + 1,
      };
    }

    if (e.currentTarget.id === 'left-arrow') {
      dispatch(setNumIndex(numIndex - 1));

      paginationQuery.paginationData = {
        ...paginationQuery.paginationData,
        page: firstAndLastPaginationPages.firstPaginationPage - 1,
      };
    }

    dispatch(fetchGetVacancy(paginationQuery));
    dispatch(setPaginationFetchQuery(paginationQuery.paginationData));
    dispatch(setCurrentPage(Number(paginationQuery.paginationData.page)));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const buttonCreate = useCallback(
    () => createAllButtonsNumberNote(pagesAmmount, numIndex),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalVacancies]
  );

  useEffect(() => {
    setDisabledLeftArrow(numIndex + 1 <= 1);
    setDisabledRightArrow(numIndex * Number(pageCounter) >= pagesAmmount - Number(pageCounter));
  }, [numIndex, pageCounter, pagesAmmount]);

  useEffect(() => {
    const firstAndLastPaginationPages = {
      firstPaginationPage: Math.min(...buttonCreate()[numIndex]),
      lastPaginationPage: Math.max(...buttonCreate()[numIndex]),
    };

    dispatch(setFirstAndLastPaginationPages(firstAndLastPaginationPages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, numIndex]);

  return (
    <div className="paginator-wrapper">
      <div className="page-counter-wrapper">
        {/* <span className="page-counter">Total pages: {maxLimitPages}</span> */}
      </div>
      <div className="paginator">
        <button
          id="left-arrow"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => arrowButtonHandler(e)}
          className="btn-arrow left-arrow"
          disabled={disabledLeftArrow}
        >
          <span className={`btn-page-text`}>&larr;</span>
        </button>
        {
          <PageButtonList
            numIndex={numIndex}
            pagesAmmount={pagesAmmount}
            totalVacancies={totalVacancies}
            buttonCreate={buttonCreate}
          />
        }
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
