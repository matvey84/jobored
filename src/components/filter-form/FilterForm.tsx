import React, { useEffect, useState } from 'react';
import './filterForm.scss';
import IndustriSeLect from '../../ui/IndustriSeLect';
import PaymentInput from '../../ui/PaymentInput';
import ResetButton from '../../ui/buttons/ResetButton';

import { IFetchQuery, IFilterFormData } from '../../types/requestTypes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { queryString2 } from '../../redux/handlers/handlers';
import { setFetchQuery } from '../../redux/data-slice/dataSlice';
import { useSearchParams } from 'react-router-dom';
import { fetchGetCatalogues, fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';

function FilterForm() {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParam] = useSearchParams();
  const [isResetForm, setIsResetForm] = useState<boolean>(false);
  const fetchQuery = useAppSelector((state) => state.dataSlice.fetchQuery);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<IFilterFormData>({
    mode: 'all',
  });

  const industrySelect = register('catalogues', {
    required: false,
  });
  const paymentFrom = register('payment_from', {
    required: false,
  });
  const paymentTo = register('payment_to', {
    required: false,
  });

  const filterFormHandler: SubmitHandler<IFilterFormData> = (data: IFilterFormData) => {
    const fetchQueryData: IFetchQuery = {
      published: 1,
      page: 1,
      keyword: fetchQuery?.keyword,
      ...data,
    };
    dispatch(setFetchQuery(fetchQueryData));
    const string = queryString2(fetchQueryData);
    setSearchParam(string);
    dispatch(fetchGetVacancy(string));
    setIsResetForm(false);
  };

  useEffect(() => {
    dispatch(fetchGetCatalogues(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isResetForm && reset();
  }, [isResetForm, reset]);

  return (
    <form className="filter-form" onSubmit={handleSubmit(filterFormHandler)}>
      <div className="filter-form_title-block">
        <h3 className="filter-form_title">Фильтры</h3>
        <div className="filter-form_reset-button-block">
          <label htmlFor="reset-button" className="filter-form_reset-button_label">
            Сбросить все
          </label>
          <ResetButton setIsResetForm={setIsResetForm} />
        </div>
      </div>
      <section className="filter-form_input-block">
        <IndustriSeLect
          name={industrySelect.name}
          ref={industrySelect.ref}
          onChange={industrySelect.onChange}
          onBlur={industrySelect.onBlur}
          required={industrySelect.required!}
        />
        <label htmlFor="payment_from" className="filter-form_title">
          Оклад
        </label>
        <PaymentInput
          id={'payment_from'}
          placeholder={'От'}
          name={paymentFrom.name}
          ref={paymentFrom.ref}
          onChange={paymentFrom.onChange}
          onBlur={paymentFrom.onBlur}
          required={paymentFrom.required!}
          testAtribute={'salary-from-input'}
        />
        <PaymentInput
          id={'payment_to'}
          placeholder={'До'}
          name={paymentTo.name}
          ref={paymentTo.ref}
          onChange={paymentTo.onChange}
          onBlur={paymentTo.onBlur}
          required={paymentTo.required!}
          testAtribute={'salary-to-input'}
        />
      </section>

      <button disabled={!isDirty} className="filter-form__filter-button" data-elem="search-button">
        Применить
      </button>
    </form>
  );
}

export default FilterForm;
