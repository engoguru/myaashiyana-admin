import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

export const addFaq = async (faqData) => {
  const response = await axios.post(`${base_url}/faq/`, faqData, config);
  return response.data;
};

export const allFaqs = async () => {
  const response = await axios.get(`${base_url}/faq/all`, config);
  return response.data;
};

export const singleFaq = async (id) => {
  const response = await axios.get(`${base_url}/faq/single/${id}`, config);
  return response.data;
};

export const updateFaq = async ({ id, faqData }) => {
  const response = await axios.put(`${base_url}/faq/update/${id}`, faqData, config);
  return response.data;
};

export const deleteFaq = async (id) => {
  const response = await axios.delete(`${base_url}/faq/delete/${id}`, config);
  return response.data;
};

const faqService = {
  addFaq,
  allFaqs,
  singleFaq,
  updateFaq,
  deleteFaq,
};

export default faqService;
