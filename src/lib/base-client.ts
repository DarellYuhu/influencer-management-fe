import axios, { AxiosError } from "axios";

export const BaseClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

BaseClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
