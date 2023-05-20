import React, { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { nanoid } from '@reduxjs/toolkit';
import IndustrySelectOption from './IndustrySelectOption';

interface IProp {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  required: boolean;
}
const IndustriSeLect = React.forwardRef(
  (props: IProp, ref: React.LegacyRef<HTMLSelectElement> | undefined) => {
    const industryList = useAppSelector((state) => state.dataSlice.industryList);
    const { name, onChange, onBlur } = props;

    return (
      <>
        <label htmlFor="select-industry" className="filter-form_title">
          Отрасль
        </label>
        <select
          ref={ref}
          id="select-industry"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          className="filter-form_select-industry"
          // size={5}
          defaultValue=""
        >
          <option className="select-industry_option" disabled value="">
            Выберете отрасль
          </option>
          {industryList.map((industry) => (
            <IndustrySelectOption key={nanoid()} industry={industry} />
          ))}
        </select>
      </>
    );
  }
);

export default IndustriSeLect;
