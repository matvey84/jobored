import React from 'react';
import VacancyItem from '../vacancy-item/VacancyItem';
import { nanoid } from '@reduxjs/toolkit';
import { IVacansy } from '../../types/vacancyTypes';
import NoFavoriteVacancyMessage from '../nofavoriteVanacy/NoFavoriteVacancyMessage';
import Loader from '../loader/Loader';

interface IProp {
  vacancyData: IVacansy[];
  spinnerStatus?: boolean;
}
function VacancyList(props: IProp) {
  const { vacancyData, spinnerStatus } = props;

  return (
    <div className="vacancy-list__wrapper">
      <section className="main-page_vacancy-list">
        {spinnerStatus ? (
          <Loader />
        ) : !vacancyData.length ? (
          <NoFavoriteVacancyMessage />
        ) : (
          vacancyData.map((vacancy) => <VacancyItem key={nanoid()} data={vacancy} />)
        )}
      </section>
    </div>
  );
}

export default VacancyList;
