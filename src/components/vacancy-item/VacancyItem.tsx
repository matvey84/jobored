import React from 'react';
import './vacancyItem.scss';
import LocationPointSVG from '../../ui/LocationPointSVG';
import AddFavoriteVacancyButton from '../../ui/buttons/AddFavoriteVacancYButton';
import { IVacansy } from '../../types/vacancyTypes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setCurrentVacancieId } from '../../redux/data-slice/dataSlice';
interface IProp {
  data: IVacansy | null;
}

function VacancyItem(props: IProp) {
  const data = props.data;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const vacancieItemHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/vacancy/${data!.id}`);
    if (!location.pathname.includes(`${data!.id}`)) {
      navigate(`/vacancy/${data!.id}`);
      dispatch(setCurrentVacancieId(e.currentTarget.id));
    }
  };

  return (
    <section
      onClick={(e: React.MouseEvent<HTMLDivElement>) => vacancieItemHandler(e)}
      className="vacancy"
      id={String(data!.id)}
      data-elem={`vacancy-${String(data!.id)}`}
    >
      <article className="vacancy-short-info">
        {!location.pathname.includes(`${data!.id}`) ? (
          <h3 className="vacancy-title">{data!.profession}</h3>
        ) : (
          <h2 className="vacancy-title">{data!.profession}</h2>
        )}

        <section className="vacancy-offers">
          <span className="vacancy-salary">
            {data!.payment_from <= 0 && data!.payment_to <= 0
              ? `з/п не указана`
              : data!.payment_from <= 0
              ? null
              : `з/п от ${data!.payment_from} ${data!.currency}`}
          </span>
          {data!.payment_to <= 0 || data!.payment_from <= 0 ? '' : <b>-</b>}
          <span className="vacancy-salary">
            {data!.payment_from <= 0 && data!.payment_to <= 0
              ? null
              : data!.payment_from <= 0
              ? `з/п до ${data!.payment_to} ${data!.currency}`
              : data!.payment_to <= 0
              ? null
              : `до ${data!.payment_to} ${data!.currency}`}
          </span>
          <b>&bull;</b>
          <span className="vacancy-working-mode">{data!.type_of_work.title}</span>
        </section>
        <p className="vacancy-location">
          <span className="point">
            <LocationPointSVG />
          </span>
          <span className="city">{data!.town.title}</span>
        </p>
      </article>
      <AddFavoriteVacancyButton id={String(data!.id)} />
    </section>
  );
}

export default VacancyItem;
