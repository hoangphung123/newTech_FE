import axios from "axios";
const baseURL = "http://localhost:8000";

export const request = axios.create({
  baseURL,
});
