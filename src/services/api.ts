import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  timeoutErrorMessage:
    "A requisição demorou muito para responder. Tente novamente mais tarde.",
});
