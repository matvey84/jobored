import React from 'react';
import './noFavoriteVacancy.scss';
import NoFavoriteVacancySVG from '../../ui/NoFavoriteVacancySVG';
import BackToVacancyButton from '../../ui/buttons/BackToVacancyButton ';
import { useLocation } from 'react-router-dom';

function NoFavoriteVacancyMessage() {
  const location = useLocation();
  const currentMessage = location.pathname.includes('favorite') ? (
    <h1 className="message">Упс, здесь еще ничего нет!</h1>
  ) : (
    <h1 className="message">Упс, вакансия пермещена в архив!</h1>
  );
  return (
    <section className="message_wrapper">
      <NoFavoriteVacancySVG />
      <h1 className="message">{currentMessage}</h1>
      <BackToVacancyButton />
    </section>
  );
}

export default NoFavoriteVacancyMessage;
