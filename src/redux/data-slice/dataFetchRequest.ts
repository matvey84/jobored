import { IRootVacancyResponse, IVacansy } from './../../types/vacancyTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../endpoints/endpoints';
import { IUserState } from '../../types/sliceTypes';

export const fetchGetVacancy = createAsyncThunk<IVacansy[], IUserState, { rejectValue: string }>(
  'fetch/fetchGetVacancy',
  async (user, { rejectWithValue }) => {
    const response: Response = await fetch(Endpoints.VACANCYES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-App-Id': user.user.client_secret,
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
      },
    });

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Response end with ${response.status}`);
    }

    const vacancyes: IRootVacancyResponse = await response.json();
    return vacancyes.objects;
  }
);
