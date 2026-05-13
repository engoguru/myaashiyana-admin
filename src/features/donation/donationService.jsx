import axios from "axios";
import { base_url } from "../../utils/base_url";

/* GET ALL DONATIONS */
export const getDonations = async () => {
  const response = await axios.get(`${base_url}/donation/`);
  return response.data;
};

/* DELETE DONATION */
export const removeDonation = async (id) => {
  const response = await axios.delete(`${base_url}/donation/${id}`);
  return response.data;
};

const donationService = {
  getDonations,
  removeDonation,
};

export default donationService;
