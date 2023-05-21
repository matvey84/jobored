import { IUser } from './types';

export interface IUserState {
  user: IUser;
  access_token: string;
  refresh_token: string;
  ttl: number;
  error: string;
  isSignIn: boolean;
  spinnerStatus: boolean;
}
