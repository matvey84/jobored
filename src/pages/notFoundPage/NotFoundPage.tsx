import React, { useEffect, useState } from 'react';
import NoFavoriteVacancyMessage from '../../components/nofavoriteVanacy/NoFavoriteVacancyMessage';

function NotFoundPage() {
  const [isErrorPage, setIsErrorPage] = useState<boolean>(false);

  useEffect(() => {
    setIsErrorPage(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="not-found-page">
      <div className="not-found-page_container"></div>
      <NoFavoriteVacancyMessage isErrorPage={isErrorPage} />
    </section>
  );
}

export default NotFoundPage;
