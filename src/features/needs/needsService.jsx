import axios from "axios";
import { base_url } from "../../utils/base_url";

// Create a need
export const createneeds = async (data) => {
  const response = await axios.post(`${base_url}/needs/create`, data);
  return response.data;
};

// Get all needs
export const getAllneeds = async () => {
  const response = await axios.get(`${base_url}/needs/all`);
  return response.data;
};

// Get single need by ID
export const getSingleneeds = async (id) => {
  const response = await axios.get(`${base_url}/needs/single/${id}`);
  return response.data;
};

// Update need by ID
export const updateneeds = async ({ id, data }) => {
  const response = await axios.put(`${base_url}/needs/update/${id}`, data);
  return response.data;
};

// Delete need by ID
export const deleteneeds = async (id) => {
  const response = await axios.delete(`${base_url}/needs/delete/${id}`);
  return response.data;
};

const needsServices = {
  createneeds,
  getAllneeds,
  getSingleneeds,
  updateneeds,
  deleteneeds,
};

export default needsServices;
