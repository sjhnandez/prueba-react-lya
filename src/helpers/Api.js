import axios from "axios";

export const getFacts = async (limit) => {
  return axios
    .get("https://catfact.ninja/facts", { params: { limit } })
    .then((response) => {
      return response.data.data;
    });
};
