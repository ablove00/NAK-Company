export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPayload {
  username: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface AuthState {
  token: string | null;
  user: UserPayload | null;
  setToken: (token: string | null) => void;
  setUser: (user: UserPayload | null) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  checkTokenExpired: () => boolean;
}

