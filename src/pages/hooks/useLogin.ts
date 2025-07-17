import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';

/**
 * Custom React hook to handle login form state and submission logic.
 *
 * @function
 * @name useLogin
 * @returns {{
 *   email: string,
 *   setEmail: React.Dispatch<React.SetStateAction<string>>,
 *   password: string,
 *   setPassword: React.Dispatch<React.SetStateAction<string>>,
 *   handleSubmit: (e: React.FormEvent) => Promise<void>
 * }}
 *
 * @description
 * Manages login form fields (`email`, `password`) and handles user authentication.
 * On successful login, redirects the user to the `/home` route.
 */
export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    if (isAuthenticated) {
      navigate('/home');
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
