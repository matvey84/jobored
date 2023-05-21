import React from 'react';
import { ICatalogues } from '../types/vacancyTypes';

interface IProp {
  industry: ICatalogues;
}

const IndustrySelectOption = (props: IProp) => {
  const { industry } = props;

  return (
    <option className="select-industry_option" value={industry.key} id={String(industry.key)}>
      {industry.title_trimmed}
    </option>
  );
};

export default IndustrySelectOption;
