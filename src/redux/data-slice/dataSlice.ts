import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchGetCurrentVacancy, fetchGetVacancy } from './dataFetchRequest';
import { IVacansy } from '../../types/vacancyTypes';

interface IDataState {
  data: IVacansy[];
  favoriteVacancyList: IVacansy[];
  currentVacancy: IVacansy | null;
  pageCount: number;
  pagesAmount: number;
  access_token: string;
  totalVacancies: number;
  error: string;
  spinnerStatus: boolean;
}

const initFormState: IDataState = {
  data: [],
  favoriteVacancyList: [],
  currentVacancy: null,
  pageCount: 20,
  pagesAmount: 0,
  totalVacancies: 0,
  access_token: '',
  error: '',
  spinnerStatus: false,
};

export const dataSlice = createSlice({
  name: 'vacancyData',
  initialState: initFormState,
  reducers: {
    setFavoriteVacancy(state, action: PayloadAction<string | undefined>) {
      const favoriteVacancy = state.data
        .filter((vacancy) => Number(vacancy.id) === Number(action.payload))
        .at(-1);
      state.favoriteVacancyList = state.favoriteVacancyList.some(
        (vacancy) => Number(vacancy.id) === Number(action.payload)
      )
        ? state.favoriteVacancyList.filter(
            (vacancy) => Number(vacancy.id) !== Number(action.payload)
          )
        : [...state.favoriteVacancyList, favoriteVacancy!];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetVacancy.pending, (state) => {
        state.error = '';
        state.spinnerStatus = true;
      })
      .addCase(fetchGetVacancy.fulfilled, (state, action) => {
        state.data = action.payload.objects;
        state.totalVacancies = action.payload.total;
        state.pagesAmount = Math.ceil(action.payload.total / action.payload.objects.length);
        state.error = '';
        state.spinnerStatus = false;
        state.favoriteVacancyList = !state.favoriteVacancyList ? [] : state.favoriteVacancyList;
      })
      .addCase(fetchGetCurrentVacancy.pending, (state, action) => {
        state.error = '';
        state.spinnerStatus = true;
      })
      .addCase(fetchGetCurrentVacancy.fulfilled, (state, action) => {
        state.currentVacancy = action.payload;
        state.error = '';
        state.spinnerStatus = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload !== undefined ? action.payload : '';
        state.spinnerStatus = false;
      });
  },
});

export const { setFavoriteVacancy } = dataSlice.actions;
export default dataSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
