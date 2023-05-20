import React from 'react';
import './buttonStyle.scss';
import { useAppDispatch } from '../../redux/hooks';
import { setFavoriteVacancy } from '../../redux/data-slice/dataSlice';
import StarSVG from '../StarSVG';

interface IProp {
  id: string;
}

const AddFavoriteVacancyButton = (props: IProp) => {
  const dispatch = useAppDispatch();
  const addFavoriteVacancyButtonHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(setFavoriteVacancy(e.currentTarget.id));
  };
  return (
    <button
      id={props.id}
      className="add-favorite-vacancy-button"
      data-elem="vacancy-_vacancy_id_-shortlist-button"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => addFavoriteVacancyButtonHandler(e)}
    >
      <StarSVG id={props.id} />
    </button>
  );
};

export default AddFavoriteVacancyButton;
