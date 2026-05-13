import axios from "axios";
import { base_url } from "../../utils/base_url";

export const createProduct = async (data) => {
  const response = await axios.post(`${base_url}/product`, data);
  return response.data;
};
export const getAllProducts = async () => {
  const response = await axios.get(`${base_url}/product`);
  return response.data;
};
export const getProductById = async (id) => {
  const response = await axios.get(`${base_url}/product/${id}`);
  return response.data;
};
export const updateProduct = async ({ id, data }) => {
  const response = await axios.put(`${base_url}/product/${id}`, data);
  return response.data;
};
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}/product/${id}`);
  return response.data;
};

const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
export default ProductServices;
