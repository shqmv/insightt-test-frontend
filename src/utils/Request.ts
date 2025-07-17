import { t } from "i18next";

export type IRequestOptions = RequestInit;

/**
 * Sends an HTTP request using the Fetch API with automatic JSON parsing,
 * error handling, and authorization header injection from localStorage.
 *
 * @template T - The expected response type.
 *
 * @param {{
 *   url: string,
 *   options?: IRequestOptions,
 *   errorMessage?: string
 * }} params - The request configuration.
 * @param {string} params.url - The URL to which the request is sent.
 * @param {IRequestOptions} [params.options={}] - Optional Fetch API options (method, headers, body, etc.).
 * @param {string} [params.errorMessage=t("request_error")] - Default error message shown if request fails.
 *
 * @returns {Promise<T>} The parsed JSON response cast to type `T`.
 *
 * @throws {Error} If the response is not OK (status 4xx or 5xx), throws an error
 * with the message from the response or the fallback `errorMessage`.
 *
 * @example
 * const data = await Request<MyDataType>({
 *   url: "/api/resource",
 *   options: { method: "GET" }
 * });
 */
export async function Request<T>({ url, options = {}, errorMessage = t("request_error") } : {url: string, options?: IRequestOptions, errorMessage?: string}): Promise<T> {
  const { headers, ...rest } = options;

  let defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    defaultHeaders = { ...defaultHeaders, "Authorization": `Bearer ${accessToken}` };
  }

  const response = await fetch(url, {
    headers: defaultHeaders,
    ...rest,
  });

  const contentType = response.headers.get("Content-Type");
  const isJSON = contentType?.includes("application/json");

  const data = isJSON ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.message || t(`firebase.${data?.error}`) || errorMessage);
  }

  return data;
}
