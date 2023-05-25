import React from 'react';
import OpenFoemSVG from '../OpenFoemSVG';
import './buttonStyle.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setOpenForm } from '../../redux/data-slice/dataSlice';

const OpenFormButton = () => {
  const dispatch = useAppDispatch();
  const isFormOpen = useAppSelector((state) => state.dataSlice.isFormOpen);
  return (
    <button
      className={isFormOpen ? 'close-form-button' : 'open-form-button'}
      onClick={() => dispatch(setOpenForm(!isFormOpen))}
    >
      <OpenFoemSVG />
    </button>
  );
};

export default OpenFormButton;
