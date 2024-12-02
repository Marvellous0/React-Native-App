export interface User {
    email: string;
    name: string;
    picture?: string;
    sub: string;
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error?: Error;
    user?: User;
  }