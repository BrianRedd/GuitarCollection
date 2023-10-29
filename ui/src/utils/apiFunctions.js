import axios from "axios";
import { baseURL } from "./constants";

export const getGuitars = async () => {
  const data = await axios.get(`${baseURL}/get`).then(response => {
    return response.data;
  });
  return data;
};

export const addGuitar = inputObject => {
  axios.post(`${baseURL}/save`, inputObject).then(response => {
    return response;
  });
};

export const updateGuitar = inputObject => {
  axios
    .put(`${baseURL}/update/${inputObject._id}`, inputObject)
    .then(response => {
      return response.data;
    });
};

export const removeGuitar = id => {
  axios.delete(`${baseURL}/delete/${id}`).then(response => {
    return response;
  });
};
