import React, { useEffect, useState } from 'react';
import './mainPageSearchForm.scss';
import SearchFormInputGlass from '../../ui/SearchFormInputGlass';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFetchQuery } from '../../types/requestTypes';
import { queryString2 } from '../../redux/handlers/handlers';
import { fetchGetVacancy } from '../../redux/data-slice/dataFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFetchQuery } from '../../redux/data-slice/dataSlice';
import { setCurrentPage, setNumIndex } from '../../redux/paginator-slice/paginationStateSlice';
type searchInput = {
  searchInput: string;
};

function MainPageSearchForm() {
  const dispatch = useAppDispatch();
  const fetchQuery = useAppSelector((state) => state.dataSlice.fetchQuery);
  const [back, setBack] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isValid },
  } = useForm<searchInput>({
    mode: 'all',
    defaultValues: {
      searchInput: fetchQuery?.keyword,
    },
  });
  const searchVacancyHandler: SubmitHandler<searchInput> = (data: searchInput) => {
    const fetchQueryData: IFetchQuery = {
      ...fetchQuery,
      page: 1,
      keyword: data.searchInput,
    };
    dispatch(setFetchQuery(fetchQueryData));
    dispatch(setCurrentPage(1));
    dispatch(setNumIndex(0));
    dispatch(fetchGetVacancy(queryString2(fetchQueryData)));
  };

  const backToAllVacancies = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fetchQueryData: IFetchQuery = {
      ...fetchQuery,
      page: 1,
      keyword: '',
    };

    if (e.currentTarget.value.length < 1 && !!fetchQuery?.keyword) {
      dispatch(fetchGetVacancy(queryString2(fetchQueryData)));
      dispatch(setCurrentPage(1));
      dispatch(setFetchQuery(fetchQueryData));
      setBack(true);
    }
  };
  useEffect(
    () => setFocus('searchInput'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => {
    back && reset();
  }, [back, reset]);
  return (
    <form className="main-page_search-form" onSubmit={handleSubmit(searchVacancyHandler)}>
      <SearchFormInputGlass />
      <input
        className="main-page_search-form__input"
        data-elem="search-input"
        type="search"
        {...register('searchInput', {
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => backToAllVacancies(e),
          required: true,
          minLength: 1, //{ value: 1, message: 'Упс, минимум 3 символа' },
        })}
        placeholder="Введите название вакансии"
      />
      <button
        className="main-page_search-form__submit-button"
        data-elem="search-button"
        disabled={!isValid}
      >
        Поиск
      </button>
    </form>
  );
}

export default MainPageSearchForm;
