import { AuthResponse } from '@/types/response/auth.type';
import { User } from '@/types/response/user.type';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  setAuth: (response: AuthResponse) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setAuth: (response: AuthResponse) =>
        set({
          user: {
            ...response.user,
          },
          accessToken: response.accessToken,
          isAuthenticated: true,
        }),
      updateUser: (user: User) =>
        set((state) => ({
          ...state,
          user: {
            ...user,
          },
        })),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
