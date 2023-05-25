import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../endpoints/endpoints';
import { USER } from '../../endpoints/mocUser';
import { IToken, IUser } from '../../types/types';
import { createrQueryString } from '../handlers/handlers';

export const fetchLogin = createAsyncThunk<IToken, IUser, { rejectValue: string }>(
  'login/fetchLogin',
  async (user, { rejectWithValue, dispatch }) => {
    const response: Response = await fetch(createrQueryString(USER, Endpoints.AUTH), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-App-Id': user.client_secret,
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        return rejectWithValue('userNotExist');
      }
      const userData = await response.json();
      return rejectWithValue(userData.message);
    }

    const userData: IToken = await response.json();
    return userData;
  }
);
