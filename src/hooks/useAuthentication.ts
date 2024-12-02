import { useAuth0 } from 'react-native-auth0';
import { useEffect, useState } from 'react';
import { User, AuthState } from '../types';

export const useAuthentication = () => {
  const { user, error, isLoading, authorize, clearSession } = useAuth0();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const login = async () => {
    try {
      await authorize();
    } catch (e) {
      console.error('Login failed:', e);
      throw e;
    }
  };

  const logout = async () => {
    try {
      await clearSession();
      setIsAuthenticated(false);
    } catch (e) {
      console.error('Logout failed:', e);
      throw e;
    }
  };

  return {
    user: user as User | undefined,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };
};