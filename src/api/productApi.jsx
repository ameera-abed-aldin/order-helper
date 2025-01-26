import api from "./api";

export const addProduct = (productData) => {
  return api
    .post("/supervisor_speech",productData)
    .then((res) => res.data.supervisor_speechs)
    .catch((err) => {
      console.log("Error fetching main data", err);
      throw err;
    });
};