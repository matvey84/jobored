import React from 'react';
import NoFavoriteVacancyMessage from '../../components/nofavoriteVanacy/NoFavoriteVacancyMessage';

function FavoriteVacancyPage() {
  return (
    <section className="page favorite-vacancy-page">
      <div className="container">
        <NoFavoriteVacancyMessage />
      </div>
    </section>
  );
}

export default FavoriteVacancyPage;
