import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchGetVacancy } from './dataFetchRequest';
import { IVacansy } from '../../types/vacancyTypes';

interface IUserState {
  data: IVacansy[];
  favoriteVacancyList: IVacansy[];
  pageCount: number;
  pagesAmount: number;
  access_token: string;
  totalVacancies: number;
  error: string;
  spinnerStatus: boolean;
}

const initFormState: IUserState = {
  data: [],
  favoriteVacancyList: [],
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
    setFavoriteVacancy(state, action: PayloadAction<string>) {
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
