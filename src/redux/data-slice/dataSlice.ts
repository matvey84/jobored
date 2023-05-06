import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchGetVacancy } from './dataFetchRequest';
import { IVacansy } from '../../types/vacancyTypes';

interface IUserState {
  data: IVacansy[];
  error: string;
  spinnerStatus: boolean;
}

const initFormState: IUserState = {
  data: [],
  error: '',
  spinnerStatus: false,
};

export const dataSlice = createSlice({
  name: 'vacancyData',
  initialState: initFormState,
  reducers: {
    // setUserData(state, action: PayloadAction<IUser>) {
    //   state.user = action.payload;
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
        state.data = action.payload;
        state.error = '';
        state.spinnerStatus = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload !== undefined ? action.payload : '';
        state.spinnerStatus = false;
      });
  },
});
// export const {
//   /*setUserData, setUserToken, setSignInStatus, setSpinnerStatus*/
// } = dataSlice.actions;

export default dataSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
