import { create } from "zustand";
import type { UserPayload } from "../types";
import { jwtDecode } from "jwt-decode";


export interface AuthState {
  token: string | null;
  user: UserPayload | null;
  setToken: (token: string | null) => void;
  setUser: (user: UserPayload | null) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  checkTokenExpired: () => boolean;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
      const decoded = jwtDecode<UserPayload>(token);
      set({ token, user: decoded });
    } else {
      localStorage.removeItem("token");
      set({ token: null, user: null });
    }
  },

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },

  isAuthenticated: () => {
    const { token, user } = get();
    if (!token || !user) return false;

    const now = Date.now() / 1000;
    return user.exp > now;
  },

  checkTokenExpired: () => {
    const { token, user, logout } = get();
    if (!token || !user) return true;

    const now = Date.now() / 1000;
    if (user.exp < now) {
      logout();
      return true;
    }
    return false;
  },

  loadFromStorage: () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<UserPayload>(token);
        const now = Date.now() / 1000;
        if (decoded.exp > now) {
          set({ token, user: decoded });
        } else {
          localStorage.removeItem("token");
          set({ token: null, user: null });
        }
      } catch {
        localStorage.removeItem("token");
        set({ token: null, user: null });
      }
    }
  },
}));
