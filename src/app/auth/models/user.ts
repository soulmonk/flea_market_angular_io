export interface Authenticate {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
}

export interface UserAuthResponse {
  user: User;
  token: string;
}
