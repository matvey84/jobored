import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './current-vacanci-page.scss';
import VacancyItem from '../../components/vacancy-item/VacancyItem';
import NoFavoriteVacancyMessage from '../../components/nofavoriteVanacy/NoFavoriteVacancyMessage';
import { fetchGetCurrentVacancy } from '../../redux/data-slice/dataFetchRequest';
import Loader from '../../components/loader/Loader';

function CurrentVacancyPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentVacancy = useAppSelector((state) => state.dataSlice.currentVacancy);
  const spinnerStatus = useAppSelector((state) => state.dataSlice.spinnerStatus);

  useEffect(() => {
    dispatch(fetchGetCurrentVacancy(id!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createMarkup = useCallback(() => {
    return { __html: currentVacancy!.vacancyRichText! };
  }, [currentVacancy]);

  return (
    <section className="page current-vacancy-page">
      {!spinnerStatus ? (
        <>
          <div className="current-vacancy-page-container">
            {!!currentVacancy! ? <VacancyItem data={currentVacancy!} /> : <></>}
            {!!currentVacancy!.vacancyRichText ? (
              <section
                dangerouslySetInnerHTML={createMarkup()}
                className="current-vacancy-page_vacancy-description"
              ></section>
            ) : (
              <section className="current-vacancy-page_vacancy-description">
                <NoFavoriteVacancyMessage />
              </section>
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default CurrentVacancyPage;
