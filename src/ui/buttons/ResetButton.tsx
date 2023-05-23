import React from 'react';
import './BackToVacancyButton ';
import ResetButtonSVG from '../ResetButtonSVG';
import { IFetchQuery } from '../../types/requestTypes';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';
import { setFetchQuery } from '../../redux/data-slice/dataSlice';
import { queryString2 } from '../../redux/handlers/handlers';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
interface IProp {
  setIsResetForm: (arg: boolean) => void;
}
const ResetButton = (props: IProp) => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setIsResetForm } = props;
  const fetchQuery = useAppSelector((state) => state.dataSlice.fetchQuery);

  const resetButtonHandler = () => {
    const fetchQueryData: IFetchQuery = {
      published: 1,
      page: 1,
      keyword: fetchQuery?.keyword,
      catalogues: '',
      payment_from: 0,
      payment_to: 0,
    };
    setIsResetForm(true);
    dispatch(fetchGetVacancy(queryString2(fetchQueryData)));
    dispatch(setFetchQuery(fetchQueryData));
  };
  return (
    <button id="reset-button" onClick={resetButtonHandler} className="filter-form_reset-button">
      <ResetButtonSVG />
    </button>
  );
};

export default ResetButton;
