import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import VacancyList from '../../components/vacancy-list/VacancyList';
import './favoritePage.scss';
import Paginator from '../../components/paginator/Paginator';
import { IVacansy } from '../../types/vacancyTypes';
import Loader from '../../components/loader/Loader';
import { favoriteVacancyListCreate } from '../../redux/handlers/handlers';

function FavoriteVacancyPage() {
  const numIndexFavoritePage = useAppSelector(
    (state) => state.paginationStateSlice.numIndexFavoritePage
  );

  const currentPageForFavoritePage = useAppSelector(
    (state) => state.paginationStateSlice.currentPageForFavoritePage
  );
  const pagesCount = useAppSelector((state) => state.dataSlice.pageCount);
  const favoriteVacancyes = useAppSelector((state) => state.dataSlice.favoriteVacancyList);
  const favoritePageButtonsAmount = useAppSelector(
    (state) => state.dataSlice.favoritePageButtonsAmount
  );
  const [curentPageVacancyData, seCurentPageVacancyData] = useState<IVacansy[]>([]);
  const [spinnerStatus, setSpinnerStatus] = useState<boolean>(false);

  const buttonCreateVacancyList = useCallback(() => {
    return favoriteVacancyListCreate(favoriteVacancyes, pagesCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteVacancyes]);

  useEffect(() => {
    setSpinnerStatus(true);
    const res = !!favoriteVacancyes.length
      ? buttonCreateVacancyList()[currentPageForFavoritePage - 1]
      : favoriteVacancyes;
    seCurentPageVacancyData(res);
    setSpinnerStatus(false);
  }, [
    buttonCreateVacancyList,
    currentPageForFavoritePage,
    favoriteVacancyes,
    numIndexFavoritePage,
  ]);

  return (
    <section className="page favorite-vacancy-page">
      <div className="container favorite-vacancy-page-container">
        {spinnerStatus && <Loader />}
        {!spinnerStatus && (
          <VacancyList vacancyData={curentPageVacancyData} spinnerStatus={spinnerStatus} />
        )}
        {!!favoriteVacancyes.length ? (
          <Paginator
            numIndex={numIndexFavoritePage}
            pagesAmmount={favoritePageButtonsAmount}
            totalVacancies={favoriteVacancyes.length}
          />
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}

export default FavoriteVacancyPage;
