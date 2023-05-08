import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchGetVacancy } from './dataFetchRequest';
import { IVacansy } from '../../types/vacancyTypes';

interface IUserState {
  data: IVacansy[];
  pageCount: number;
  pagesAmount: number;
  access_token: string;
  totalVacancies: number;
  error: string;
  spinnerStatus: boolean;
}

const initFormState: IUserState = {
  data: [],
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
    // setToken(state, action: PayloadAction<string>) {
    //   const { token, x_api_app_id, x_secret_key } = JSON.parse(action.payload);
    //   state.access_token = token;
    //   state.headers.x_api_app_id = x_api_app_id;
    //   state.headers.x_secret_key = x_secret_key;
    // },
    // setUserToken(state, action: PayloadAction<string>) {
    //   state.access_token = action.payload;
    // },
    // setUserName(state, action: PayloadAction<string>) {
    //   state.user.login = action.payload;
    // },
    // setUserId(state, action: PayloadAction<string>) {
    //   state.user.login = action.payload;
    // },
    // setError(state, action: PayloadAction<string>) {
    //   state.error = action.payload;
    // },
    // setSignInStatus(state, action: PayloadAction<boolean>) {
    //   state.isSignIn = action.payload;
    // },
    // setSpinnerStatus(state, action: PayloadAction<boolean>) {
    //   state.spinnerStatus = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetVacancy.pending, (state) => {
        state.error = '';
        state.spinnerStatus = true;
      })
      .addCase(fetchGetVacancy.fulfilled, (state, action) => {
        state.data = action.payload.objects;
        state.pagesAmount = Math.ceil(action.payload.total / action.payload.objects.length);
        state.error = '';
        state.spinnerStatus = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload !== undefined ? action.payload : '';
        state.spinnerStatus = false;
      });
  },
});

export const {} = dataSlice.actions;
export default dataSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
