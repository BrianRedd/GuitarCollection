import axios from "axios";
import { baseURL } from "./constants";

export const getGuitars = async () => {
  const data = await axios
    .get(`${baseURL}/get`)
    .then(response => response.data);
  return data;
};

export const addGuitar = inputObject => {
  axios.post(`${baseURL}/save`, inputObject).then(response => response.data);
};

export const updateGuitar = inputObject => {
  axios
    // eslint-disable-next-line no-underscore-dangle
    .put(`${baseURL}/update/${inputObject._id}`, inputObject)
    .then(response => response.data);
};

export const removeGuitar = id => {
  axios.delete(`${baseURL}/delete/${id}`).then(response => response.data);
};
