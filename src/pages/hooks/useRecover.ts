import { useState } from 'react';
import { toast } from 'react-toastify';

import { useRequestWithLoading } from '@/hooks/useRequestWithLoading';
import { IRecoverResponse } from '@/interfaces/IRecover';
import { API_USER_RECOVER } from '@/utils/Const';
import { ToastConfig } from '@/config/Toast';
import { t } from 'i18next';

/**
 * Custom React hook to manage password recovery logic.
 *
 * @function
 * @name useRecover
 * @returns {{
 *   email: string,
 *   setEmail: React.Dispatch<React.SetStateAction<string>>,
 *   handleSubmit: (e: React.FormEvent) => Promise<void>
 * }}
 *
 * @description
 * Handles the password recovery form state and submission process.
 * Sends a POST request to the recovery endpoint with the user's email,
 * and shows a toast notification when the email is successfully sent.
 */
export function useRecover() {
  const [email, setEmail] = useState('');
  const { sendRequest } = useRequestWithLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendRequest<IRecoverResponse>({
        url: API_USER_RECOVER,
        options: {
          method: "POST",
          body: JSON.stringify({ email: email })
        },
        errorMessage: t("request_error")
      });

      toast.info(t("recover.toast_email_sent"), ToastConfig);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    email,
    setEmail,
    handleSubmit
  };
}
