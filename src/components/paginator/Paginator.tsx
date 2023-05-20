import './paginator-style.scss';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createAllButtonsNumberNote } from '../../redux/handlers/handlers';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFirstAndLastPaginationPages } from '../../redux/paginator-slice/paginationStateSlice';
import PageButtonList from './PageButtonList';
import PaginationArrowButton from '../../ui/buttons/PaginationArrowButton';
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
  const firstAndLastPaginationPages = useAppSelector(
    (state) => state.paginationStateSlice.firstAndLastPaginationPages
  );

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
        <PaginationArrowButton
          id={'left-arrow'}
          contexClass={'left-arrow'}
          numIndex={numIndex}
          disabled={disabledLeftArrow}
        />
        {buttonCreate().length ? (
          <PageButtonList
            numIndex={numIndex}
            pagesAmmount={pagesAmmount}
            buttonCreate={buttonCreate}
          />
        ) : (
          <></>
        )}
        <PaginationArrowButton
          id={'right-arrow'}
          contexClass={'right-arrow'}
          numIndex={numIndex}
          disabled={disabledRightArrow}
        />
      </div>
    </div>
  );
}
export default Paginator;
