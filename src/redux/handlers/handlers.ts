import { IUser } from '../../types/types';

export function createrQueryString(data: IUser, endpoint: string) {
  return `${endpoint}/?${Object.entries(data)
    .map((params) => params.join('='))
    .join('&')}`;
}
