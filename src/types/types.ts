export interface IUser {
  login: string;
  password: string;
  client_id: number;
  client_secret: string;
  hr: number;
}

export interface IToken {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
  reg_user_resumes_count: number;
}
