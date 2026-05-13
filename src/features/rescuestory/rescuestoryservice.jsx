import axios from "axios";
import { base_url } from "../../utils/base_url";

// Create a rescue story
export const createRescueStory = async (data) => {
  const response = await axios.post(`${base_url}/rescue-story`, data);
  return response.data;
};

// Get all rescue stories
export const getAllRescueStories = async () => {
  const response = await axios.get(`${base_url}/rescue-story/`);
  return response.data;
};

// Get single rescue story by ID
export const getSingleRescueStory = async (id) => {
  const response = await axios.get(`${base_url}/rescue-story/${id}`);
  return response.data;
};

// Update rescue story by ID
export const updateRescueStory = async ({ id, data }) => {
  const response = await axios.put(`${base_url}/rescue-story/${id}`, data);
  return response.data;
};

// Delete rescue story by ID
export const deleteRescueStory = async (id) => {
  const response = await axios.delete(`${base_url}/rescue-story/${id}`);
  return response.data;
};

const Rescuestorieservices = {
  createRescueStory,
  getAllRescueStories,
  getSingleRescueStory,
  updateRescueStory,
  deleteRescueStory,
};

export default Rescuestorieservices;
