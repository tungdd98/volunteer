import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

/**
 * Adds authorization headers to API calls
 * @param {AxiosRequestConfig} request
 */
const authInterceptor = (request: AxiosRequestConfig) => {
  return request;
};

/**
 * Axios response interceptors
 * @param {AxiosResponse} response
 */
const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

/**
 * Axios error interceptor
 * @param {AxiosError} axiosError
 */
const errorInterceptor = (axiosError: AxiosError) => {
  if (axiosError && axiosError.response) {
    // TODO: Handle error here
    return Promise.reject(axiosError.response);
  }
  return Promise.reject(axiosError);
};
/** Setup an API instance */
export const api = axios.create({
  baseURL: process.env.REACT_APP_IMAGE,
  headers: {
    "Content-Type": "application/json",
  },
});

/** Add interceptor */
api.interceptors.request.use(authInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);
