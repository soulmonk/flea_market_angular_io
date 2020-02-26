export interface Authenticate {
  username: string;
  password: string;
}

export interface User {
  username: string;
}

export interface UserTokenResponse {
  token: string;
  expiresIn: number;
}

