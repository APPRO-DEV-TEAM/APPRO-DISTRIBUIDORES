import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/api",
  timeout: 10000,
  timeoutErrorMessage:
    "A requisição demorou muito para responder. Tente novamente mais tarde.",
});
