import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';
import { API_USER_CREATE } from '@/utils/Const';
import { ILoginResponse } from '@/interfaces/ILogin';
import { useRequestWithLoading } from '@/hooks/useRequestWithLoading';
import { t } from 'i18next';

/**
 * Custom React hook to manage user registration logic.
 *
 * @function
 * @name useRegister
 * @returns {{
 *   email: string,
 *   setEmail: React.Dispatch<React.SetStateAction<string>>,
 *   password: string,
 *   setPassword: React.Dispatch<React.SetStateAction<string>>,
 *   handleSubmit: (e: React.FormEvent) => Promise<void>
 * }}
 *
 * @description
 * Handles the state and submission of the registration form.
 * Sends a POST request to register the user and stores the received tokens.
 * Navigates to the home page upon successful registration.
 */
export function useRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateTokens } = useAuth();
  const navigate = useNavigate();
  const { sendRequest } = useRequestWithLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await sendRequest<ILoginResponse>({
        url: API_USER_CREATE,
        options: {
          method: "POST",
          body: JSON.stringify({ email: email, password: password })
        },
        errorMessage: t("request_error")
      });

      updateTokens(response.accessToken, response.refreshToken);
      navigate('/home');
    } catch (error) {
      console.error(`${t("register_error")}:`, error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit
  };
}
