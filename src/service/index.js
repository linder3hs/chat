import axios from "axios";

const urlbase = "http://localhost:6005";

const api = axios.create({
  baseURL: urlbase,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const post = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
