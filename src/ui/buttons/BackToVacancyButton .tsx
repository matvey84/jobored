import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../components/nofavoriteVanacy/noFavoriteVacancy.scss';

const BackToVacancyButton = () => {
  return (
    <>
      <NavLink className="back-to-vacancy_button" to={'/'}>
        <h4 className="back-to-vacancy_button__title">Поиск Вакансий</h4>
      </NavLink>
    </>
  );
};

export default BackToVacancyButton;
