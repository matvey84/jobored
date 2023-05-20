import React from 'react';
import { ICatalogues } from '../types/vacancyTypes';
import { useAppSelector } from '../redux/hooks';

interface IProp {
  industry: ICatalogues;
}

const IndustrySelectOption = (props: IProp) => {
  const { industry } = props;
  const currentIndustry = useAppSelector((state) => state.dataSlice.fetchQuery?.catalogues);

  return (
    <option
      className="select-industry_option"
      value={industry.key}
      id={String(industry.key)}
      selected={currentIndustry === String(industry.key)}
    >
      {industry.title_trimmed}
    </option>
  );
};

export default IndustrySelectOption;
