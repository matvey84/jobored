import { IFetchQueryVacancyRequest } from './../../types/requestTypes';
import { IRootVacancyResponse } from './../../types/vacancyTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../endpoints/endpoints';
import { createrQueryString } from '../handlers/handlers';

export const fetchGetVacancy = createAsyncThunk<
  IRootVacancyResponse,
  IFetchQueryVacancyRequest,
  { rejectValue: string }
>('fetch/fetchGetVacancy', async (fetchQuery, { rejectWithValue }) => {
  const response: Response = await fetch(
    createrQueryString(fetchQuery.paginationData, Endpoints.VACANCYES),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-App-Id': fetchQuery.x_api_app_id,
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
      },
    }
  );

  if (!response.ok) {
    return rejectWithValue(`Somethig went wrong. Response end with ${response.status}`);
  }

  const vacancyes: IRootVacancyResponse = await response.json();
  return vacancyes;
});
