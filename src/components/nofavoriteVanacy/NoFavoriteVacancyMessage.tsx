import React from 'react';
import './noFavoriteVacancy.scss';
import NoFavoriteVacancySVG from '../../ui/NoFavoriteVacancySVG';
import BackToVacancyButton from '../../ui/buttons/BackToVacancyButton ';

function NoFavoriteVacancyMessage() {
  return (
    <section className="message_wrapper">
      <NoFavoriteVacancySVG />
      <h1 className="message">Упс, здесь еще ничего нет!</h1>
      <BackToVacancyButton />
    </section>
  );
}

export default NoFavoriteVacancyMessage;
