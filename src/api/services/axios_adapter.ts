import axios from "axios";

export function api(baseURL = "") {
  const apiAdapter = axios.create({
    baseURL,
  });
  return apiAdapter;
}
