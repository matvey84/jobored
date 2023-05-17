import React from 'react';
import './mainPageSearchForm.scss';
import SearchFormInputGlass from '../../ui/SearchFormInputGlass';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISearchQueryParams } from '../../types/requestTypes';
import { useSearchParams } from 'react-router-dom';
import { queryString } from '../../redux/handlers/handlers';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSearchVacancie } from '../../redux/data-slice/dataSlice';
import {
  setCurrentPage,
  setNumIndex,
  setPaginationFetchQuery,
} from '../../redux/paginator-slice/paginationStateSlice';
type searchInput = {
  searchInput: string;
};

function MainPageSearchForm() {
  const dispatch = useAppDispatch();
  const searchVacancie = useAppSelector((state) => state.dataSlice.searchVacancie);
  const [_, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<searchInput>({
    mode: 'all',
    defaultValues: {
      searchInput: !!searchVacancie ? searchVacancie : '',
    },
  });
  const searchVacancyHandler: SubmitHandler<searchInput> = (data: searchInput) => {
    dispatch(setPaginationFetchQuery({ page: 1, count: 20 }));

    const searchQueryParams: ISearchQueryParams = {
      keyword: data.searchInput,
      page: '1',
    };
    setSearchParams(searchQueryParams);
    dispatch(setSearchVacancie(searchQueryParams.keyword));
    dispatch(setCurrentPage(0));
    dispatch(setNumIndex(0));
    dispatch(setPaginationFetchQuery({ page: searchQueryParams.page, count: 20 }));
    dispatch(fetchGetVacancy(queryString(searchQueryParams)));
  };

  return (
    <form className="main-page_search-form" onSubmit={handleSubmit(searchVacancyHandler)}>
      <SearchFormInputGlass />
      <input
        className={
          !!errors.searchInput
            ? 'main-page_search-form__input__error'
            : 'main-page_search-form__input'
        }
        data-elem="search-input"
        type="search"
        {...register('searchInput', {
          validate: (value) => Boolean(value.trim()) || 'Это обязательное',
          required: 'Упс, это обязательное поле',
          minLength: { value: 3, message: 'Упс, минимум 3 символа' },
        })}
        placeholder="Введите название вакансии"
      />
      <h5 className={!!errors.searchInput ? 'error-message_show' : 'error-message'}>
        {!!errors.searchInput ? errors.searchInput.message : ''}
      </h5>
      <button className="main-page_search-form__submit-button" disabled={!isValid}>
        Поиск
      </button>
    </form>
  );
}

export default MainPageSearchForm;
