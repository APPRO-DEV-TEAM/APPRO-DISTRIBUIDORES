import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.appro.com.br/api/",
  timeout: 10000,
  timeoutErrorMessage:
    "A requisição demorou muito para responder. Tente novamente mais tarde.",
});
