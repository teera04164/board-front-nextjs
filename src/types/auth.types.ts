import { AuthResponse } from "./response/auth.type";

export interface LoginCredentials {
    username: string;
}

export interface AuthState {
    user: AuthResponse | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}