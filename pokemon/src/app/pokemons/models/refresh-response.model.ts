import { LoginResponse } from './login-response.model';

export interface RefreshResponse extends LoginResponse {
  token_type: string;
}
