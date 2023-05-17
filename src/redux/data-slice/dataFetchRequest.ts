import { IRootVacancyResponse, IVacansy } from './../../types/vacancyTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../endpoints/endpoints';
import { IUserState } from '../../types/sliceTypes';

export const fetchGetVacancy = createAsyncThunk<
  IRootVacancyResponse,
  string,
  { rejectValue: string }
>('fetch/fetchGetVacancy', async (fetchQuery, { rejectWithValue }) => {
  const x_api_app_id: IUserState = JSON.parse(
    JSON.parse(localStorage.getItem('persist:root')!).userSlice
  );
  const response: Response = await fetch(`${Endpoints.VACANCYES}${fetchQuery}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-App-Id': x_api_app_id.user.client_secret,
      'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    },
  });

  if (!response.ok) {
    return rejectWithValue(`Somethig went wrong. Response end with ${response.status}`);
  }

  const vacancies: IRootVacancyResponse = await response.json();
  return vacancies;
});

export const fetchGetCurrentVacancy = createAsyncThunk<IVacansy, string, { rejectValue: string }>(
  'fetch/fetchGetCurrentVacancy',
  async (string, { rejectWithValue }) => {
    const x_api_app_id: IUserState = JSON.parse(
      JSON.parse(localStorage.getItem('persist:root')!).userSlice
    );

    const response: Response = await fetch(`${Endpoints.VACANCYES}/${string}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-App-Id': x_api_app_id.user.client_secret,
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
      },
    });

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Response end with ${response.status}`);
    }

    const vacancyes: IVacansy = await response.json();
    return vacancyes;
  }
);
