import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

export const allContact = async () => {
    const response = await axios.get(`${base_url}/contactQuery/all`);
    return response.data;
};


export const singleContact = async (id) => {
    const response = await axios.get(`${base_url}/contactQuery/single/${id}`);
    return response.data
};


export const removeContact = async(id) => {
    const response = await axios.delete(`${base_url}/contactQuery/delete/${id}`);
    return response.data;
};


const contactFormService = {
    allContact,
    singleContact,
    removeContact
}

export default contactFormService;