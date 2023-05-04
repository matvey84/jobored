import React from 'react';
import VacancyItem from '../vacancy-item/VacancyItem';

function VacancyList() {
  return (
    <section className="main-page_vacancy_list">
      <VacancyItem />
      <VacancyItem />
      <VacancyItem />
      <VacancyItem />
    </section>
  );
}

export default VacancyList;
