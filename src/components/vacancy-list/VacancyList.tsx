import React from 'react';
import VacancyItem from '../vacancy-item/VacancyItem';
import { nanoid } from '@reduxjs/toolkit';
import { IVacansy } from '../../types/vacancyTypes';

interface IProp {
  vacancyData: IVacansy[];
}
function VacancyList(props: IProp) {
  const { vacancyData } = props;

  return (
    <div className="vacancy-list__wrapper">
      <section className="main-page_vacancy-list">
        {vacancyData.map((vacancy) => (
          <VacancyItem key={nanoid()} data={vacancy} />
        ))}
      </section>
    </div>
  );
}

export default VacancyList;
