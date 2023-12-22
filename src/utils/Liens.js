import axios from 'axios';
import _ from 'lodash';

export const isEmpty = (value) => {
  return _.isEmpty(value);
};
export const messageConnectionError = 'Veuillez véfirier si votre appareil a une connection active';

export const lien_read = 'http://localhost:5000/bulletin/read';
export const lien_create = 'http://localhost:5000/bulletin/create';
export const lien_delete = 'http://localhost:5000/bulletin/delete';
export const lien_update = 'http://localhost:5000/bulletin/update';
export const lien_image = 'http://localhost:5000/image';
export const lien_fichier = 'http://localhost:5000/fichier';

export const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
};
export const get = async (lien) => {
  const response = await axios.get(`${lien_read}/${lien}`, config);
  return response;
};
export const post = async (lien, data) => {
  const response = await axios.post(`${lien_create}/${lien}`, data, config);
  console.log(response.data)
  return response;
};
export const deletes = async (lien) => {
  const response = await axios.delete(`${lien_delete}/${lien}`, config);
  return response;
};
export const put = async (lien, data) => {
  const response = await axios.put(`${lien_update}/${lien}`, data, config);
  return response;
};
