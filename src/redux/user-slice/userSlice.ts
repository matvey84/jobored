import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER } from '../../endpoints/mocUser';
import { IUserState } from '../../types/sliceTypes';
import { fetchLogin } from './userFetchRequest';

export const initFormState: IUserState = {
  user: USER,
  access_token: '',
  refresh_token: '',
  ttl: 0,
  error: '',
  isSignIn: false,
  spinnerStatus: false,
};

export const userSlice = createSlice({
  name: 'userData',
  initialState: initFormState,
  reducers: {},
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

// eslint-disable-next-line no-empty-pattern
export const {} = userSlice.actions;

export default userSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
