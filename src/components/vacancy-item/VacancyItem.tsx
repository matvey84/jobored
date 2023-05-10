import React from 'react';
import './vacancyItem.scss';
import LocationPointSVG from '../../ui/LocationPointSVG';
import AddFavoriteVacancyButton from '../../ui/buttons/AddFavoriteVacancYButton';
import { IVacansy } from '../../types/vacancyTypes';
import { NavLink } from 'react-router-dom';
interface IProp {
  data: IVacansy;
}

function VacancyItem(props: IProp) {
  const data = props.data;

  return (
    <section className="vacancy" id={String(data.id)} data-elem={`vacancy-${String(data.id)}`}>
      <article className="vacancy-short-info">
        <NavLink to={`/vacancy/${data.id}`} className="vacancy-title">
          {data.profession}
        </NavLink>
        {/* <h6 className="city">{data.catalogues[0].title}</h6> */}
        <section className="vacancy-offers">
          <span className="vacancy-salary">
            {data.payment_from <= 0 && data.payment_to <= 0
              ? `з/п не указана`
              : `з/п от ${data.payment_from} ${data.currency}`}
          </span>
          {data.payment_to <= 0 ? '' : <b>-</b>}
          <span className="vacancy-salary">
            {data.payment_to <= 0
              ? ''
              : data.payment_from <= 0 && data.payment_to <= 0
              ? ''
              : `${data.payment_to} ${data.currency}`}
          </span>
          <b>&bull;</b>
          <span className="vacancy-working-mode">{data.type_of_work.title}</span>
        </section>
        <p className="vacancy-location">
          <span className="point">
            <LocationPointSVG />
          </span>
          <span className="city">{data.town.title}</span>
        </p>
      </article>
      <AddFavoriteVacancyButton id={String(data.id)} />
    </section>
  );
}

export default VacancyItem;
