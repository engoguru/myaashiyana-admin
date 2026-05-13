import axios from "axios";
import { base_url } from "../../utils/base_url";

// Create a wishlist item
export const createWishlistItem = async (data) => {
  const response = await axios.post(`${base_url}/wishlist/`, data);
  return response.data;
};

// Get all wishlist items
export const getAllWishlistItems = async () => {
  const response = await axios.get(`${base_url}/wishlist/`);
  return response.data;
};

// Get single wishlist item by ID
export const getSingleWishlistItem = async (id) => {
  const response = await axios.get(`${base_url}/wishlist/${id}`);
  return response.data;
};

// Update wishlist item by ID
export const updateWishlistItem = async ({ id, data }) => {
  const response = await axios.put(`${base_url}/wishlist/${id}`, data);
  return response.data;
};

// Delete wishlist item by ID
export const deleteWishlistItem = async (id) => {
  const response = await axios.delete(`${base_url}/wishlist/${id}`);
  return response.data;
};

const wishlistService = {
  createWishlistItem,
  getAllWishlistItems,
  getSingleWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
};

export default wishlistService;
