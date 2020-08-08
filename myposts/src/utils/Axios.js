import axios from "axios";

export const Axios = () => {
  return axios.create({
    baseURL: "http://localhost:5050/api",
  });
};
