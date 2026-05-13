import axios from 'axios';
import { base_url } from '../../utils/base_url';

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}/upload/`, data );
  return response.data;
};

const deleteImg = async (id) => { 
  const response = await axios.delete(`${base_url}/upload/delete-img/${id}`);
  return response.data;
};

const uploadService = { uploadImg, deleteImg };

export default uploadService;

