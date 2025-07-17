/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { ILoginResponse } from '@/interfaces/ILogin';
import { API_USER_LOGIN } from '@/utils/Const';
import { useRequestWithLoading } from '@/hooks/useRequestWithLoading';

/**
 * Interface for the authentication context values.
 *
 * @interface AuthContextType
 * @property {boolean} isAuthenticated - Indicates whether the user is authenticated.
 * @property {(username: string, password: string) => Promise<void>} login - Function to authenticate the user.
 * @property {() => void} logout - Function to clear authentication state.
 * @property {string} accessToken - Current access token.
 * @property {string} refreshToken - Current refresh token.
 * @property {(newAccessToken: string | null, newRefreshToken: string | null) => void} updateTokens - Updates or clears tokens and authentication state.
 */
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  accessToken: string;
  refreshToken: string;
  updateTokens: (newAccessToken: string | null, newRefreshToken: string | null) => void;
}

/**
 * React context for authentication state and methods.
 *
 * @constant
 * @type {React.Context<AuthContextType | undefined>}
 *
 * @description
 * Holds the authentication state and methods such as `login`, `logout`, and `updateTokens`.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to access the authentication context.
 *
 * @function
 * @returns {AuthContextType} The current authentication context.
 * @throws Will throw an error if used outside of an `AuthProvider`.
 *
 * @description
 * Provides access to authentication methods and state from anywhere within the app,
 * as long as the component is wrapped in the `AuthProvider`.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

/**
 * AuthProvider component to provide authentication state and methods to the application.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Child components that will have access to the authentication context.
 * @returns {JSX.Element} The context provider wrapping all children components.
 *
 * @description
 * Manages and persists authentication state using access and refresh tokens.
 * Includes logic for logging in, logging out, and restoring tokens from localStorage on load.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const { t } = useTranslation();
  const { sendRequest } = useRequestWithLoading();

  const updateTokens = (newAccessToken: string | null, newRefreshToken: string | null) => {
    if (newAccessToken && newRefreshToken) {
      setIsAuthenticated(true);
      setAccessToken(newAccessToken!);
      setRefreshToken(newRefreshToken!);
      localStorage.setItem("accessToken", newAccessToken!);
      localStorage.setItem("refreshToken", newRefreshToken!);
    } else {
      setIsAuthenticated(false);
      setAccessToken("");
      setRefreshToken("");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }

  // Verify if there's a token in localStorage
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    updateTokens(storedAccessToken, storedRefreshToken);
  });

  const login = async (email: string, password: string) => {
    console.log("login");
    try {
      const response = await sendRequest<ILoginResponse>({
        url: API_USER_LOGIN, options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password
          })
        }, 
        errorMessage: t("request_error")
      });
      updateTokens(response.accessToken, response.refreshToken);
    } catch (error) {
      console.error('Error in login:', error);
    }
  };

  const logout = () => {
    updateTokens("", "");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, accessToken, refreshToken, updateTokens }}>
      {children}
    </AuthContext.Provider>
  );
};