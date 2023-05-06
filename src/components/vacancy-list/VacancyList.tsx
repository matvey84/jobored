import React from 'react';
import VacancyItem from '../vacancy-item/VacancyItem';
import { useAppSelector } from '../../redux/hooks';
import { nanoid } from '@reduxjs/toolkit';

function VacancyList() {
  const vacancyData = useAppSelector((state) => state.dataSlice.data);
  return (
    <div className="vacancy-list__wrapper">
      <section className="main-page_vacancy-list">
        {vacancyData.map((vacancy) => (
          <VacancyItem key={nanoid()} data={vacancy} />
        ))}
        {/* <VacancyItem />
      <VacancyItem />
      <VacancyItem />
      <VacancyItem /> */}
      </section>
    </div>
  );
}

export default VacancyList;
