import React, { useEffect, useState } from 'react';
import './BackToVacancyButton ';
import ResetButtonSVG from '../ResetButtonSVG';
import { IFetchQuery } from '../../types/requestTypes';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';
import { setFetchQuery } from '../../redux/data-slice/dataSlice';
import { queryString2 } from '../../redux/handlers/handlers';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useSearchParams } from 'react-router-dom';
interface IProp {
  setIsResetForm: (arg: boolean) => void;
}
const ResetButton = (props: IProp) => {
  const dispatch = useAppDispatch();
  const [_, setSearchParam] = useSearchParams();
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
    const string = queryString2(fetchQueryData);
    setSearchParam(string);
    dispatch(fetchGetVacancy(string));
    dispatch(setFetchQuery(fetchQueryData));
  };
  return (
    <button id="reset-button" onClick={resetButtonHandler} className="filter-form_reset-button">
      <ResetButtonSVG />
    </button>
  );
};

export default ResetButton;
