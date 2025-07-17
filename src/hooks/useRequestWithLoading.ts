// utils/useRequestWithLoading.ts
import { ToastConfig } from "@/config/Toast";
import { useLoading } from "@/context/LoadingContext";
import { IErrorResponse } from "@/interfaces/IErrorResponse";
import { Request, IRequestOptions } from "@/utils/Request";
import { t } from "i18next";
import { toast } from "react-toastify";

/**
 * Custom hook to send HTTP requests with global loading indicator support.
 *
 * @function
 * @returns {{ sendRequest: <T>(params: { url: string; options?: IRequestOptions; errorMessage?: string }) => Promise<T> }}
 *
 * @description
 * Uses the `useLoading` context to automatically show and hide a global loading overlay while the request is in progress.
 * Handles errors by displaying a toast with the error message and rethrowing a generic error.
 *
 * @template T The expected type of the response data.
 *
 * @example
 * const { sendRequest } = useRequestWithLoading();
 * const data = await sendRequest<MyDataType>({ url: '/api/data' });
 */
export function useRequestWithLoading() {
  const { setLoading } = useLoading();

  async function sendRequest<T>({
    url,
    options = {},
    errorMessage = t("request_error"),
  }: {
    url: string;
    options?: IRequestOptions;
    errorMessage?: string;
  }): Promise<T> {
    setLoading(true);
    try {
      const result = await Request<T>({ url, options, errorMessage });
      return result;
    } catch (error) {
      toast.info((error as IErrorResponse).message, ToastConfig);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return { sendRequest };
}
