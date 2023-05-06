import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/types';
import { USER } from '../../endpoints/mocUser';
import { IUserState } from '../../types/sliceTypes';
import { fetchLogin } from './userFetchRequest';

const initFormState: IUserState = {
  user: USER,
  access_token: '',
  refresh_token: '',
  error: '',
  isSignIn: false,
  spinnerStatus: false,
};

export const userSlice = createSlice({
  name: 'userData',
  initialState: initFormState,
  reducers: {
    setUserData(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setUserToken(state, action: PayloadAction<string>) {
      state.access_token = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.user.login = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.user.login = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setSignInStatus(state, action: PayloadAction<boolean>) {
      state.isSignIn = action.payload;
    },
    setSpinnerStatus(state, action: PayloadAction<boolean>) {
      state.spinnerStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.error = '';
        state.spinnerStatus = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.error = '';
        state.isSignIn = true;
        state.spinnerStatus = false;
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload !== undefined ? action.payload : '';
        state.spinnerStatus = false;
      });
  },
});
export const { setUserData, setUserToken, setSignInStatus, setSpinnerStatus } = userSlice.actions;

export default userSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
