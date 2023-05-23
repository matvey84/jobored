import React from 'react';
import './noFavoriteVacancy.scss';
import NoFavoriteVacancySVG from '../../ui/NoFavoriteVacancySVG';
import BackToVacancyButton from '../../ui/buttons/BackToVacancyButton ';
interface IProp {
  isErrorPage?: boolean;
}

function NoFavoriteVacancyMessage(props: IProp) {
  const { isErrorPage } = props;
  return (
    <section className="message_wrapper">
      <NoFavoriteVacancySVG />
      <h1 className="message">
        {isErrorPage ? 'Упс, такой страницы не существует!' : 'Упс, здесь еще ничего нет!'}
      </h1>
      <BackToVacancyButton />
    </section>
  );
}

export default NoFavoriteVacancyMessage;
